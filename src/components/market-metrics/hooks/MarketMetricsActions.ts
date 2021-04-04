import { FluxStandardAction } from "../../context/AppActions";
import { GlobalMarketMetrics } from "../../../services/crypto_assets/AssetsServiceInterface";

export enum MarketMetricsActionTypes {
  GET_GLOBAL_METRICS_REQUEST = "GET_GLOBAL_METRICS_REQUEST",
  GET_GLOBAL_METRICS_SUCCESS = "GET_GLOBAL_METRICS_SUCCESS",
  GET_GLOBAL_METRICS_FAILURE = "GET_GLOBAL_METRICS_FAILURE",
}

interface GetGlobalMetricsRequestAction
  extends FluxStandardAction<MarketMetricsActionTypes> {
  type: MarketMetricsActionTypes.GET_GLOBAL_METRICS_REQUEST;
}

interface GetGlobalMetricsSuccessAction
  extends FluxStandardAction<MarketMetricsActionTypes> {
  type: MarketMetricsActionTypes.GET_GLOBAL_METRICS_SUCCESS;
  payload: GlobalMarketMetrics;
}

interface GetGlobalMetricsFailureAction
  extends FluxStandardAction<MarketMetricsActionTypes> {
  type: MarketMetricsActionTypes.GET_GLOBAL_METRICS_FAILURE;
  payload: string;
  error: boolean;
}

export type MarketMetricActions =
  | GetGlobalMetricsRequestAction
  | GetGlobalMetricsSuccessAction
  | GetGlobalMetricsFailureAction;
