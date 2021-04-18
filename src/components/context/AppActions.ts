import { AssetActions } from "../crypto-assets/state/AssetActions";
import { MarketMetricActions } from "../market-metrics/state/MarketMetricsActions";

export interface FluxStandardAction<Type> {
  type: Type;
  payload?: any;
  error?: boolean;
}

export type AppActions = AssetActions | MarketMetricActions;
