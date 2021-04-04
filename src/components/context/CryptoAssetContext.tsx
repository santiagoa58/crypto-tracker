import React, { FC, createContext, useReducer, Dispatch } from "react";
import { AppActions } from "./AppActions";
import { appReducer } from "./appReducer";
import { AppState } from "./AppState";

const initialState: AppState = {};
export const CryptoAssetContext = createContext<
  [AppState, Dispatch<AppActions>]
>([initialState, () => null]);

export const CryptoAssetContextProvider: FC = (props) => {
  const reducer = useReducer(appReducer, initialState);

  return (
    <CryptoAssetContext.Provider value={reducer}>
      {props.children}
    </CryptoAssetContext.Provider>
  );
};
