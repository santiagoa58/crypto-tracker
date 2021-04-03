import {
  CryptoAsset,
  GlobalMarketMetrics,
} from "../../../services/crypto_assets/AssetsServiceInterface";
import { FluxStandardAction } from "../../context/AppActions";

export enum AssetActionsTypes {
  GET_ASSETS_REQUEST = "GET_ASSETS_REQUEST",
  GET_ASSETS_SUCCESS = "GET_ASSETS_SUCCESS",
  GET_ASSETS_FAILURE = "GET_ASSETS_FAILURE",
  GET_GLOBAL_METRICS_REQUEST = "GET_GLOBAL_METRICS_REQUEST",
  GET_GLOBAL_METRICS_SUCCESS = "GET_GLOBAL_METRICS_SUCCESS",
  GET_GLOBAL_METRICS_FAILURE = "GET_GLOBAL_METRICS_FAILURE",
}
interface BaseAssetAction extends FluxStandardAction<AssetActionsTypes> {}

interface GetAssetsRequestAction extends BaseAssetAction {
  type: AssetActionsTypes.GET_ASSETS_REQUEST;
}

interface GetAssetsSuccessAction extends BaseAssetAction {
  type: AssetActionsTypes.GET_ASSETS_SUCCESS;
  payload: CryptoAsset[];
}

interface GetAssetsFailureAction extends BaseAssetAction {
  type: AssetActionsTypes.GET_ASSETS_FAILURE;
  payload: string;
  error: boolean;
}

interface GetGlobalMetricsRequestAction extends BaseAssetAction {
  type: AssetActionsTypes.GET_GLOBAL_METRICS_REQUEST;
}

interface GetGlobalMetricsSuccessAction extends BaseAssetAction {
  type: AssetActionsTypes.GET_GLOBAL_METRICS_SUCCESS;
  payload: GlobalMarketMetrics;
}

interface GetGlobalMetricsFailureAction extends BaseAssetAction {
  type: AssetActionsTypes.GET_GLOBAL_METRICS_FAILURE;
  payload: string;
  error: boolean;
}

export type AssetActions =
  | GetAssetsRequestAction
  | GetAssetsSuccessAction
  | GetAssetsFailureAction
  | GetGlobalMetricsRequestAction
  | GetGlobalMetricsSuccessAction
  | GetGlobalMetricsFailureAction;
