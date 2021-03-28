import { AssetsState } from "../crypto-assets/hooks/assetsReducer";
import { GlobalMarketMetricsState } from "../crypto-assets/hooks/marketMetricsReducer";

export interface AppState {
  assets?: AssetsState;
  marketMetrics?: GlobalMarketMetricsState;
}

export enum StateFetchStatus {
  Idle = "Idle",
  Failure = "Failure",
  Busy = "Busy",
}
