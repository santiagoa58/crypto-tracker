import {
  integerPriceColDef,
  percentColDef,
  priceColDef,
  quantityColDef,
  stringCompare,
} from "../../utils/columnDefinitions";
import { CryptoAsset } from "../../services/crypto_assets/AssetsServiceInterface";
import { ColumnDefinition } from "../grid/Grid";
import { CryptoNameCell, CryptoNameValue } from "./CryptoNameCell";

export const assetColDefs: ColumnDefinition<CryptoAsset>[] = [
  {
    field: "name",
    colId: "name",
    headerName: "Name",
    valueGetter: ({ data }: { data: CryptoAsset }): CryptoNameValue => ({
      symbol: data.symbol,
      name: data.name,
    }),
    comparator: (valueA: CryptoNameValue, valueB: CryptoNameValue) =>
      stringCompare(valueA.name, valueB.name),
    cellRendererFramework: CryptoNameCell,
    width: 120,
    minWidth: 60,
  },
  {
    ...priceColDef,
    width: 125,
    field: "price",
    colId: "price",
    headerName: "PRICE",
  },
  {
    ...percentColDef,
    width: 100,
    field: "priceChangePercent24h",
    colId: "priceChangePercent24h",
    headerName: "24h %",
  },
  {
    ...integerPriceColDef,
    width: 160,
    field: "totalVolume",
    colId: "totalVolume",
    headerName: "Total Volume",
  },
  {
    ...integerPriceColDef,
    width: 180,
    field: "marketCap",
    colId: "marketCap",
    headerName: "Market Cap",
    initialSort: "desc",
  },
  {
    ...quantityColDef,
    width: 180,
    field: "circulatingSupply",
    colId: "circulatingSupply",
    headerName: "Circulating Supply",
  },
  {
    ...quantityColDef,
    width: 150,
    field: "maxSupply",
    colId: "maxSupply",
    headerName: "Max Supply",
  },
];
