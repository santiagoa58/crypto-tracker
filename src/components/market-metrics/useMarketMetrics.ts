import { useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/useAppSelector";
import { AssetsService } from "../../services/crypto_assets/AssetsService";
import { GlobalMarketMetrics } from "../../services/crypto_assets/AssetsServiceInterface";
import { useService } from "../../utils/hooks/useService";
import { MarketMetricsActionTypes } from "./state/MarketMetricsActions";

export const useMarketMetrics = () => {
  const dispatch = useDispatch();
  const marketMetricsState = useAppSelector((state) => state.marketMetrics);

  const handlers = useMemo(
    () => ({
      onResponse(response: GlobalMarketMetrics) {
        dispatch({
          type: MarketMetricsActionTypes.GET_GLOBAL_METRICS_SUCCESS,
          payload: response,
        });
      },
      onError() {
        dispatch({
          type: MarketMetricsActionTypes.GET_GLOBAL_METRICS_FAILURE,
          payload: "Error getting global market data",
          error: true,
        });
      },
    }),
    [dispatch],
  );

  const [setRequest] = useService(AssetsService.getGlobalMarketData, handlers);

  const getMarketMetrics = useCallback(() => {
    dispatch({ type: MarketMetricsActionTypes.GET_GLOBAL_METRICS_REQUEST });
    setRequest(null);
  }, [dispatch, setRequest]);

  useEffect(() => {
    getMarketMetrics();
    // Only fetch on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    marketMetrics: marketMetricsState,
  };
};
