import { useContext, useEffect } from "react";
import { AssetsService } from "../../../services/crypto_assets/AssetsService";
import { CryptoAssetContext } from "../../context/CryptoAssetContext";
import { AssetActionsTypes } from "./AssetActions";

export const useMarketMetrics = () => {
  const [appState, dispatch] = useContext(CryptoAssetContext);
  useEffect(() => {
    dispatch({ type: AssetActionsTypes.GET_GLOBAL_METRICS_REQUEST });
    const subscription = AssetsService.getGlobalMarketData().subscribe({
      next(nextValue) {
        dispatch({
          type: AssetActionsTypes.GET_GLOBAL_METRICS_SUCCESS,
          payload: nextValue,
        });
        console.log("nextValue:", nextValue);
      },
      complete() {
        subscription.unsubscribe();
      },
      error(error) {
        console.error(error);
        dispatch({
          type: AssetActionsTypes.GET_GLOBAL_METRICS_FAILURE,
          error: "Error getting global market data",
        });
      },
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [dispatch]);

  return {
    marketMetrics: appState.marketMetrics,
  };
};
