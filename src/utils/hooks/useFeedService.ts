import { useContext, useMemo, useEffect, useRef } from "react";
import { CryptoAssetContext } from "../../components/context/CryptoAssetContext";
import { AssetActionTypes } from "../../components/crypto-assets/state/AssetActions";
import { FeedService } from "../../services/feeds/FeedService";
import { useService } from "./useService";

export const usePricesFeed = () => {
  const [appState, dispatch] = useContext(CryptoAssetContext);
  const assets = useMemo(() => appState.assets?.list.keySeq().toArray(), [
    appState.assets?.list,
  ]);
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
