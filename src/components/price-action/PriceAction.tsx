import React, { FC, useState, useEffect, useMemo } from "react";
import { HistoricalPriceInterval } from "../../services/crypto_assets/AssetsServiceInterface";
import { typedObjectEntries } from "../../utils/typedObjectEntries";
import { Chart } from "../charts/Chart";
import { useHistoricalPrice } from "./useHistoricalPrice";

type Intervals = {
  [interval in HistoricalPriceInterval]: string;
};
const intervals: Intervals = {
  m1: "1M",
  m5: "5M",
  m15: "15M",
  m30: "30M",
  h1: "1H",
  h2: "2H",
  h6: "6H",
  h12: "12H",
  d1: "1D",
};
export const PriceAction: FC = () => {
  const [interval, setInterval] = useState<HistoricalPriceInterval>("d1");
  const { assetPriceHistory, getHistoricalData } = useHistoricalPrice(
    "bitcoin",
  );

  useEffect(() => {
    getHistoricalData({ interval });
  }, [interval, getHistoricalData]);

  const chartData = useMemo(() => assetPriceHistory.get(interval) ?? [], [
    assetPriceHistory,
    interval,
  ]);

  return (
    <div>
      <ul>
        {typedObjectEntries(intervals).map(([intervalKey, interval]) => (
          <li key={intervalKey} onClick={() => setInterval(intervalKey)}>
            {interval}
          </li>
        ))}
      </ul>
      <Chart chartData={chartData} dataKey="priceUsd" xAxisDataKey="time" />
    </div>
  );
};
