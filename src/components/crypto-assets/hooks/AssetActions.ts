import { CryptoAsset } from "../../../services/crypto_assets/AssetsServiceInterface";
import { FluxStandardAction } from "../../context/AppActions";

export enum AssetActionTypes {
  GET_ASSETS_REQUEST = "GET_ASSETS_REQUEST",
  GET_ASSETS_SUCCESS = "GET_ASSETS_SUCCESS",
  GET_ASSETS_FAILURE = "GET_ASSETS_FAILURE",
}
interface BaseAssetAction extends FluxStandardAction<AssetActionTypes> {}

interface GetAssetsRequestAction extends BaseAssetAction {
  type: AssetActionTypes.GET_ASSETS_REQUEST;
}

interface GetAssetsSuccessAction extends BaseAssetAction {
  type: AssetActionTypes.GET_ASSETS_SUCCESS;
  payload: CryptoAsset[];
}

interface GetAssetsFailureAction extends BaseAssetAction {
  type: AssetActionTypes.GET_ASSETS_FAILURE;
  payload: string;
  error: boolean;
}

export type AssetActions =
  | GetAssetsRequestAction
  | GetAssetsSuccessAction
  | GetAssetsFailureAction;
