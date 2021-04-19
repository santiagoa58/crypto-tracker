import { AssetsState } from "../crypto-assets/state/assetsReducer";

export interface AppState {
  assets?: AssetsState;
}
export enum StateFetchStatus {
  Idle = "Idle",
  Failure = "Failure",
  Busy = "Busy",
}
