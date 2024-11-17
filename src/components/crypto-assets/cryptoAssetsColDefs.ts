import { CryptoAsset } from "../../services/crypto_assets/AssetsServiceInterface";
import {
  integerPriceColDef,
  numericColDef,
  percentColDef,
  priceColDef,
  quantityColDef,
  stringCompare,
} from "../../utils/columnDefinitions";
import { ColumnDefinition } from "../grid/Grid";
import { CryptoNameCell, CryptoNameValue } from "./CryptoNameCell";

export const assetColDefs: ColumnDefinition<CryptoAsset>[] = [
  {
    ...numericColDef,
    width: 80,
    field: "rank",
    colId: "rank",
    headerName: "#",
    initialSort: "asc",
  },
  {
    field: "name",
    colId: "name",
    headerName: "Name",
    valueGetter: ({ data }: { data: CryptoAsset }): CryptoNameValue => ({
      symbol: data.symbol,
      name: data.name,
      image: data.image,
    }),
    comparator: (valueA: CryptoNameValue, valueB: CryptoNameValue) =>
      stringCompare(valueA.symbol, valueB.symbol),
    cellRenderer: CryptoNameCell,
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
  },
  {
    ...quantityColDef,
    width: 210,
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
