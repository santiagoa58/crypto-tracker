import { useEffect, useContext } from "react";
import { AssetsService } from "../../../services/crypto_assets/AssetsService";
import { CryptoAssetContext } from "../../context/CryptoAssetContext";
import { AssetActionsTypes } from "./AssetActions";

export const useAssetsService = (search?: string) => {
  const [appState, dispatch] = useContext(CryptoAssetContext);

  useEffect(() => {
    const subscription = AssetsService.getCryptoAsset({
      search,
    }).subscribe({
      next(nextValue) {
        dispatch({
          type: AssetActionsTypes.GET_ASSETS_SUCCESS,
          payload: nextValue.assets,
        });
      },
      complete() {
        subscription.unsubscribe();
      },
      error(error) {
        console.error(error);
        dispatch({
          type: AssetActionsTypes.GET_ASSETS_FAILURE,
          error: "Error getting assets",
        });
      },
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [search, dispatch]);

  return {
    assets: appState.assets?.list,
    status: appState.assets?.status,
  };
};
