import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/useAppSelector";
import { AssetsService } from "../../services/crypto_assets/AssetsService";
import { useService } from "../../utils/hooks/useService";
import { MarketMetricsActionTypes } from "./state/MarketMetricsActions";

export const useMarketMetrics = () => {
  const dispatch = useDispatch();
  const marketMetricsState = useAppSelector((state) => state.marketMetrics);

  const [setRequest] = useService(AssetsService.getGlobalMarketData, {
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

  const getMarketMetrics = useCallback(() => {
    dispatch({ type: MarketMetricsActionTypes.GET_GLOBAL_METRICS_REQUEST });
    setRequest(null);
  }, [dispatch, setRequest]);

  useEffect(() => {
    getMarketMetrics();
  }, [getMarketMetrics]);

  return {
    marketMetrics: marketMetricsState,
  };
};
