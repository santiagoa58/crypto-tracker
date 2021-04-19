import React, { FC, useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { HistoricalDaysRange } from "../../services/crypto_assets/AssetsServiceInterface";
import { formatPrice, formatWeekdayDateString } from "../../utils/formatters";
import { Chart } from "../charts/Chart";
import { CryptoAssetDetails } from "../crypto-assets/CryptoAssetDetails";
import { useAssetDetailsService } from "../crypto-assets/useAssetsService";
import { LoadingSpinner } from "../LoadingSpinner";
import {
  ChartTimeRangeSelection,
  historicalDaysRange,
} from "./ChartTimeRangeSelection";
import { PriceActionWrapper } from "./styled";
import { useHistoricalPrice } from "./useHistoricalPrice";

const MemoizedChart = React.memo(Chart) as typeof Chart;

const valueFormatter = (value?: number) => formatPrice(value, 3);
const labelFormatter = (time?: number) => formatWeekdayDateString(time);

export const PriceAction: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDayRange, setDayRange] = useState<HistoricalDaysRange>(
    historicalDaysRange["1D"],
  );
  const { assetPriceHistory, getHistoricalData, isBusy } = useHistoricalPrice(
    id,
  );
  const { getAsset } = useAssetDetailsService(id);

  useEffect(() => {
    getAsset();
  }, [getAsset]);

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
        <MemoizedChart
          chartData={chartData}
          dataKey="price"
          xAxisDataKey="time"
          valueFormatter={valueFormatter}
          xAxisLabelFormatter={labelFormatter}
        />
      )}
    </PriceActionWrapper>
  );
};

export default PriceAction;
