import { useCallback, useMemo, useState } from "react";
import { AssetsService } from "../../services/crypto_assets/AssetsService";
import { useService } from "../../utils/hooks/useService";
import {
  HistoricalAssetPriceRequest,
  HistoricalAssetPriceResponse,
  HistoricalDaysRange,
  HistoricalPriceData,
} from "../../services/crypto_assets/AssetsServiceInterface";
import { Map } from "immutable";
import { DEFAULT_CURRENCY } from "../../utils/constants";

export const useHistoricalPrice = (assetId: string) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [assetPriceHistory, setAssetPriceHistory] = useState(
    Map<HistoricalDaysRange, HistoricalPriceData[]>(),
  );

  const handlers = useMemo(
    () => ({
      onResponse(response: HistoricalAssetPriceResponse) {
        setError(undefined);
        setAssetPriceHistory((state) =>
          state.set(response.days, response.historicalPriceData),
        );
      },
      onError(err: unknown) {
        const errorMessage = `Error getting ${assetId} historical prices`;
        console.error(errorMessage, err);
        setError(errorMessage);
      },
    }),
    [assetId],
  );

  const [setRequest, isBusy] = useService(
    AssetsService.getHistoricalPriceData,
    handlers,
  );

  const getHistoricalData = useCallback(
    (request: Omit<HistoricalAssetPriceRequest, "id" | "vs_currency">) => {
      setError(undefined);
      setRequest({ ...request, id: assetId, vs_currency: DEFAULT_CURRENCY });
    },
    [setRequest, assetId],
  );

  return {
    assetPriceHistory,
    getHistoricalData,
    isBusy,
    error,
  };
};
