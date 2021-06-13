import React, { FC } from "react";
import styled from "styled-components/macro";
import { theme } from "../../theme/theme";
import {
  formatPercent,
  formatPrice,
  getColorFromSign,
} from "../../utils/formatters";
import { usePricesFeed } from "../../utils/hooks/useFeedService";
import { PlaceHolder } from "../placeholders/styled";
import { ContentWrapper, MainSubContentWrapper } from "../ContentWrappers";
import { PercentChange } from "./styled";
import { MainSubContentPlaceholder } from "../placeholders/PlaceholderWrappers";
import { useAppSelector } from "../../redux/useAppSelector";
import { StateFetchStatus } from "../../redux/AppState";

interface CryptoAssetInfoProps {
  assetId: string;
}

const Wrapper = styled(ContentWrapper)`
  place-content: unset;

  ${MainSubContentWrapper} {
    text-align: left;

    &.numeric-content {
      text-align: right;
    }
  }

  .content {
    &--asset-name {
      padding-right: 3rem;
    }
  }
`;

const AssetNameWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    height: ${({ theme }) => theme.fontSize.h4};
    width: ${({ theme }) => theme.fontSize.h4};
  }
`;

export const CryptoAssetInfo: FC<CryptoAssetInfoProps> = (props) => {
  const assets = useAppSelector((state) => state.assets?.list);
  const assetsStatus = useAppSelector((state) => state.assets?.status);
  usePricesFeed();

  const asset = assets?.get(props.assetId);
  const loading = assetsStatus === StateFetchStatus.Busy;

  return (
    <Wrapper maxColumnSize="15rem" minColumnSize="20rem">
      <AssetNameWrapper>
        {asset ? (
          <img src={asset.image} alt={asset.name} />
        ) : (
          <PlaceHolder size={theme.fontSize.h4} borderRadius="50%" />
        )}
        <MainSubContentPlaceholder
          className="content--asset-name"
          showContent={!loading}
        >
          <span className="content__main--large content-name">
            {asset?.name}
          </span>
          <span className="content__sub">{asset?.symbol.toUpperCase()}</span>
        </MainSubContentPlaceholder>
      </AssetNameWrapper>
      <MainSubContentPlaceholder
        className="numeric-content"
        showContent={!loading}
      >
        <span className="content__main--large">
          {formatPrice(asset?.price)}
        </span>
        <span>
          <PercentChange color={getColorFromSign(asset?.priceChangePercent24h)}>
            {formatPercent(asset?.priceChangePercent24h)}
          </PercentChange>
          <span className="content__sub"> (24h)</span>
        </span>
      </MainSubContentPlaceholder>
    </Wrapper>
  );
};
