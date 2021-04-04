import { bufferTime, mergeMap } from "rxjs/operators";
import { pricesStreamApi } from "../connection/apis";
import { webSocketConnection } from "../connection/websocketConnection";
import {
  AssetPrice,
  FeedServiceInterface,
  PriceFeedSubscriptionRequest,
} from "./FeedServiceInterface";

const PRICES_PATH = `${pricesStreamApi}/prices`;

const mapAssetPriceToPriceUpdate = (asset: AssetPrice) => {
  return Object.entries(asset).map(([id, priceUsd]) => ({
    id,
    priceUsd,
  }));
};

export const FeedService: FeedServiceInterface = {
  priceFeed: (request: PriceFeedSubscriptionRequest) => {
    return webSocketConnection<PriceFeedSubscriptionRequest, AssetPrice>(
      PRICES_PATH,
      request,
    ).pipe(
      bufferTime(500),
      mergeMap((response) => {
        return response.flatMap(mapAssetPriceToPriceUpdate);
      }),
    );
  },
};
