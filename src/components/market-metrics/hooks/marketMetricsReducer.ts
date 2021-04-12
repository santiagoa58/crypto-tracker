import { GlobalMarketMetrics } from "../../../services/crypto_assets/AssetsServiceInterface";
import { AppActions } from "../../context/AppActions";
import { StateFetchStatus } from "../../context/AppState";
import { MarketMetricsActionTypes } from "./MarketMetricsActions";

export interface GlobalMarketMetricsState extends Partial<GlobalMarketMetrics> {
  status: StateFetchStatus;
}

const initialState: GlobalMarketMetricsState = {
  status: StateFetchStatus.Idle,
};

export const marketMetricsReducer = (
  state: GlobalMarketMetricsState = initialState,
  action: AppActions,
): GlobalMarketMetricsState => {
  switch (action.type) {
    case MarketMetricsActionTypes.GET_GLOBAL_METRICS_REQUEST:
      return { ...state, status: StateFetchStatus.Busy };
    case MarketMetricsActionTypes.GET_GLOBAL_METRICS_SUCCESS:
      return { ...state, ...action.payload, status: StateFetchStatus.Idle };
    case MarketMetricsActionTypes.GET_GLOBAL_METRICS_FAILURE:
      return { ...state, status: StateFetchStatus.Failure };
    default:
      return state;
  }
};