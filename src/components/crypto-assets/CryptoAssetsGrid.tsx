import React, { FC, useMemo } from "react";
import styled from "styled-components/macro";
import { CryptoAsset } from "../../services/crypto_assets/AssetsServiceInterface";
import { Grid } from "../grid/Grid";
import { assetColDefs } from "./cryptoAssetsColDefs";
import { useAssetsService } from "./hooks/useAssetsService";

const AssetGridWrapper = styled.div`
  height: 70vh;
  max-width: 79rem;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: ${({ theme }) => theme.boxShadow};

  //elevation in dark theme
  filter: brightness(1.08);
`;

const getRowNodeId = (row: CryptoAsset) => row.id;

export const CryptoAssetsGrid: FC = (props) => {
  const { assets } = useAssetsService();

  const rowData = useMemo(() => assets?.valueSeq().toArray(), [assets]);

  return (
    <AssetGridWrapper>
      <Grid
        rowData={rowData}
        columnDefs={assetColDefs}
        getRowNodeId={getRowNodeId}
      />
      {props.children}
    </AssetGridWrapper>
  );
};
