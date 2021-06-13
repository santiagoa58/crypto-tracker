import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppState } from "./AppState";

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
