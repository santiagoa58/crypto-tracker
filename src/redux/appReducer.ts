import { combineReducers } from "redux";
import { assetsReducer } from "../components/crypto-assets/state/assetsReducer";

export const appReducer = combineReducers({
  assets: assetsReducer,
});
