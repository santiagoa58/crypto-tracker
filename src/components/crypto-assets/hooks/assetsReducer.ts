import { AppActions } from "../../context/AppActions";
import { AssetActionTypes } from "./AssetActions";
import { OrderedMap } from "immutable";
import { CryptoAsset } from "../../../services/crypto_assets/AssetsServiceInterface";
import { arrayToMap } from "../../../utils/arrayToMap";
import { StateFetchStatus } from "../../context/AppState";
import { PriceUpdate } from "../../../services/feeds/FeedServiceInterface";
export interface AssetsState {
  list: OrderedMap<string, CryptoAsset>;
  status: StateFetchStatus;
  error?: string;
}

const initalState: AssetsState = {
  list: OrderedMap(),
  status: StateFetchStatus.Idle,
};

export const assetsReducer = (
  state: AssetsState = initalState,
  action: AppActions,
) => {
  switch (action.type) {
    case AssetActionTypes.GET_ASSETS_REQUEST:
      return {
        ...state,
        error: undefined,
        status: StateFetchStatus.Busy,
      };
    case AssetActionTypes.GET_ASSETS_SUCCESS:
      return {
        ...state,
        error: undefined,
        status: StateFetchStatus.Idle,
        list: state.list.merge(arrayToMap(action.payload, "id")),
      };
    case AssetActionTypes.GET_ASSETS_FAILURE:
      return {
        ...state,
        status: StateFetchStatus.Failure,
        error: action.payload,
      };

    case AssetActionTypes.UPDATE_ASSET:
      return {
        ...state,
        list: updateAsset(state.list, action.payload),
      };
    default:
      return state;
  }
};

const updateAsset = (
  state: AssetsState["list"],
  updates: Array<PriceUpdate>,
) => {
  let updateMap: AssetsState["list"] = OrderedMap();

  updates.forEach((update) => {
    const oldVal = state.get(update.id);
    if (oldVal) {
      updateMap = updateMap.set(update.id, { ...oldVal, ...update });
    }
  });

  return state.merge(updateMap);
};
