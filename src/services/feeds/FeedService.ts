import { mergeMap, retryWhen, tap, delay, throttleTime } from "rxjs/operators";
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
      throttleTime(1000),
      mergeMap(mapAssetPriceToPriceUpdate),
      retryWhen((errors) =>
        errors.pipe(
          tap(() => console.log("connection failed, retrying...")),
          delay(2000),
        ),
      ),
    );
  },
};
