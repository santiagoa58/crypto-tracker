import { FluxStandardAction } from "../../components/context/AppActions";

export enum UseServiceActionsTypes {
  FETCH_REQUEST = "FETCH_REQUEST",
  RESET = "RESET",
}

type BaseServiceAction = FluxStandardAction<UseServiceActionsTypes>;

interface FetchServiceAction extends BaseServiceAction {
  type: UseServiceActionsTypes.FETCH_REQUEST;
  payload: any;
}

interface ResetServiceAction extends BaseServiceAction {
  type: UseServiceActionsTypes.RESET;
}

export type UseServiceActions = FetchServiceAction | ResetServiceAction;
