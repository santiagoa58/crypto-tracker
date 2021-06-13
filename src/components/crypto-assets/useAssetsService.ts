import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AssetsService } from "../../services/crypto_assets/AssetsService";
import { AssetActionTypes } from "./state/AssetActions";
import { useService } from "../../utils/hooks/useService";
import { GetCryptoAssetsRequest } from "../../services/crypto_assets/AssetsServiceInterface";
import { useAppSelector } from "../../redux/useAppSelector";

export const useAssetsService = () => {
  const dispatch = useDispatch();
  const assetsState = useAppSelector((state) => state.assets);

  const [setRequest] = useService(AssetsService.getCryptoAssets, {
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
    assets: assetsState?.list,
    status: assetsState?.status,
    error: assetsState?.error,
    getAssets,
  };
};

export const useAssetDetailsService = (assetId: string) => {
  const dispatch = useDispatch();
  const assetsState = useAppSelector((state) => state.assets);

  const [setRequest] = useService(AssetsService.getAssetDetails, {
    onResponse(response) {
      dispatch({
        type: AssetActionTypes.UPDATE_ASSET,
        payload: response,
      });
    },
    onError() {
      dispatch({
        type: AssetActionTypes.GET_ASSETS_FAILURE,
        payload: `Error getting ${assetId} details`,
        error: true,
      });
    },
  });

  const getAsset = useCallback(() => {
    dispatch({ type: AssetActionTypes.GET_ASSETS_REQUEST });
    setRequest({ id: assetId });
  }, [dispatch, setRequest, assetId]);

  return {
    asset: assetsState?.list.get(assetId),
    status: assetsState?.status,
    error: assetsState?.error,
    getAsset,
  };
};
