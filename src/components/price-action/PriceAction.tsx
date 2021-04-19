import React, { FC, useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { HistoricalDaysRange } from "../../services/crypto_assets/AssetsServiceInterface";
import {
  formatDayTime,
  formatPrice,
  formatWeekdayDate,
} from "../../utils/formatters";
import { Chart } from "../charts/Chart";
import { CyrptoAssetFullDetails } from "../crypto-assets/CryptoAssetFullDetails";
import { CryptoAssetInfo } from "../crypto-assets/CryptoAssetInfo";
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

export const PriceAction: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDayRange, setDayRange] = useState<HistoricalDaysRange>(
    historicalDaysRange["1D"],
  );
  const { assetPriceHistory, getHistoricalData, isBusy } = useHistoricalPrice(
    id,
  );
  const { getAsset, asset } = useAssetDetailsService(id);

  const labelFormatter = useCallback(
    (time?: number) =>
      selectedDayRange === historicalDaysRange["1D"]
        ? formatDayTime(time)
        : formatWeekdayDate(time),
    [selectedDayRange],
  );
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
      <CryptoAssetInfo assetId={id} />
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
      <CyrptoAssetFullDetails asset={asset} />
    </PriceActionWrapper>
  );
};

export default PriceAction;
