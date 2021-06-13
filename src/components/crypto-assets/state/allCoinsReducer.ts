import { AppActions } from "../../../redux/AppActions";
import { StateFetchStatus } from "../../../redux/AppState";
import { CryptoAssetIdentifier } from "../../../services/crypto_assets/AssetsServiceInterface";
import { AssetActionTypes } from "./AssetActions";

export interface AllCoinsState {
  status: StateFetchStatus;
  list: CryptoAssetIdentifier[];
}

const initialState: AllCoinsState = {
  status: StateFetchStatus.Idle,
  list: [],
};

export const allCoinsReducer = (
  state: AllCoinsState = initialState,
  action: AppActions,
): AllCoinsState => {
  switch (action.type) {
    case AssetActionTypes.GET_ALL_COINS_REQUEST:
      return { ...state, status: StateFetchStatus.Busy };
    case AssetActionTypes.GET_ALL_COINS_SUCCESS:
      return { ...state, list: action.payload, status: StateFetchStatus.Idle };
    case AssetActionTypes.GET_ALL_COINS_FAILURE:
      return { ...state, status: StateFetchStatus.Failure };
    default:
      return state;
  }
};
