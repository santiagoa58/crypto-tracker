import { useState, useEffect } from "react";
import { MarketsService } from "../../services/MarketsService";
import { GetAllMarketsResponse } from "../../services/MarketsServiceInterface";

export const useMarketsService = (
  exchangeId = "binance",
  quoteSymbol = "USDT",
) => {
  const [markets, setMarkets] = useState<Array<GetAllMarketsResponse>>();

  useEffect(() => {
    const subscription = MarketsService.getAll({
      quoteSymbol,
      exchangeId,
    }).subscribe({
      next(nextValue) {
        setMarkets(nextValue);
      },
      complete() {
        subscription.unsubscribe();
      },
      error(error) {
        console.error(error);
      },
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [exchangeId, quoteSymbol]);

  return markets;
};
