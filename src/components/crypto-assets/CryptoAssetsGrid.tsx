import React, { FC, useMemo } from "react";
import styled from "styled-components/macro";
import { CryptoAsset } from "../../services/crypto_assets/AssetsServiceInterface";
import { StateFetchStatus } from "../context/AppState";
import { Grid } from "../grid/Grid";
import { NoRowsOverlay } from "../grid/GridRowsOverlay";
import { ContentWrapper } from "../wrappers";
import { assetColDefs } from "./cryptoAssetsColDefs";
import { useAssetsService } from "./hooks/useAssetsService";

const AssetGridWrapper = styled(ContentWrapper)`
  height: 70vh;
  max-width: 79rem;
  margin: 0 auto;
`;

const getRowNodeId = (row: CryptoAsset) => row.id;

export const CryptoAssetsGrid: FC = (props) => {
  const { assets, status, error } = useAssetsService();

  const rowData = useMemo(
    () =>
      status === StateFetchStatus.Busy
        ? undefined
        : assets?.valueSeq().toArray(),
    [assets, status],
  );

  return (
    <AssetGridWrapper>
      <Grid
        rowData={rowData}
        columnDefs={assetColDefs}
        getRowNodeId={getRowNodeId}
        noRowsOverlayComponentFramework={NoRowsOverlay}
        noRowsOverlayComponentParams={{
          noRowsMessage: error ?? "No Rows To Show",
          isError: Boolean(error),
        }}
      />
      {props.children}
    </AssetGridWrapper>
  );
};
