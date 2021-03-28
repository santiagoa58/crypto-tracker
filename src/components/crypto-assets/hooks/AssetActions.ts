import { CryptoAsset } from "../../../services/crypto_assets/AssetsServiceInterface";

export enum AssetActionsTypes {
  GET_ASSETS_REQUEST = "GET_ASSETS_REQUEST",
  GET_ASSETS_SUCCESS = "GET_ASSETS_SUCCESS",
  GET_ASSETS_FAILURE = "GET_ASSETS_FAILURE",
}

interface GetAssetsRequestAction {
  type: AssetActionsTypes.GET_ASSETS_REQUEST;
}

interface GetAssetsSuccessAction {
  type: AssetActionsTypes.GET_ASSETS_SUCCESS;
  payload: CryptoAsset[];
}

interface GetAssetsFailureAction {
  type: AssetActionsTypes.GET_ASSETS_FAILURE;
  error: string;
}

export type AssetActions =
  | GetAssetsRequestAction
  | GetAssetsSuccessAction
  | GetAssetsFailureAction;
