import { AppActions } from "../../context/AppActions";
import { AssetActionsTypes } from "./AssetActions";
import { Map } from "immutable";
import { CryptoAsset } from "../../../services/crypto_assets/AssetsServiceInterface";
import { arrayToMap } from "../../../utils/arrayToMap";
import { StateFetchStatus } from "../../context/AppState";
export interface AssetsState {
  list: Map<string, CryptoAsset>;
  status: StateFetchStatus;
  error?: string;
}

const initalState: AssetsState = {
  list: Map(),
  status: StateFetchStatus.Idle,
};

export const assetsReducer = (
  state: AssetsState = initalState,
  action: AppActions,
) => {
  switch (action.type) {
    case AssetActionsTypes.GET_ASSETS_REQUEST:
      return {
        ...state,
        error: undefined,
        status: StateFetchStatus.Busy,
      };
    case AssetActionsTypes.GET_ASSETS_SUCCESS:
      return {
        ...state,
        error: undefined,
        status: StateFetchStatus.Idle,
        list: state.list.merge(arrayToMap(action.payload, "id")),
      };
    case AssetActionsTypes.GET_ASSETS_FAILURE:
      return {
        ...state,
        status: StateFetchStatus.Failure,
        error: action.payload,
      };
    default:
      return state;
  }
};
