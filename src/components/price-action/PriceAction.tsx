import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { HistoricalDaysRange } from "../../services/crypto_assets/AssetsServiceInterface";
import { CyrptoAssetFullDetails } from "../crypto-assets/CryptoAssetFullDetails";
import { CryptoAssetInfo } from "../crypto-assets/CryptoAssetInfo";
import {
  ChartTimeRangeSelection,
  historicalDaysRange,
} from "./ChartTimeRangeSelection";
import { HistoricalPriceChart } from "./HistoricalPriceChart";
import { PriceActionWrapper } from "./styled";

export const PriceAction: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDayRange, setDayRange] = useState<HistoricalDaysRange>(
    historicalDaysRange["1D"],
  );

  return (
    <PriceActionWrapper>
      <CryptoAssetInfo assetId={id} />
      <ChartTimeRangeSelection
        selectedDayRange={selectedDayRange}
        onSelectionChanged={setDayRange}
      />
      <HistoricalPriceChart assetId={id} selectedDayRange={selectedDayRange} />
      <CyrptoAssetFullDetails assetId={id} />
    </PriceActionWrapper>
  );
};

export default PriceAction;
