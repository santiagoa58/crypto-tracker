import { useReducer, useEffect } from "react";
import { AssetsService } from "../../services/crypto_assets/AssetsService";
import { useService } from "../../utils/hooks/useService";
import { MarketMetricsActionTypes } from "./state/MarketMetricsActions";
import {
  initialMarketMetricsState,
  marketMetricsReducer,
} from "./state/marketMetricsReducer";

export const useMarketMetrics = () => {
  const [marketMetricsState, dispatch] = useReducer(
    marketMetricsReducer,
    initialMarketMetricsState,
  );

  const [getMarketMetrics] = useService(AssetsService.getGlobalMarketData, {
    onResponse(response) {
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
  });

  useEffect(() => {
    dispatch({ type: MarketMetricsActionTypes.GET_GLOBAL_METRICS_REQUEST });
    getMarketMetrics(null);
  }, [dispatch, getMarketMetrics]);

  return {
    marketMetrics: marketMetricsState,
  };
};
