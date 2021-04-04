import { AssetActions } from "../crypto-assets/hooks/AssetActions";
import { MarketMetricActions } from "../market-metrics/hooks/MarketMetricsActions";

export interface FluxStandardAction<Type> {
  type: Type;
  payload?: any;
  error?: boolean;
}

export type AppActions = AssetActions | MarketMetricActions;
