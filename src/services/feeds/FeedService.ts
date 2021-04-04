import { map } from "rxjs/operators";
import { pricesStreamApi } from "../connection/apis";
import { webSocketConnection } from "../connection/websocketConnection";
import {
  AssetPrice,
  FeedServiceInterface,
  PriceFeedSubscriptionRequest,
} from "./FeedServiceInterface";

const PRICES_PATH = `${pricesStreamApi}/prices`;

export const FeedService: FeedServiceInterface = {
  priceFeed: (request: PriceFeedSubscriptionRequest) => {
    return webSocketConnection<PriceFeedSubscriptionRequest, AssetPrice>(
      PRICES_PATH,
      request,
    ).pipe(
      map((response) => {
        return Object.entries(response).map(([id, priceUsd]) => ({
          id,
          priceUsd,
        }));
      }),
    );
  },
};
