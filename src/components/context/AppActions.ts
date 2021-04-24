import { AssetActions } from "../crypto-assets/state/AssetActions";
import { MarketMetricActions } from "../market-metrics/state/MarketMetricsActions";

export interface FluxStandardAction<Type> {
  type: Type;
  payload?: any;
  error?: boolean;
}

export enum RouteActionTypes {
  ROUTE_CHANGE = "ROUTE_CHANGE",
}

interface RouteAction extends FluxStandardAction<RouteActionTypes> {
  type: RouteActionTypes.ROUTE_CHANGE;
  payload: string[];
}

export type AppActions = AssetActions | MarketMetricActions | RouteAction;
