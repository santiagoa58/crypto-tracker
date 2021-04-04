import React, { FC, useMemo } from "react";
import styled from "styled-components/macro";
import { CryptoAsset } from "../../services/crypto_assets/AssetsServiceInterface";
import { usePricesFeed } from "../../utils/hooks/useFeedService";
import { StateFetchStatus } from "../context/AppState";
import { Grid } from "../grid/Grid";
import { BaseWrapper } from "../wrappers";
import { assetColDefs } from "./cryptoAssetsColDefs";
import { useAssetsService } from "./hooks/useAssetsService";

const AssetGridWrapper = styled(BaseWrapper)`
  height: 70vh;
  max-width: 79rem;
  margin: 0 auto;
`;

const getRowNodeId = (row: CryptoAsset) => row.id;

export const CryptoAssetsGrid: FC = (props) => {
  usePricesFeed();
  const { assets, status, error } = useAssetsService();

  const rowData = useMemo(() => assets?.valueSeq().toArray(), [assets]);

  return (
    <AssetGridWrapper>
      <Grid
        rowData={rowData}
        columnDefs={assetColDefs}
        getRowNodeId={getRowNodeId}
        error={error}
        loading={status === StateFetchStatus.Busy}
      />
      {props.children}
    </AssetGridWrapper>
  );
};
