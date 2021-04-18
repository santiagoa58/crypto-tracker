import { useCallback, useContext } from "react";
import { AssetsService } from "../../services/crypto_assets/AssetsService";
import { CryptoAssetContext } from "../context/CryptoAssetContext";
import { AssetActionTypes } from "./state/AssetActions";
import { useService } from "../../utils/hooks/useService";
import { GetCryptoAssetsRequest } from "../../services/crypto_assets/AssetsServiceInterface";

export const useAssetsService = () => {
  const [appState, dispatch] = useContext(CryptoAssetContext);

  const setRequest = useService(AssetsService.getCryptoAsset, {
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

  const getAssets = useCallback(
    (request: GetCryptoAssetsRequest) => {
      dispatch({ type: AssetActionTypes.GET_ASSETS_REQUEST });
      setRequest(request);
    },
    [dispatch, setRequest],
  );

  return {
    assets: appState.assets?.list,
    status: appState.assets?.status,
    error: appState.assets?.error,
    getAssets,
  };
};
