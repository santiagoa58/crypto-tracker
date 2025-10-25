import { useMemo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AssetActionTypes } from "../../components/crypto-assets/state/AssetActions";
import { useAppSelector } from "../../redux/useAppSelector";
import { FeedService } from "../../services/feeds/FeedService";
import { AssetUpdate } from "../../services/feeds/FeedServiceInterface";
import { useService } from "./useService";

export const usePricesFeed = () => {
  const dispatch = useDispatch();
  const assetsState = useAppSelector((state) => state.assets?.list);
  const assets = useMemo(() => assetsState?.keySeq().toArray(), [assetsState]);
  const prevAssets = useRef<string>();

  const handlers = useMemo(
    () => ({
      onResponse(response: AssetUpdate) {
        dispatch({
          type: AssetActionTypes.UPDATE_ASSET,
          payload: response,
        });
      },
      onError(err: unknown) {
        console.error("Error", err);
      },
    }),
    [dispatch],
  );

  const [subscribeToFeed] = useService(FeedService.priceFeed, handlers);

  useEffect(() => {
    const stringAssets = String(assets);
    if (assets && stringAssets !== prevAssets.current) {
      prevAssets.current = stringAssets;
      subscribeToFeed({ assets });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets]);
};
