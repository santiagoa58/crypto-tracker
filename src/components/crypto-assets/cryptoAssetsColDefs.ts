import {
  integerPriceColDef,
  percentColDef,
  priceColDef,
  quantityColDef,
  numericColDef,
  stringCompare,
} from "../../utils/columnDefinitions";
import { CryptoAsset } from "../../services/crypto_assets/AssetsServiceInterface";
import { ColumnDefinition } from "../grid/Grid";
import { CryptoNameCell, CryptoNameValue } from "./CryptoNameCell";

export const assetColDefs: ColumnDefinition[] = [
  {
    ...numericColDef,
    field: "rank",
    colId: "rank",
    headerName: "#",
    width: 80,
    initialSort: "asc",
  },
  {
    field: "name",
    colId: "name",
    headerName: "ASSET NAME",
    valueGetter: ({ data }: { data: CryptoAsset }): CryptoNameValue => ({
      symbol: data.symbol,
      name: data.name,
    }),
    comparator: (valueA: CryptoNameValue, valueB: CryptoNameValue) =>
      stringCompare(valueA.name, valueB.name),
    cellRendererFramework: CryptoNameCell,
    width: 200,
    minWidth: 100,
  },
  {
    ...priceColDef,
    width: 130,
    field: "priceUsd",
    colId: "priceUsd",
    headerName: "PRICE",
  },
  {
    ...percentColDef,
    width: 165,
    field: "changePercent24Hr",
    colId: "changePercent24Hr",
    headerName: "CHANGE (24HR)",
  },
  {
    ...integerPriceColDef,
    width: 160,
    field: "volumeUsd24Hr",
    colId: "volumeUsd24Hr",
    headerName: "VOLUME (24HR)",
  },
  {
    ...integerPriceColDef,
    width: 180,
    field: "marketCapUsd",
    colId: "marketCapUsd",
    headerName: "MARKET CAP",
  },
  {
    ...quantityColDef,
    width: 180,
    field: "supply",
    colId: "supply",
    headerName: "SUPPLY",
  },
  {
    ...quantityColDef,
    width: 150,
    field: "maxSupply",
    colId: "maxSupply",
    headerName: "MAX SUPPLY",
  },
];
