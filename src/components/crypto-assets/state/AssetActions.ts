import {
  CryptoAsset,
  CryptoAssetIdentifier,
} from "../../../services/crypto_assets/AssetsServiceInterface";
import { AssetUpdate } from "../../../services/feeds/FeedServiceInterface";
import { FluxStandardAction } from "../../../redux/AppActions";

export enum AssetActionTypes {
  GET_ASSETS_REQUEST = "GET_ASSETS_REQUEST",
  GET_ASSETS_SUCCESS = "GET_ASSETS_SUCCESS",
  GET_ASSETS_FAILURE = "GET_ASSETS_FAILURE",
  UPDATE_ASSET = "UPDATE_ASSET",
  GET_ALL_COINS_REQUEST = "GET_ALL_COINS_REQUEST",
  GET_ALL_COINS_SUCCESS = "GET_ALL_COINS_SUCCESS",
  GET_ALL_COINS_FAILURE = "GET_ALL_COINS_FAILURE",
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

interface GetAllCoinsRequestAction
  extends FluxStandardAction<AssetActionTypes> {
  type: AssetActionTypes.GET_ALL_COINS_REQUEST;
}
interface GetAllCoinsSuccessAction
  extends FluxStandardAction<AssetActionTypes> {
  type: AssetActionTypes.GET_ALL_COINS_SUCCESS;
  payload: CryptoAssetIdentifier[];
}
interface GetAllCoinsFailureAction
  extends FluxStandardAction<AssetActionTypes> {
  type: AssetActionTypes.GET_ALL_COINS_FAILURE;
  payload: string;
  error: true;
}

export type AssetActions =
  | GetAssetsRequestAction
  | GetAssetsSuccessAction
  | GetAssetsFailureAction
  | UpdateAssetAction
  | GetAllCoinsRequestAction
  | GetAllCoinsSuccessAction
  | GetAllCoinsFailureAction;
