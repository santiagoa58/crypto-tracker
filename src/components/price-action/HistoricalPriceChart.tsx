import React, { FC, useMemo, useEffect, useCallback } from "react";
import { HistoricalDaysRange } from "../../services/crypto_assets/AssetsServiceInterface";
import { formatDate, formatDayTime, formatPrice } from "../../utils/formatters";
import { Chart } from "../charts/Chart";
import { LoadingSpinner } from "../LoadingSpinner";
import { historicalDaysRange } from "./ChartTimeRangeSelection";
import { useHistoricalPrice } from "./useHistoricalPrice";

const MemoizedChart = React.memo(Chart) as typeof Chart;

interface HistoricalPriceChartProps {
  assetId: string;
  selectedDayRange: HistoricalDaysRange;
}

export const HistoricalPriceChart: FC<HistoricalPriceChartProps> = ({
  selectedDayRange,
  ...props
}) => {
  const {
    assetPriceHistory,
    getHistoricalData,
    isBusy,
    error,
  } = useHistoricalPrice(props.assetId);

  useEffect(() => {
    getHistoricalData({ days: selectedDayRange });
  }, [selectedDayRange, getHistoricalData]);

  const chartData = useMemo(() => assetPriceHistory.get(selectedDayRange), [
    assetPriceHistory,
    selectedDayRange,
  ]);

  const labelFormatter = useCallback(
    (time?: number) =>
      selectedDayRange === historicalDaysRange["1D"]
        ? formatDayTime(time)
        : formatDate(time),
    [selectedDayRange],
  );

  return isBusy ? (
    <LoadingSpinner />
  ) : (
    <MemoizedChart
      chartData={chartData}
      dataKey="price"
      xAxisDataKey="time"
      valueFormatter={formatPrice}
      xAxisLabelFormatter={labelFormatter}
      error={error}
    />
  );
};
