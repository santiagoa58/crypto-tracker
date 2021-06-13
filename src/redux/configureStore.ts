import { applyMiddleware, createStore } from "redux";
import { appReducer } from "./appReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "./middlewares/logger";

export const configureStore = (initialState?: any) => {
  const enhancer = applyMiddleware(logger);
  const composedEnhancers = composeWithDevTools(enhancer);

  const store = createStore(appReducer, initialState, composedEnhancers);

  return store;
};
