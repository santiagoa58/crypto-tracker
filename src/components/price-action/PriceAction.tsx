import React, { FC, useState, useEffect, useMemo } from "react";
import { HistoricalPriceInterval } from "../../services/crypto_assets/AssetsServiceInterface";
import { formatPrice, formatWeekdayDateString } from "../../utils/formatters";
import { typedObjectEntries } from "../../utils/typedObjectEntries";
import { Chart } from "../charts/Chart";
import {
  PriceActionWrapper,
  TimeRangeSelection,
  TimeRangeSelectionItem,
} from "./styled";
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
  const [selectedInterval, setInterval] = useState<HistoricalPriceInterval>(
    "d1",
  );
  const { assetPriceHistory, getHistoricalData } = useHistoricalPrice(
    "bitcoin",
  );

  useEffect(() => {
    getHistoricalData({ interval: selectedInterval });
  }, [selectedInterval, getHistoricalData]);

  const chartData = useMemo(() => assetPriceHistory.get(selectedInterval), [
    assetPriceHistory,
    selectedInterval,
  ]);

  return (
    <PriceActionWrapper>
      <TimeRangeSelection>
        {typedObjectEntries(intervals).map(([intervalKey, interval]) => (
          <TimeRangeSelectionItem
            key={intervalKey}
            onClick={() => setInterval(intervalKey)}
            className={
              intervalKey === selectedInterval ? "selected" : undefined
            }
          >
            {interval}
          </TimeRangeSelectionItem>
        ))}
      </TimeRangeSelection>
      <Chart
        chartData={chartData}
        dataKey="priceUsd"
        xAxisDataKey="time"
        valueFormatter={(value) => formatPrice(value, 3)}
        xAxisLabelFormatter={(time) => formatWeekdayDateString(time)}
      />
    </PriceActionWrapper>
  );
};
