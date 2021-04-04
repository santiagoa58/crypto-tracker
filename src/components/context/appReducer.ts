import { assetsReducer } from "../crypto-assets/hooks/assetsReducer";
import { marketMetricsReducer } from "../market-metrics/hooks/marketMetricsReducer";
import { AppActions } from "./AppActions";
import { AppState } from "./AppState";

export const appReducer = (state: AppState, action: AppActions): AppState => ({
  assets: assetsReducer(state.assets, action),
  marketMetrics: marketMetricsReducer(state.marketMetrics, action),
});
