import { useCallback, useState } from "react";
import { AssetsService } from "../../services/crypto_assets/AssetsService";
import { useService } from "../../utils/hooks/useService";
import {
  HistoricalAssetPriceRequest,
  HistoricalPriceData,
  HistoricalPriceInterval,
} from "../../services/crypto_assets/AssetsServiceInterface";
import { Map } from "immutable";
import { isDefined } from "../../utils/isDefined";

export const useHistoricalPrice = (assetId: string) => {
  const [assetPriceHistory, setAssetPriceHistory] = useState(
    Map<HistoricalPriceInterval, HistoricalPriceData[]>(),
  );

  const setRequest = useService(AssetsService.getHistoricalPriceData, {
    onResponse(response) {
      setAssetPriceHistory((state) =>
        state.set(
          response.interval,
          response.historicalPriceData.filter((data) =>
            isDefined(data?.priceUsd),
          ),
        ),
      );
    },
    onError(err) {
      console.error(`Error getting ${assetId} historical prices`, err);
    },
  });

  const getHistoricalData = useCallback(
    (request: Omit<HistoricalAssetPriceRequest, "id">) => {
      setRequest({ ...request, id: assetId });
    },
    [setRequest, assetId],
  );

  return {
    assetPriceHistory,
    getHistoricalData,
  };
};
