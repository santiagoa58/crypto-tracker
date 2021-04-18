import React, { FC, useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { HistoricalPriceInterval } from "../../services/crypto_assets/AssetsServiceInterface";
import { formatPrice, formatWeekdayDateString } from "../../utils/formatters";
import { Chart } from "../charts/Chart";
import { ChartTimeRangeSelection } from "./ChartTimeRangeSelection";
import { PriceActionWrapper } from "./styled";
import { useHistoricalPrice } from "./useHistoricalPrice";

export const PriceAction: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [
    selectedPriceInterval,
    setPriceInterval,
  ] = useState<HistoricalPriceInterval>("d1");
  const { assetPriceHistory, getHistoricalData } = useHistoricalPrice(
    id ?? "bitcoin",
  );

  useEffect(() => {
    getHistoricalData({ interval: selectedPriceInterval });
  }, [selectedPriceInterval, getHistoricalData]);

  const chartData = useMemo(
    () => assetPriceHistory.get(selectedPriceInterval),
    [assetPriceHistory, selectedPriceInterval],
  );

  return (
    <PriceActionWrapper>
      <ChartTimeRangeSelection
        selectedPriceInterval={selectedPriceInterval}
        onSelectionChanged={setPriceInterval}
      />
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
