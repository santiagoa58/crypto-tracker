import { CryptoAsset } from "../../../services/crypto_assets/AssetsServiceInterface";
import { AssetUpdate } from "../../../services/feeds/FeedServiceInterface";
import { FluxStandardAction } from "../../context/AppActions";

export enum AssetActionTypes {
  GET_ASSETS_REQUEST = "GET_ASSETS_REQUEST",
  GET_ASSETS_SUCCESS = "GET_ASSETS_SUCCESS",
  GET_ASSETS_FAILURE = "GET_ASSETS_FAILURE",
  UPDATE_ASSET = "UPDATE_ASSET",
}

interface GetAssetsRequestAction extends FluxStandardAction<AssetActionTypes> {
  type: AssetActionTypes.GET_ASSETS_REQUEST;
}

interface GetAssetsSuccessAction extends FluxStandardAction<AssetActionTypes> {
  type: AssetActionTypes.GET_ASSETS_SUCCESS;
  payload: CryptoAsset[];
}

interface GetAssetsFailureAction extends FluxStandardAction<AssetActionTypes> {
  type: AssetActionTypes.GET_ASSETS_FAILURE;
  payload: string;
  error: boolean;
}

interface UpdateAssetAction extends FluxStandardAction<AssetActionTypes> {
  type: AssetActionTypes.UPDATE_ASSET;
  payload: AssetUpdate;
}

export type AssetActions =
  | GetAssetsRequestAction
  | GetAssetsSuccessAction
  | GetAssetsFailureAction
  | UpdateAssetAction;
