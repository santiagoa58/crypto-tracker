import React, { useMemo } from "react";
import { useHistory } from "react-router";
import { CryptoAssetIdentifier } from "../../services/crypto_assets/AssetsServiceInterface";
import { useAllCoinsService } from "../../utils/hooks/useAllCoinsService";
import { PRICE_ACTION_PATH } from "../../utils/routes/paths";
import { SearchOption, SearchSelect } from "./SearchSelect";

export const AssetSearch = () => {
  const history = useHistory();

  const allCoins = useAllCoinsService();
  const options = useMemo<SearchOption<string, CryptoAssetIdentifier>[]>(
    () =>
      allCoins.list
        .map((crypto) => ({
          value: crypto.id,
          label: crypto.name,
          meta: crypto,
        }))
        .sort((optionA, optionB) =>
          optionA.label.localeCompare(optionB.label, undefined, {
            numeric: true,
          }),
        ),
    [allCoins.list],
  );

  return (
    <SearchSelect
      onOptionSelect={(cryptoId) => {
        history.push(`${PRICE_ACTION_PATH}${cryptoId}`);
      }}
      options={options}
      filterOptions={(option, searchValue) => {
        const searchTerm = searchValue.toLowerCase();
        const cryptoName = option.meta!.name.toLowerCase();
        const cryptoSymbol = option.meta!.symbol.toLowerCase();

        return (
          cryptoSymbol.startsWith(searchTerm) ||
          cryptoName.startsWith(searchTerm)
        );
      }}
    />
  );
};
