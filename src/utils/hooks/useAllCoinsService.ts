import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AssetActionTypes } from "../../components/crypto-assets/state/AssetActions";
import { useAppSelector } from "../../redux/useAppSelector";
import { AssetsService } from "../../services/crypto_assets/AssetsService";
import { CryptoAssetIdentifier } from "../../services/crypto_assets/AssetsServiceInterface";
import { useService } from "./useService";

export const useAllCoinsService = () => {
  const allCoins = useAppSelector((state) => state.allCoins);

  const dispatch = useDispatch();
  const setCoinsList = useCallback(
    (allCoins: CryptoAssetIdentifier[]) => {
      dispatch({
        type: AssetActionTypes.GET_ALL_COINS_SUCCESS,
        payload: allCoins,
      });
    },
    [dispatch],
  );

  const setCoinsListFailure = useCallback(
    (error: string) => {
      dispatch({
        type: AssetActionTypes.GET_ALL_COINS_FAILURE,
        payload: error,
        error: true,
      });
    },
    [dispatch],
  );

  const [setRequest] = useService(AssetsService.getAllCoins, {
    onResponse(allCoins) {
      setCoinsList(allCoins);
    },
    onError(err) {
      console.error("Error getting all coins", err);
      setCoinsListFailure("Error getting all coins");
    },
  });

  const getCoinsList = useCallback(() => {
    dispatch({ type: AssetActionTypes.GET_ALL_COINS_REQUEST });
    setRequest(null);
  }, [dispatch, setRequest]);

  useEffect(() => {
    getCoinsList();
  }, [getCoinsList]);

  return allCoins;
};
