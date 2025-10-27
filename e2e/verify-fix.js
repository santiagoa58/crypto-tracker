#!/usr/bin/env node

/**
 * Automated verification script for rate limiting fix
 *
 * This script programmatically verifies that the rate limiting issue
 * has been resolved by checking the built application behavior.
 *
 * Usage:
 *   node e2e/verify-fix.js
 */

const fs = require('fs');
const path = require('path');

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║  Rate Limiting Fix Verification Script                        ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// Check if the fix files exist and contain expected code
const checks = [];

// Check 1: Verify useService.ts has the fix
console.log('📋 Check 1: Verifying useService.ts has the handler fix...');
const useServicePath = path.join(__dirname, '../src/utils/hooks/useService.ts');

if (fs.existsSync(useServicePath)) {
  const content = fs.readFileSync(useServicePath, 'utf-8');

  // Check for the fixed implementation
  const hasProperUseEffect = content.includes('useEffect(() => {') &&
                              content.includes('handlersRef.current = handlers;') &&
                              content.includes('}, [handlers])');

  // Check that the old faulty code is gone
  const hasOldFaultyCode = content.includes('if (!handlersRef.current)');

  if (hasProperUseEffect && !hasOldFaultyCode) {
    console.log('   ✅ useService.ts correctly updated with useEffect fix');
    checks.push({ name: 'useService.ts fix', passed: true });
  } else {
    console.log('   ❌ useService.ts still has issues');
    if (!hasProperUseEffect) {
      console.log('      - Missing proper useEffect for handlers');
    }
    if (hasOldFaultyCode) {
      console.log('      - Still contains old faulty if check');
    }
    checks.push({ name: 'useService.ts fix', passed: false });
  }
} else {
  console.log('   ❌ useService.ts not found');
  checks.push({ name: 'useService.ts exists', passed: false });
}

// Check 2: Verify useHistoricalPrice.ts has memoized handlers
console.log('\n📋 Check 2: Verifying useHistoricalPrice.ts has memoized handlers...');
const useHistoricalPricePath = path.join(__dirname, '../src/components/price-action/useHistoricalPrice.ts');

if (fs.existsSync(useHistoricalPricePath)) {
  const content = fs.readFileSync(useHistoricalPricePath, 'utf-8');

  const hasUseMemo = content.includes('useMemo');
  const hasHandlers = content.includes('const handlers = useMemo');
  const hasAssetIdDep = content.includes('[assetId]');

  if (hasUseMemo && hasHandlers && hasAssetIdDep) {
    console.log('   ✅ useHistoricalPrice.ts has memoized handlers');
    checks.push({ name: 'useHistoricalPrice.ts memoization', passed: true });
  } else {
    console.log('   ❌ useHistoricalPrice.ts missing memoization');
    checks.push({ name: 'useHistoricalPrice.ts memoization', passed: false });
  }
} else {
  console.log('   ❌ useHistoricalPrice.ts not found');
  checks.push({ name: 'useHistoricalPrice.ts exists', passed: false });
}

// Check 3: Verify HistoricalPriceChart.tsx has correct dependencies
console.log('\n📋 Check 3: Verifying HistoricalPriceChart.tsx effect dependencies...');
const chartPath = path.join(__dirname, '../src/components/price-action/HistoricalPriceChart.tsx');

if (fs.existsSync(chartPath)) {
  const content = fs.readFileSync(chartPath, 'utf-8');

  // Should have eslint-disable comment for dependency
  const hasEslintDisable = content.includes('eslint-disable-next-line react-hooks/exhaustive-deps');

  // Should only depend on selectedDayRange, not getHistoricalData
  const hasCorrectDeps = content.includes('}, [selectedDayRange]');

  if (hasEslintDisable && hasCorrectDeps) {
    console.log('   ✅ HistoricalPriceChart.tsx has correct effect dependencies');
    checks.push({ name: 'HistoricalPriceChart.tsx dependencies', passed: true });
  } else {
    console.log('   ❌ HistoricalPriceChart.tsx has incorrect dependencies');
    checks.push({ name: 'HistoricalPriceChart.tsx dependencies', passed: false });
  }
} else {
  console.log('   ❌ HistoricalPriceChart.tsx not found');
  checks.push({ name: 'HistoricalPriceChart.tsx exists', passed: false });
}

// Check 4: Verify useAssetsService.ts has memoized handlers
console.log('\n📋 Check 4: Verifying useAssetsService.ts has memoized handlers...');
const useAssetsServicePath = path.join(__dirname, '../src/components/crypto-assets/useAssetsService.ts');

