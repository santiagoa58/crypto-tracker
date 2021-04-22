import { mergeMap, throttleTime } from "rxjs/operators";
import { retryConnection } from "../../utils/retryConnection";
import { getSafeNumber } from "../../utils/safeGetters";
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
    price: getSafeNumber(priceUsd)!,
  }));
};

export const FeedService: FeedServiceInterface = {
  priceFeed: (request: PriceFeedSubscriptionRequest) => {
    return webSocketConnection<PriceFeedSubscriptionRequest, AssetPrice>(
      PRICES_PATH,
      request,
    ).pipe(
      throttleTime(500),
      mergeMap(mapAssetPriceToPriceUpdate),
      retryConnection(
        "failed to connect to price feed. attempting to reconnect...",
      ),
    );
  },
};
