import { AssetActions } from "../crypto-assets/hooks/AssetActions";

export interface FluxStandardAction<Type> {
  type: Type;
  payload?: any;
  error?: boolean;
}

export type AppActions = AssetActions;
