import { useContext, useEffect } from "react";
import { AssetsService } from "../../../services/crypto_assets/AssetsService";
import { CryptoAssetContext } from "../../context/CryptoAssetContext";
import { AssetActionTypes } from "./AssetActions";
import { useService } from "../../../utils/hooks/useService";

export const useAssetsService = (search?: string) => {
  const [appState, dispatch] = useContext(CryptoAssetContext);

  const getAssets = useService(AssetsService.getCryptoAsset, {
    onResponse(response) {
      dispatch({
        type: AssetActionTypes.GET_ASSETS_SUCCESS,
        payload: response.assets,
      });
    },
    onError() {
      dispatch({
        type: AssetActionTypes.GET_ASSETS_FAILURE,
        payload: "Error getting assets",
        error: true,
      });
    },
  });

  useEffect(() => {
    dispatch({ type: AssetActionTypes.GET_ASSETS_REQUEST });
    getAssets({ search });
  }, [dispatch, getAssets, search]);

  return {
    assets: appState.assets?.list,
    status: appState.assets?.status,
    error: appState.assets?.error,
  };
};
