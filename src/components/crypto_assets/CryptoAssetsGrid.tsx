import React, { FC } from "react";
import styled from "styled-components/macro";
import { CryptoAsset } from "../../services/crypto_assets/AssetsServiceInterface";
import {
  integerPriceColDef,
  percentColDef,
  priceColDef,
  quantityColDef,
  numericColDef,
  stringCompare,
} from "../../utils/columnDefinitions";
import { ColumnDefinition, Grid } from "../grid/Grid";
import { CryptoNameCell, CryptoNameValue } from "./CryptoNameCell";
import { useAssetsService } from "./hooks/useAssetsService";

const assetColDefs: ColumnDefinition[] = [
  {
    ...numericColDef,
    field: "rank",
    colId: "rank",
    headerName: "RANK",
    width: 100,
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
  },
  {
    ...priceColDef,
    field: "priceUsd",
    colId: "priceUsd",
    headerName: "PRICE",
  },
  {
    ...integerPriceColDef,
    field: "marketCapUsd",
    colId: "marketCapUsd",
    headerName: "MARKET CAP",
  },
  {
    ...quantityColDef,
    field: "supply",
    colId: "supply",
    headerName: "SUPPLY",
  },
  {
    ...quantityColDef,
    field: "maxSupply",
    colId: "maxSupply",
    headerName: "MAX SUPPLY",
  },
  {
    ...integerPriceColDef,
    field: "volumeUsd24Hr",
    colId: "volumeUsd24Hr",
    headerName: "VOLUME (24HR)",
  },
  {
    ...percentColDef,
    field: "changePercent24Hr",
    colId: "changePercent24Hr",
    headerName: "CHANGE (24HR)",
  },
];

const AssetGridWrapper = styled.div`
  height: 70vh;
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: ${({ theme }) => theme.boxShadow};

  //elevation in dark theme
  filter: brightness(1.08);
`;

const getRowNodeId = (row: CryptoAsset) => row.id;
export const CryptoAssetsGrid: FC = (props) => {
  const cryptos = useAssetsService();
  return (
    <AssetGridWrapper>
      <Grid
        rowData={cryptos}
        columnDefs={assetColDefs}
        getRowNodeId={getRowNodeId}
      />
      {props.children}
    </AssetGridWrapper>
  );
};
