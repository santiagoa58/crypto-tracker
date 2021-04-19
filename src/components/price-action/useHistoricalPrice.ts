import { useCallback, useState } from "react";
import { AssetsService } from "../../services/crypto_assets/AssetsService";
import { useService } from "../../utils/hooks/useService";
import {
  HistoricalAssetPriceRequest,
  HistoricalDaysRange,
  HistoricalPriceData,
} from "../../services/crypto_assets/AssetsServiceInterface";
import { Map } from "immutable";
import { DEFAULT_CURRENCY } from "../../utils/constants";

export const useHistoricalPrice = (assetId: string) => {
  const [assetPriceHistory, setAssetPriceHistory] = useState(
    Map<HistoricalDaysRange, HistoricalPriceData[]>(),
  );

  const setRequest = useService(AssetsService.getHistoricalPriceData, {
    onResponse(response) {
      setAssetPriceHistory((state) =>
        state.set(response.days, response.historicalPriceData),
      );
    },
    onError(err) {
      console.error(`Error getting ${assetId} historical prices`, err);
    },
  });

  const getHistoricalData = useCallback(
    (request: Omit<HistoricalAssetPriceRequest, "id" | "vs_currency">) => {
      setRequest({ ...request, id: assetId, vs_currency: DEFAULT_CURRENCY });
    },
    [setRequest, assetId],
  );

  return {
    assetPriceHistory,
    getHistoricalData,
  };
};
