# E2E Tests for Rate Limiting Fix

This directory contains end-to-end tests to verify that the rate limiting issue has been resolved.

## The Problem

Before the fix, users experienced HTTP 429 (Too Many Requests) errors when:
1. Viewing historical pricing for a single crypto (like BTC)
2. Switching between different timeframes (1D, 7D, 30D, etc.)

This was caused by:
- Stale handlers in the `useService` hook
- Unstable effect dependencies causing unnecessary re-renders
- Inline handler objects recreated on every render

## The Tests

### `rate-limit.spec.ts`

This test suite contains two main tests:

#### 1. Timeframe Switching Test
**What it tests:**
- Navigates to Bitcoin detail page
- Switches between all timeframes (1D, 7D, 30D, 90D, 1Y)
- Monitors all API requests made
- Verifies:
  - No HTTP 429 errors occur
  - Minimal API calls per timeframe switch (1-3 max)
  - Total requests remain reasonable (< 20 for all switches)

**Expected behavior:**
- Before fix: 50+ API calls, multiple 429 errors
- After fix: ~5-15 API calls total, zero 429 errors

#### 2. Detail Page Load Test
**What it tests:**
- Loads a crypto detail page
- Monitors all API requests
- Verifies:
  - No duplicate requests to the same endpoint
  - Each endpoint called max 3 times
  - Total requests < 15
  - No HTTP 429 errors

**Expected behavior:**
- 3-10 API requests total:
  1. Historical price data
  2. Asset details
  3. Price feed subscription
  4. Maybe a few background updates

## Running the Tests

### Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install chromium
```

### Run Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run in debug mode (step through)
npm run test:e2e:debug
```

### What the Tests Monitor

The tests intercept all network requests and track:
- **URL**: Which endpoint was called
- **Method**: GET, POST, etc.
- **Status**: Response status code (especially watching for 429)
- **Timestamp**: When the request was made
- **Count**: How many times each endpoint is called

## Manual Verification

If you want to manually verify the fix:

1. Start the development server:
```bash
npm start
```

2. Open browser DevTools (F12)

3. Go to Network tab

4. Navigate to a crypto detail page (e.g., Bitcoin)

5. Clear the Network tab

6. Switch between timeframes and observe:
   - Each timeframe switch should make ~1 API call
   - No 429 (rate limit) errors should appear
   - No duplicate requests to the same endpoint

### What to Look For

**Before the fix:**
- Multiple simultaneous requests to the same endpoint
- HTTP 429 errors after a few timeframe switches
- 10+ requests per timeframe change

**After the fix:**
- Single request per timeframe change
- Zero HTTP 429 errors
- Clean, minimal API usage

## Test Output

The tests log detailed information:

```
Initial page load made 5 API requests
Detail page load made 3 API requests

Switching to 1D timeframe...
Timeframe 1D: Made 1 new API requests

Switching to 7D timeframe...
Timeframe 7D: Made 1 new API requests

...

Total API requests during timeframe switching: 8
Timeframes tested: 5
Average requests per timeframe: 1.60

All API requests made:
1. [200] GET https://api.coingecko.com/.../market_chart?...&days=1
2. [200] GET https://api.coingecko.com/.../market_chart?...&days=7
...
```

## CI/CD Integration

These tests can be integrated into your CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Run E2E tests
  run: npm run test:e2e
```

The tests will automatically:
- Start the dev server
- Run all tests
- Generate an HTML report
- Fail the build if any test fails

## Troubleshooting

### Browser Installation Issues

If `npx playwright install` fails:
```bash
# Try with specific browser
npx playwright install chromium --force

# Or use environment variable
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=0 npx playwright install
```

### Port Already in Use

If port 3000 is in use:
1. Kill the existing process: `lsof -ti:3000 | xargs kill -9`
2. Or update `playwright.config.ts` to use a different port

### Tests Timing Out

Increase timeout in `playwright.config.ts`:
```typescript
use: {
  baseURL: 'http://localhost:3000',
  timeout: 30000, // Increase this
}
```

## Further Reading

- [Playwright Documentation](https://playwright.dev/)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [Best Practices](https://playwright.dev/docs/best-practices)
