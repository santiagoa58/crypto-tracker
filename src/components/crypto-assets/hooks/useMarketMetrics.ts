import { useContext, useEffect } from "react";
import { AssetsService } from "../../../services/crypto_assets/AssetsService";
import { useService } from "../../../utils/hooks/useService";
import { CryptoAssetContext } from "../../context/CryptoAssetContext";
import { AssetActionsTypes } from "./AssetActions";

export const useMarketMetrics = () => {
  const [appState, dispatch] = useContext(CryptoAssetContext);

  const getMarketMetrics = useService(AssetsService.getGlobalMarketData, {
    onResponse(response) {
      dispatch({
        type: AssetActionsTypes.GET_GLOBAL_METRICS_SUCCESS,
        payload: response,
      });
    },
    onError() {
      dispatch({
        type: AssetActionsTypes.GET_GLOBAL_METRICS_FAILURE,
        payload: "Error getting global market data",
        error: true,
      });
    },
  });

  useEffect(() => {
    dispatch({ type: AssetActionsTypes.GET_GLOBAL_METRICS_REQUEST });
    getMarketMetrics(null);
  }, [dispatch, getMarketMetrics]);

  return {
    marketMetrics: appState.marketMetrics,
  };
};
