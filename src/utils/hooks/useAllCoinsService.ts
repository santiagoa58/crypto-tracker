import { useCallback, useEffect, useMemo } from "react";
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

  const handlers = useMemo(
    () => ({
      onResponse(allCoins: CryptoAssetIdentifier[]) {
        setCoinsList(allCoins);
      },
      onError(err: unknown) {
        console.error("Error getting all coins", err);
        setCoinsListFailure("Error getting all coins");
      },
    }),
    [setCoinsList, setCoinsListFailure],
  );

  const [setRequest] = useService(AssetsService.getAllCoins, handlers);

  const getCoinsList = useCallback(() => {
    dispatch({ type: AssetActionTypes.GET_ALL_COINS_REQUEST });
    setRequest(null);
  }, [dispatch, setRequest]);

  useEffect(() => {
    getCoinsList();
    // Only fetch on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return allCoins;
};
