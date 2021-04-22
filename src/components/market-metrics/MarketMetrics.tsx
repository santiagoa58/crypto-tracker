import React, { FC } from "react";
import {
  formatPercent,
  formatPrice,
  getColorFromSign,
} from "../../utils/formatters";
import { MainSubContentWrapper, ContentWrapper } from "../ContentWrappers";
import { PercentChange } from "../crypto-assets/styled";
import { useMarketMetrics } from "./useMarketMetrics";
import styled from "styled-components/macro";

const MarketCapWrapper = styled(MainSubContentWrapper)`
  padding-right: 3rem;
`;

export const MarketMetrics: FC = () => {
  const { marketMetrics } = useMarketMetrics();
  const percentChangeUsd = formatPercent(
    marketMetrics?.marketCapChangePercentage24hUsd,
  );
  const totalMarketCap = formatPrice(marketMetrics?.totalMarketCapUsd);
  const bitcoinDominance = formatPercent(
    marketMetrics?.marketCapPercentage?.["btc"],
  );

  return (
    <ContentWrapper maxColumnSize="25rem" minColumnSize="18rem">
      <MarketCapWrapper>
        <span className="content__sub">Total Market Cap</span>
        <span className="content__main--large">
          {totalMarketCap}
          <wbr />
          <PercentChange
            color={getColorFromSign(
              marketMetrics?.marketCapChangePercentage24hUsd,
            )}
          >
            {percentChangeUsd}
          </PercentChange>
        </span>
      </MarketCapWrapper>
      <MainSubContentWrapper>
        <span className="content__sub">Bitcoin Dominance</span>
        <span className="content__main--large">{bitcoinDominance}</span>
      </MainSubContentWrapper>
    </ContentWrapper>
  );
};
