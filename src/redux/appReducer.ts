import { combineReducers } from "redux";
import { allCoinsReducer } from "../components/crypto-assets/state/allCoinsReducer";
import { assetsReducer } from "../components/crypto-assets/state/assetsReducer";
import { marketMetricsReducer } from "../components/market-metrics/state/marketMetricsReducer";

export const appReducer = combineReducers({
  assets: assetsReducer,
  marketMetrics: marketMetricsReducer,
  allCoins: allCoinsReducer,
});
