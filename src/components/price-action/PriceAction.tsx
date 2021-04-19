import React, { FC, useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { HistoricalDaysRange } from "../../services/crypto_assets/AssetsServiceInterface";
import { formatPrice, formatWeekdayDateString } from "../../utils/formatters";
import { Chart } from "../charts/Chart";
import { BaseWrapper } from "../wrappers";
import {
  ChartTimeRangeSelection,
  historicalDaysRange,
} from "./ChartTimeRangeSelection";
import { PriceActionWrapper } from "./styled";
import { useHistoricalPrice } from "./useHistoricalPrice";

export const PriceAction: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDayRange, setDayRange] = useState<HistoricalDaysRange>(
    historicalDaysRange["1D"],
  );
  const { assetPriceHistory, getHistoricalData } = useHistoricalPrice(id);

  useEffect(() => {
    getHistoricalData({ days: selectedDayRange });
  }, [selectedDayRange, getHistoricalData]);

  const chartData = useMemo(() => assetPriceHistory.get(selectedDayRange), [
    assetPriceHistory,
    selectedDayRange,
  ]);
  //TODO: Fix Performance Issues when Selecting 'ALL' DayRange
  return (
    <PriceActionWrapper>
      <ChartTimeRangeSelection
        selectedDayRange={selectedDayRange}
        onSelectionChanged={setDayRange}
      />
      <BaseWrapper>
        <Chart
          chartData={chartData}
          dataKey="price"
          xAxisDataKey="time"
          valueFormatter={(value) => formatPrice(value, 3)}
          xAxisLabelFormatter={(time) => formatWeekdayDateString(time)}
        />
      </BaseWrapper>
    </PriceActionWrapper>
  );
};
