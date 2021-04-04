import { useContext } from "react";
import { CryptoAssetContext } from "../../components/context/CryptoAssetContext";
import { AssetActionTypes } from "../../components/crypto-assets/hooks/AssetActions";
import { FeedService } from "../../services/feeds/FeedService";
import { useService } from "./useService";

export const usePricesFeed = () => {
  const [, dispatch] = useContext(CryptoAssetContext);

  const subscribeToFeed = useService(FeedService.priceFeed, {
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

  return subscribeToFeed;
};
