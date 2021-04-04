import React from "react";
import { CryptoAssetsGrid } from "../crypto-assets/CryptoAssetsGrid";
import { MarketMetrics } from "../market-metrics/MarketMetrics";

export const MarketOverview = () => {
  return (
    <>
      <MarketMetrics />
      <CryptoAssetsGrid />
    </>
  );
};
