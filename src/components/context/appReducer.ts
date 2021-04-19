import { assetsReducer } from "../crypto-assets/state/assetsReducer";
import { AppActions } from "./AppActions";
import { AppState } from "./AppState";

export const appReducer = (state: AppState, action: AppActions): AppState => ({
  assets: assetsReducer(state.assets, action),
});
