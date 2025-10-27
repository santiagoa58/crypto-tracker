import { test, expect, Page } from '@playwright/test';

interface NetworkRequest {
  url: string;
  method: string;
  status: number | undefined;
  timestamp: number;
}

/**
 * E2E test to verify rate limiting issue is resolved
 *
 * This test verifies that:
 * 1. Viewing a single crypto (BTC) doesn't cause excessive API calls
 * 2. Switching timeframes only makes one API call per switch
 * 3. No HTTP 429 (rate limit) errors occur
 */
test.describe('Rate Limiting Fix Verification', () => {
  let apiRequests: NetworkRequest[] = [];

  test.beforeEach(async ({ page }) => {
    apiRequests = [];

    // Intercept all API requests to monitor them
    await page.route('**/*', async (route) => {
      const request = route.request();
      const url = request.url();

      // Track all API requests to CoinGecko or our API
      if (url.includes('api.coingecko.com') || url.includes('/api/')) {
        apiRequests.push({
          url,
          method: request.method(),
          status: undefined,
          timestamp: Date.now(),
        });
      }

      // Continue with the request
      await route.continue();
    });

    // Listen for responses to track status codes
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('api.coingecko.com') || url.includes('/api/')) {
        const matchingRequest = apiRequests.find(
          req => req.url === url && req.status === undefined
        );
        if (matchingRequest) {
          matchingRequest.status = response.status();
        }
      }
    });
  });

  test('should not get rate limited when viewing BTC and switching timeframes', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Clear initial requests (page load)
    const initialRequestCount = apiRequests.length;
    console.log(`Initial page load made ${initialRequestCount} API requests`);
    apiRequests = [];

    // Click on Bitcoin to view details
    await page.click('text=/bitcoin/i', { timeout: 10000 });

    // Wait for the detail page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Give time for all requests to complete

    const detailPageRequests = apiRequests.length;
    console.log(`Detail page load made ${detailPageRequests} API requests`);

    // Verify no 429 errors on initial load
    const rateLimitErrorsInitial = apiRequests.filter(req => req.status === 429);
    expect(rateLimitErrorsInitial.length,
      `Should not get rate limited on initial load. Got ${rateLimitErrorsInitial.length} 429 errors`
    ).toBe(0);

    // Clear requests before timeframe test
    apiRequests = [];

    // Find and click different timeframe buttons
    const timeframes = ['1D', '7D', '30D', '90D', '1Y'];

    for (const timeframe of timeframes) {
      console.log(`\nSwitching to ${timeframe} timeframe...`);
      const beforeCount = apiRequests.length;

      // Click the timeframe button
      const button = page.locator(`button:has-text("${timeframe}")`);
      if (await button.count() > 0) {
        await button.click();

        // Wait for the chart to update
        await page.waitForTimeout(2000);

        const afterCount = apiRequests.length;
        const newRequests = afterCount - beforeCount;
        console.log(`Timeframe ${timeframe}: Made ${newRequests} new API requests`);

        // Verify no 429 errors after switching
        const rateLimitErrors = apiRequests.filter(req => req.status === 429);
        expect(rateLimitErrors.length,
          `Should not get rate limited when switching to ${timeframe}. ` +
          `Got ${rateLimitErrors.length} 429 errors`
        ).toBe(0);

        // Verify we're not making excessive requests (should be 1-2 max per switch)
        expect(newRequests,
          `Should make minimal API calls when switching timeframes. ` +
          `Expected 1-3, got ${newRequests} for ${timeframe}`
        ).toBeLessThanOrEqual(3);
      }
    }

    // Final verification: count total requests during timeframe switching
    const totalTimeframeSwitchRequests = apiRequests.length;
    console.log(`\nTotal API requests during timeframe switching: ${totalTimeframeSwitchRequests}`);
    console.log(`Timeframes tested: ${timeframes.length}`);
    console.log(`Average requests per timeframe: ${(totalTimeframeSwitchRequests / timeframes.length).toFixed(2)}`);

    // Log all requests for debugging
    console.log('\nAll API requests made:');
    apiRequests.forEach((req, index) => {
      console.log(`${index + 1}. [${req.status}] ${req.method} ${req.url}`);
    });

    // Verify no rate limit errors occurred at all
    const allRateLimitErrors = apiRequests.filter(req => req.status === 429);
    expect(allRateLimitErrors.length,
      `Should have ZERO rate limit errors. Found ${allRateLimitErrors.length}`
    ).toBe(0);

    // Verify reasonable total API call count
    // Before fix: could be 50+ calls
    // After fix: should be ~5-15 calls max (one per timeframe + maybe some background updates)
    expect(totalTimeframeSwitchRequests,
      `Total requests should be reasonable. Got ${totalTimeframeSwitchRequests}`
    ).toBeLessThan(20);
  });

  test('should make minimal API calls on crypto detail page load', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Clear home page requests
    apiRequests = [];

    // Navigate to a crypto detail page
    await page.click('text=/bitcoin/i', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    console.log(`\nCrypto detail page made ${apiRequests.length} API requests:`);

    // Group requests by endpoint
    const requestsByEndpoint = apiRequests.reduce((acc, req) => {
      const url = new URL(req.url);
      const pathname = url.pathname;
      acc[pathname] = (acc[pathname] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('Requests by endpoint:');
    Object.entries(requestsByEndpoint).forEach(([endpoint, count]) => {
      console.log(`  ${endpoint}: ${count} requests`);
    });

    // Verify no duplicate requests to the same endpoint
    // Each endpoint should be called once (maybe twice for price feed updates)
    Object.entries(requestsByEndpoint).forEach(([endpoint, count]) => {
      expect(count,
        `Endpoint ${endpoint} should not be called excessively. Got ${count} calls`
      ).toBeLessThanOrEqual(3);
    });

    // Verify no 429 errors
    const rateLimitErrors = apiRequests.filter(req => req.status === 429);
    expect(rateLimitErrors.length).toBe(0);

    // Verify reasonable total count (3-10 requests expected)
    // 1. Historical price data
    // 2. Asset details
    // 3. Price feed subscription
    // Maybe a few more for other data
    expect(apiRequests.length,
      `Detail page should make minimal requests. Got ${apiRequests.length}`
    ).toBeLessThan(15);
  });
});
