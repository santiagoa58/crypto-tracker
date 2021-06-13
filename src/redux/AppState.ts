import store from "./store";

export enum StateFetchStatus {
  Idle = "Idle",
  Failure = "Failure",
  Busy = "Busy",
}

export type AppState = ReturnType<typeof store.getState>;