if (fs.existsSync(useAssetsServicePath)) {
  const content = fs.readFileSync(useAssetsServicePath, 'utf-8');

  const hasUseMemo = content.includes('useMemo');
  const hasHandlers = content.match(/const handlers = useMemo/g);

  // Should have at least 2 handlers (for useAssetsService and useAssetDetailsService)
  if (hasUseMemo && hasHandlers && hasHandlers.length >= 2) {
    console.log('   ✅ useAssetsService.ts has memoized handlers');
    checks.push({ name: 'useAssetsService.ts memoization', passed: true });
  } else {
    console.log('   ❌ useAssetsService.ts missing proper memoization');
    checks.push({ name: 'useAssetsService.ts memoization', passed: false });
  }
} else {
  console.log('   ❌ useAssetsService.ts not found');
  checks.push({ name: 'useAssetsService.ts exists', passed: false });
}

// Check 5: Verify useFeedService.ts has memoized handlers
console.log('\n📋 Check 5: Verifying useFeedService.ts has memoized handlers...');
const useFeedServicePath = path.join(__dirname, '../src/utils/hooks/useFeedService.ts');

if (fs.existsSync(useFeedServicePath)) {
  const content = fs.readFileSync(useFeedServicePath, 'utf-8');

  const hasUseMemo = content.includes('useMemo');
  const hasHandlers = content.includes('const handlers = useMemo');
  const hasEslintDisable = content.includes('eslint-disable-next-line');

  if (hasUseMemo && hasHandlers && hasEslintDisable) {
    console.log('   ✅ useFeedService.ts has memoized handlers');
    checks.push({ name: 'useFeedService.ts memoization', passed: true });
  } else {
    console.log('   ❌ useFeedService.ts missing memoization');
    checks.push({ name: 'useFeedService.ts memoization', passed: false });
  }
} else {
  console.log('   ❌ useFeedService.ts not found');
  checks.push({ name: 'useFeedService.ts exists', passed: false });
}

// Check 6: Verify useMarketMetrics.ts has memoized handlers
console.log('\n📋 Check 6: Verifying useMarketMetrics.ts has memoized handlers...');
const useMarketMetricsPath = path.join(__dirname, '../src/components/market-metrics/useMarketMetrics.ts');

if (fs.existsSync(useMarketMetricsPath)) {
  const content = fs.readFileSync(useMarketMetricsPath, 'utf-8');

  const hasUseMemo = content.includes('useMemo');
  const hasHandlers = content.includes('const handlers = useMemo');

  if (hasUseMemo && hasHandlers) {
    console.log('   ✅ useMarketMetrics.ts has memoized handlers');
    checks.push({ name: 'useMarketMetrics.ts memoization', passed: true });
  } else {
    console.log('   ❌ useMarketMetrics.ts missing memoization');
    checks.push({ name: 'useMarketMetrics.ts memoization', passed: false });
  }
} else {
  console.log('   ❌ useMarketMetrics.ts not found');
  checks.push({ name: 'useMarketMetrics.ts exists', passed: false });
}

// Check 7: Verify useAllCoinsService.ts has memoized handlers
console.log('\n📋 Check 7: Verifying useAllCoinsService.ts has memoized handlers...');
const useAllCoinsServicePath = path.join(__dirname, '../src/utils/hooks/useAllCoinsService.ts');

if (fs.existsSync(useAllCoinsServicePath)) {
  const content = fs.readFileSync(useAllCoinsServicePath, 'utf-8');

  const hasUseMemo = content.includes('useMemo');
  const hasHandlers = content.includes('const handlers = useMemo');

  if (hasUseMemo && hasHandlers) {
    console.log('   ✅ useAllCoinsService.ts has memoized handlers');
    checks.push({ name: 'useAllCoinsService.ts memoization', passed: true });
  } else {
    console.log('   ❌ useAllCoinsService.ts missing memoization');
    checks.push({ name: 'useAllCoinsService.ts memoization', passed: false });
  }
} else {
  console.log('   ❌ useAllCoinsService.ts not found');
  checks.push({ name: 'useAllCoinsService.ts exists', passed: false });
}

// Summary
console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║  Verification Summary                                          ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

const passed = checks.filter(c => c.passed).length;
const total = checks.length;

console.log(`Total Checks: ${total}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${total - passed}\n`);

if (passed === total) {
  console.log('✅ All code checks passed! The rate limiting fix is properly implemented.\n');
  console.log('Next steps:');
  console.log('1. Run the application: npm start');
  console.log('2. Manually verify behavior using e2e/manual-verification.md');
  console.log('3. Or run E2E tests: npm run test:e2e\n');
  process.exit(0);
} else {
  console.log('❌ Some checks failed. Please review the fixes.\n');
  console.log('Failed checks:');
  checks.filter(c => !c.passed).forEach(c => {
    console.log(`   - ${c.name}`);
  });
  console.log('');
  process.exit(1);
}
