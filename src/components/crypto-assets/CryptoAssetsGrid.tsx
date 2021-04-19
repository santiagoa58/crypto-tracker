import React, { FC, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { CryptoAsset } from "../../services/crypto_assets/AssetsServiceInterface";
import { DEFAULT_CURRENCY } from "../../utils/constants";
import { usePricesFeed } from "../../utils/hooks/useFeedService";
import { PRICE_ACTION_PATH } from "../../utils/routes/paths";
import { GridRowClickedEvent } from "../../utils/types";
import { StateFetchStatus } from "../context/AppState";
import { Grid } from "../grid/Grid";
import { BaseWrapper } from "../ContentWrappers";
import { assetColDefs } from "./cryptoAssetsColDefs";
import { useAssetsService } from "./useAssetsService";

const AssetGridWrapper = styled(BaseWrapper)`
  height: 70vh;
  max-width: 79rem;
  margin: 0 auto;
`;

const getRowNodeId = (row: CryptoAsset) => row.id;

export const CryptoAssetsGrid: FC = (props) => {
  const history = useHistory();
  const { assets, status, error, getAssets } = useAssetsService();
  usePricesFeed();

  useEffect(() => {
    getAssets({ per_page: 300, page: 1, vs_currency: DEFAULT_CURRENCY });
  }, [getAssets]);

  const rowData = useMemo(() => assets?.valueSeq().toArray(), [assets]);

  return (
    <AssetGridWrapper>
      <Grid
        rowData={rowData}
        columnDefs={assetColDefs}
        getRowNodeId={getRowNodeId}
        error={error}
        loading={status === StateFetchStatus.Busy}
        onRowClicked={(event: GridRowClickedEvent<CryptoAsset>) => {
          history.push(`${PRICE_ACTION_PATH}${event.data.id}`);
        }}
      />
      {props.children}
    </AssetGridWrapper>
  );
};
