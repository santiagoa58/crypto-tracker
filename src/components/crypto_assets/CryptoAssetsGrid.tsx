import React, { FC } from "react";
import styled from "styled-components/macro";
import { CryptoAsset } from "../../services/crypto_assets/AssetsServiceInterface";
import { percentColDef, priceColDef } from "../../utils/columnDefinitions";
import { ColumnDefinition, Grid } from "../Grid";
import { CryptoNameCell, CryptoNameValue } from "./CryptoNameCell";
import { useAssetsService } from "./hooks/useAssetsService";

const assetColDefs: ColumnDefinition[] = [
  {
    field: "rank",
    colId: "rank",
    headerName: "RANK",
  },
  {
    field: "name",
    colId: "name",
    headerName: "ASSET NAME",
    valueGetter: ({ data }: { data: CryptoAsset }): CryptoNameValue => ({
      symbol: data.symbol,
      name: data.name,
    }),
    cellRendererFramework: CryptoNameCell,
  },
  {
    ...priceColDef,
    field: "priceUsd",
    colId: "priceUsd",
    headerName: "PRICE",
  },
  {
    ...priceColDef,
    field: "marketCapUsd",
    colId: "marketCapUsd",
    headerName: "MARKET CAP",
  },
  {
    ...priceColDef,
    field: "supply",
    colId: "supply",
    headerName: "SUPPLY",
  },
  {
    ...priceColDef,
    field: "maxSupply",
    colId: "maxSupply",
    headerName: "MAX SUPPLY",
  },
  {
    ...priceColDef,
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

const AssetGridWrapper = styled.div<{ height?: string }>`
  height: ${({ height = "80vh" }) => height};
`;

interface CryptoAssetGridProps {
  height?: string;
}
export const CryptoAssetsGrid: FC<CryptoAssetGridProps> = (props) => {
  const cryptos = useAssetsService();
  return (
    <AssetGridWrapper height={props.height}>
      <Grid data={cryptos} columns={assetColDefs} />
    </AssetGridWrapper>
  );
};