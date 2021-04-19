import React, { FC, useContext } from "react";
import styled from "styled-components/macro";
import {
  formatPercent,
  formatPrice,
  getColorFromSign,
} from "../../utils/formatters";
import { usePricesFeed } from "../../utils/hooks/useFeedService";
import { ContentWrapper, MainSubContentWrapper } from "../ContentWrappers";
import { CryptoAssetContext } from "../context/CryptoAssetContext";
import { PercentChange } from "./styled";

interface CryptoAssetDetailsProps {
  assetId: string;
}

const Wrapper = styled(ContentWrapper)`
  place-content: unset;

  ${MainSubContentWrapper} {
    text-align: left;
    width: fit-content;
    &.numeric-content {
      text-align: right;
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

export const CryptoAssetDetails: FC<CryptoAssetDetailsProps> = (props) => {
  const [appState] = useContext(CryptoAssetContext);
  usePricesFeed();

  const asset = appState.assets?.list.get(props.assetId);

  return (
    <Wrapper maxColumnSize="15rem" minColumnSize="20rem">
      <AssetNameWrapper>
        <img src={asset?.image} alt={asset?.name} />
        <MainSubContentWrapper>
          <span className="content__main--large content-name">
            {asset?.name}
          </span>
          <span className="content__sub">{asset?.symbol.toUpperCase()}</span>
        </MainSubContentWrapper>
      </AssetNameWrapper>
      <MainSubContentWrapper className="numeric-content">
        <span className="content__main--large">
          {formatPrice(asset?.price)}
        </span>
        <span>
          <PercentChange color={getColorFromSign(asset?.priceChangePercent24h)}>
            {formatPercent(asset?.priceChangePercent24h)}
          </PercentChange>
          <span className="content__sub"> (24h Change)</span>
        </span>
      </MainSubContentWrapper>
    </Wrapper>
  );
};
