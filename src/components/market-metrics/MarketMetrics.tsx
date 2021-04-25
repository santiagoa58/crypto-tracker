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

const MarketMetricsWrapper = styled(ContentWrapper)`
  justify-content: space-evenly;
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
    <MarketMetricsWrapper maxColumnSize="25rem" minColumnSize="18rem">
      <MainSubContentWrapper>
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
      </MainSubContentWrapper>
      <MainSubContentWrapper>
        <span className="content__sub">Bitcoin Dominance</span>
        <span className="content__main--large">{bitcoinDominance}</span>
      </MainSubContentWrapper>
    </MarketMetricsWrapper>
  );
};
