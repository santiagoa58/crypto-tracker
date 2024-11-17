import React, { FC, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { StateFetchStatus } from "../../redux/AppState";
import { CryptoAsset } from "../../services/crypto_assets/AssetsServiceInterface";
import { DEFAULT_CURRENCY } from "../../utils/constants";
import { usePricesFeed } from "../../utils/hooks/useFeedService";
import { PRICE_ACTION_PATH } from "../../utils/routes/paths";
import { GridRowClickedEvent } from "../../utils/types";
import { BaseWrapper } from "../ContentWrappers";
import { Grid } from "../grid/Grid";
import { assetColDefs } from "./cryptoAssetsColDefs";
import { useAssetsService } from "./useAssetsService";

const AssetGridWrapper = styled(BaseWrapper)`
  height: 70vh;
  max-width: 79rem;
  margin: 0 auto;
`;

const ITEMS_PER_PAGE = 25;

const getRowNodeId = (row: CryptoAsset) => row.id;

export const CryptoAssetsGrid: FC = (props) => {
  const history = useHistory();
  const [page] = useState(1);
  const { assets, status, error, getAssets } = useAssetsService();
  usePricesFeed();

  useEffect(() => {
    const fetchAssets = async () => {
      await getAssets({
        per_page: ITEMS_PER_PAGE,
        page,
        vs_currency: DEFAULT_CURRENCY,
      });
    };

    fetchAssets();
  }, [getAssets, page]);

  const rowData = useMemo(() => assets?.valueSeq().toArray(), [assets]);

  return (
    <AssetGridWrapper>
      <Grid
        rowData={rowData}
        columnDefs={assetColDefs}
        getRowId={(params) => getRowNodeId(params.data)}
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
