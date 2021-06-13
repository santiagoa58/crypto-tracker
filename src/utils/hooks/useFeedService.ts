import { useMemo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AssetActionTypes } from "../../components/crypto-assets/state/AssetActions";
import { useAppSelector } from "../../redux/useAppSelector";
import { FeedService } from "../../services/feeds/FeedService";
import { useService } from "./useService";

export const usePricesFeed = () => {
  const dispatch = useDispatch();
  const assetsState = useAppSelector((state) => state.assets?.list);
  const assets = useMemo(() => assetsState?.keySeq().toArray(), [assetsState]);
  const prevAssets = useRef<string>();

  const [subscribeToFeed] = useService(FeedService.priceFeed, {
    onResponse(response) {
      dispatch({
        type: AssetActionTypes.UPDATE_ASSET,
        payload: response,
      });
    },
    onError(err) {
      console.error("Error", err);
    },
  });

  useEffect(() => {
    const stringAssets = String(assets);
    if (assets && stringAssets !== prevAssets.current) {
      prevAssets.current = stringAssets;
      subscribeToFeed({ assets });
    }
  }, [subscribeToFeed, assets]);
};
