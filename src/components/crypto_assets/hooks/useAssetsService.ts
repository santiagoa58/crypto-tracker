import { useState, useEffect } from "react";
import { AssetsService } from "../../../services/crypto_assets/AssetsService";
import { CryptoAsset } from "../../../services/crypto_assets/AssetsServiceInterface";

const EMPTY_ASSETS: CryptoAsset[] = [];

export const useAssetsService = (search?: string): Array<CryptoAsset> => {
  const [cryptos, setCryptos] = useState<Array<CryptoAsset>>();

  useEffect(() => {
    const subscription = AssetsService.getCryptoAsset({
      search,
    }).subscribe({
      next(nextValue) {
        setCryptos(nextValue.assets);
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
  }, [search]);

  return cryptos ?? EMPTY_ASSETS;
};
