import { Observable } from "rxjs";

export interface GetAllMarketsRequest {
  exchangeId?: string /*search by exchange id*/;
  baseSymbol?: string /*returns all containing the base symbol*/;
  quoteSymbol?: string /*returns all containing the quote symbol*/;
  baseId?: string /*returns all containing the base id*/;
  quoteId?: string /*returns all containing the quote id*/;
  assetSymbol?: string /*returns all assets containing symbol (base and quote)*/;
  assetId?: string /*returns all assets containing id (base and quote)*/;
  limit?: number /*max limit of 2000*/;
  offset?: number;
}

export interface GetAllMarketsResponse {
  exchangeId: string /*unique identifier for exchange*/;
  rank: string /*rank is in ascending order - this number represents the amount of volume transacted by this market in relation to other markets on that exchange*/;
  baseSymbol: string /*most common symbol used to identify asset, base is asset purchased*/;
  baseId: string /*unique identifier for this asset, base is asset purchased*/;
  quoteSymbol: string /*most common symbol used to identify asset, quote is asset used to purchase base*/;
  quoteId: string /*unique identifier for this asset, quote is asset used to purchase base*/;
  priceQuote: string /*the amount of quote asset traded for one unit of base asset*/;
  priceUsd: string /*quote price translated to USD*/;
  volumeUsd24Hr: string /*volume transacted on this market in last 24 hours*/;
  percentExchangeVolume: string /*the amount of daily volume a single market transacts in relation to total daily volume of all markets on the exchange*/;
  tradesCount24Hr?: string /*number of trades on this market in the last 24 hours*/;
  updated: number /*UNIX timestamp (milliseconds) since information was received from this particular market*/;
}

export interface MarketsServiceInterface {
  getAll(
    request?: GetAllMarketsRequest,
  ): Observable<Array<GetAllMarketsResponse>>;
}
