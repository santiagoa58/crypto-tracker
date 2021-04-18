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

export const assetColDefs: ColumnDefinition[] = [
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
    field: "priceUsd",
    colId: "priceUsd",
    headerName: "PRICE",
  },
  {
    ...percentColDef,
    width: 100,
    field: "changePercent24Hr",
    colId: "changePercent24Hr",
    headerName: "24h %",
  },
  {
    ...integerPriceColDef,
    width: 160,
    field: "volumeUsd24Hr",
    colId: "volumeUsd24Hr",
    headerName: "24h Volume",
  },
  {
    ...integerPriceColDef,
    width: 180,
    field: "marketCapUsd",
    colId: "marketCapUsd",
    headerName: "Market Cap",
    initialSort: "desc",
  },
  {
    ...quantityColDef,
    width: 180,
    field: "supply",
    colId: "supply",
    headerName: "Supply",
  },
  {
    ...quantityColDef,
    width: 150,
    field: "maxSupply",
    colId: "maxSupply",
    headerName: "Max Supply",
  },
];
