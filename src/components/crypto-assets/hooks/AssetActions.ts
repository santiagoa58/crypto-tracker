import {
  CryptoAsset,
  GlobalMarketMetrics,
} from "../../../services/crypto_assets/AssetsServiceInterface";

export enum AssetActionsTypes {
  GET_ASSETS_REQUEST = "GET_ASSETS_REQUEST",
  GET_ASSETS_SUCCESS = "GET_ASSETS_SUCCESS",
  GET_ASSETS_FAILURE = "GET_ASSETS_FAILURE",
  GET_GLOBAL_METRICS_REQUEST = "GET_GLOBAL_METRICS_REQUEST",
  GET_GLOBAL_METRICS_SUCCESS = "GET_GLOBAL_METRICS_SUCCESS",
  GET_GLOBAL_METRICS_FAILURE = "GET_GLOBAL_METRICS_FAILURE",
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

interface GetGlobalMetricsRequestAction {
  type: AssetActionsTypes.GET_GLOBAL_METRICS_REQUEST;
}

interface GetGlobalMetricsSuccessAction {
  type: AssetActionsTypes.GET_GLOBAL_METRICS_SUCCESS;
  payload: GlobalMarketMetrics;
}

interface GetGlobalMetricsFailureAction {
  type: AssetActionsTypes.GET_GLOBAL_METRICS_FAILURE;
  error: string;
}

export type AssetActions =
  | GetAssetsRequestAction
  | GetAssetsSuccessAction
  | GetAssetsFailureAction
  | GetGlobalMetricsRequestAction
  | GetGlobalMetricsSuccessAction
  | GetGlobalMetricsFailureAction;
