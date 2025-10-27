# Testing Documentation

This document describes the testing setup for verifying the rate limiting fix.

## Quick Start

### Automated Code Verification

Run the automated verification script to check if all code fixes are in place:

```bash
node e2e/verify-fix.js
```

This will check:
- ✅ useService.ts has the handler fix
- ✅ All service hooks have memoized handlers
- ✅ Effect dependencies are corrected
- ✅ No stale closures remain

### Manual Browser Testing

Follow the manual verification guide:

```bash
# 1. Start the app
npm start

# 2. Follow the steps in e2e/manual-verification.md
```

See [e2e/manual-verification.md](./e2e/manual-verification.md) for detailed instructions.

### E2E Tests with Playwright

**Note:** Requires Playwright browsers to be installed.

```bash
# Install browsers (one-time setup)
npx playwright install chromium

# Run E2E tests
npm run test:e2e

# Run with UI (interactive mode)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug mode
npm run test:e2e:debug
```

## The Rate Limiting Issue

### Problem Description

Users experienced HTTP 429 (Too Many Requests) errors when:
1. Viewing historical pricing for a single cryptocurrency (e.g., BTC)
2. Switching between timeframes (1D, 7D, 30D, 90D, 1Y)

### Root Causes

1. **Stale Handlers in `useService.ts`**
   - Handlers reference was initialized but never updated
   - Used faulty `if (!handlersRef.current)` check
   - Caused stale closures with outdated state

2. **Unstable Effect Dependencies**
   - Components had `useEffect` hooks depending on callback functions
   - Callbacks were recreating unnecessarily
   - Triggered redundant re-renders and API calls

3. **Inline Handler Objects**
   - Handler objects created inline on every render
   - No memoization, causing constant recreation
   - Led to dependency chain instability

### The Fix

**Files Modified:**
- `src/utils/hooks/useService.ts` - Fixed stale handler ref
- `src/components/price-action/useHistoricalPrice.ts` - Memoized handlers
- `src/components/price-action/HistoricalPriceChart.tsx` - Fixed dependencies
- `src/components/crypto-assets/useAssetsService.ts` - Memoized handlers
- `src/components/crypto-assets/CryptoAssetFullDetails.tsx` - Fixed dependencies
- `src/utils/hooks/useFeedService.ts` - Memoized handlers
- `src/utils/hooks/useAllCoinsService.ts` - Memoized handlers
- `src/components/market-metrics/useMarketMetrics.ts` - Memoized handlers

**Key Changes:**

1. Fixed `useService.ts`:
```typescript
// Before (WRONG)
const handlersRef = useRef<ServiceResponseHandler<Response> | undefined>(handlers);
if (!handlersRef.current) {
  handlersRef.current = handlers;
}

// After (CORRECT)
const handlersRef = useRef<ServiceResponseHandler<Response> | undefined>();
useEffect(() => {
  handlersRef.current = handlers;
}, [handlers]);
```

2. Memoized all handlers:
```typescript
// Before (WRONG)
const [setRequest] = useService(SomeService.method, {
  onResponse(response) { /* ... */ },
  onError(err) { /* ... */ },
});

// After (CORRECT)
const handlers = useMemo(
  () => ({
    onResponse(response: ResponseType) { /* ... */ },
    onError(err: unknown) { /* ... */ },
  }),
  [/* proper dependencies */],
);
const [setRequest] = useService(SomeService.method, handlers);
```

3. Fixed effect dependencies:
```typescript
// Before (WRONG)
useEffect(() => {
  getHistoricalData({ days: selectedDayRange });
}, [selectedDayRange, getHistoricalData]); // getHistoricalData causes re-renders

// After (CORRECT)
useEffect(() => {
  getHistoricalData({ days: selectedDayRange });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedDayRange]); // Only depend on the actual data
```

## Testing Methods

### 1. Automated Code Verification (`e2e/verify-fix.js`)

**What it does:**
- Reads source files
- Verifies fixes are in place
- Checks for proper patterns
- Returns pass/fail status

**When to use:**
- Before committing changes
- In CI/CD pipeline
- Quick sanity check

**Limitations:**
- Only checks static code
- Doesn't run the application
- Can't verify runtime behavior

### 2. Manual Browser Testing (`e2e/manual-verification.md`)

**What it does:**
- Provides step-by-step instructions
- Uses browser DevTools to monitor requests
- Verifies actual runtime behavior

**When to use:**
- Final verification before release
- When debugging issues
- To understand actual behavior

**Advantages:**
- Sees real network requests
- Can inspect actual data
- Interactive and visual

### 3. E2E Tests with Playwright (`e2e/rate-limit.spec.ts`)

**What it does:**
- Programmatically controls browser
- Monitors network requests
- Verifies expected behavior
- Generates test reports

**When to use:**
- Continuous testing
- Regression testing
- Automated verification

**Advantages:**
- Fully automated
- Reproducible
- Can run in CI/CD

## Test Coverage

### Scenarios Tested

1. **Initial Page Load**
   - Navigate to crypto detail page
   - Verify < 15 API requests
   - Verify no 429 errors

2. **Timeframe Switching**
   - Switch between 1D, 7D, 30D, 90D, 1Y
   - Verify ~1 API call per switch
   - Verify no duplicate requests
   - Verify no 429 errors

3. **Rapid Interactions**
   - Quickly switch between timeframes
   - Verify request count stays reasonable
   - Verify no rate limiting

### Expected Results

| Scenario | Before Fix | After Fix |
|----------|-----------|-----------|
| Initial Load | 20+ requests | 3-10 requests |
| Single Timeframe Switch | 5-10 requests | 1 request |
| 5 Timeframe Switches | 50+ requests, 429 errors | 5-8 requests, no errors |
| Rapid Switching | Many 429 errors | No errors |

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run code verification
        run: node e2e/verify-fix.js

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

## Troubleshooting

### Verification Script Fails

If `node e2e/verify-fix.js` fails:

1. Check which specific check failed
2. Review the corresponding file
3. Ensure the fix was applied correctly
4. Run `npm run build` to verify TypeScript compiles

### E2E Tests Fail

If Playwright tests fail:

1. **Browser installation issues:**
   ```bash
   npx playwright install chromium --force
   ```

2. **Port already in use:**
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

3. **Tests timing out:**
   - Increase timeout in `playwright.config.ts`
   - Check if API is responsive

4. **Network errors:**
   - Verify internet connection
   - Check if CoinGecko API is accessible

### Manual Testing Shows Issues

If manual testing still shows 429 errors:

1. Clear browser cache and reload
2. Verify you're on the correct branch:
   ```bash
   git branch --show-current
   ```
3. Rebuild the application:
   ```bash
   npm run build
   npm start
   ```
4. Check browser console for errors

## Further Reading

- [E2E Test Documentation](./e2e/README.md)
- [Manual Verification Guide](./e2e/manual-verification.md)
- [Playwright Docs](https://playwright.dev/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Contributing

When adding new features:

1. Run the verification script: `node e2e/verify-fix.js`
2. Manually test in browser
3. Update E2E tests if needed
4. Ensure all tests pass before committing

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the manual verification guide
3. Create an issue with:
   - Steps to reproduce
   - Browser/version
   - Console errors
   - Network tab screenshot
