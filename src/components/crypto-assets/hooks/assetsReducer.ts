import { AppActions } from "../../context/AppActions";
import { AssetActionsTypes } from "./AssetActions";
import { Map } from "immutable";
import { CryptoAsset } from "../../../services/crypto_assets/AssetsServiceInterface";
import { arrayToMap } from "../../../utils/arrayToMap";

enum AssetFetchStatus {
  Idle = "Idle",
  Failure = "Failure",
  Busy = "Busy",
}

export interface AssetsState {
  list: Map<string, CryptoAsset>;
  status: AssetFetchStatus;
  error?: string;
}

const initalState: AssetsState = {
  list: Map(),
  status: AssetFetchStatus.Idle,
};

export const assetsReducer = (
  state: AssetsState = initalState,
  action: AppActions,
) => {
  switch (action.type) {
    case AssetActionsTypes.GET_ASSETS_REQUEST:
      return {
        ...state,
        status: AssetFetchStatus.Busy,
      };
    case AssetActionsTypes.GET_ASSETS_SUCCESS:
      return {
        ...state,
        status: AssetFetchStatus.Idle,
        list: state.list.merge(arrayToMap(action.payload, "id")),
      };
    case AssetActionsTypes.GET_ASSETS_FAILURE:
      return {
        ...state,
        status: AssetFetchStatus.Failure,
        error: action.error,
      };
    default:
      return state;
  }
};
