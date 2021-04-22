import React, { FC, useContext } from "react";
import styled from "styled-components/macro";
import { theme } from "../../theme/theme";
import {
  formatPercent,
  formatPrice,
  getColorFromSign,
} from "../../utils/formatters";
import { usePricesFeed } from "../../utils/hooks/useFeedService";
import { ContentWrapper, MainSubContentWrapper } from "../ContentWrappers";
import { CryptoAssetContext } from "../context/CryptoAssetContext";
import { PercentChange, PlaceHolder, TextPlaceHolder } from "./styled";

interface CryptoAssetInfoProps {
  assetId: string;
}

const Wrapper = styled(ContentWrapper)`
  place-content: unset;

  ${MainSubContentWrapper} {
    text-align: left;

    &.numeric-content {
      text-align: left;
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
  const [appState] = useContext(CryptoAssetContext);
  usePricesFeed();

  const asset = appState.assets?.list.get(props.assetId);

  return (
    <Wrapper maxColumnSize="15rem" minColumnSize="20rem">
      <AssetNameWrapper>
        {asset ? (
          <img src={asset.image} alt={asset.name} />
        ) : (
          <PlaceHolder size={theme.fontSize.h4} borderRadius="50%" />
        )}
        <MainSubContentWrapper className="content--asset-name">
          {asset ? (
            <>
              <span className="content__main--large content-name">
                {asset.name}
              </span>
              <span className="content__sub">{asset.symbol.toUpperCase()}</span>
            </>
          ) : (
            <>
              <TextPlaceHolder />
              <TextPlaceHolder height="0.75rem" width="2rem" />
            </>
          )}
        </MainSubContentWrapper>
      </AssetNameWrapper>
      <MainSubContentWrapper className="numeric-content">
        <span className="content__main--large">
          {formatPrice(asset?.price, 3)}
        </span>
        <span>
          <PercentChange color={getColorFromSign(asset?.priceChangePercent24h)}>
            {formatPercent(asset?.priceChangePercent24h)}
          </PercentChange>
          <span className="content__sub"> (24h)</span>
        </span>
      </MainSubContentWrapper>
    </Wrapper>
  );
};
