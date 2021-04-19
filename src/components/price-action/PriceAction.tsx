import React, { FC, useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { HistoricalDaysRange } from "../../services/crypto_assets/AssetsServiceInterface";
import { formatPrice, formatWeekdayDateString } from "../../utils/formatters";
import { Chart } from "../charts/Chart";
import { CryptoAssetDetails } from "../crypto-assets/CryptoAssetDetails";
import { LoadingSpinner } from "../LoadingSpinner";
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
  const { assetPriceHistory, getHistoricalData, isBusy } = useHistoricalPrice(
    id,
  );

  useEffect(() => {
    getHistoricalData({ days: selectedDayRange });
  }, [selectedDayRange, getHistoricalData]);

  const chartData = useMemo(() => assetPriceHistory.get(selectedDayRange), [
    assetPriceHistory,
    selectedDayRange,
  ]);

  return (
    <PriceActionWrapper>
      <CryptoAssetDetails assetId={id} />
      <ChartTimeRangeSelection
        selectedDayRange={selectedDayRange}
        onSelectionChanged={setDayRange}
      />
      {isBusy ? (
        <LoadingSpinner />
      ) : (
        <Chart
          chartData={chartData}
          dataKey="price"
          xAxisDataKey="time"
          valueFormatter={(value) => formatPrice(value, 3)}
          xAxisLabelFormatter={(time) => formatWeekdayDateString(time)}
        />
      )}
    </PriceActionWrapper>
  );
};

export default PriceAction;
