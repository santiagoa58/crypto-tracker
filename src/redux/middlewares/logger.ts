import { Middleware } from "redux";
import { AppActions } from "../AppActions";

export const logger: Middleware =
  (storeAPI) => (next) => (action: AppActions) => {
    console.info("dispatching: ", action);

    return next(action);
  };
