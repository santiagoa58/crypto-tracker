import React, { FC } from "react";
import styled from "styled-components/macro";
import { Colors } from "../../theme/theme";
import {
  formatPercent,
  formatPrice,
  getColorFromSign,
} from "../../utils/formatters";
import { MainSubContentWrapper, ContentWrapper } from "../wrappers";
import { useMarketMetrics } from "./hooks/useMarketMetrics";

const PercentChange = styled.span<{ color?: Colors }>`
  color: ${({ theme, color }) => color && theme.colors[color]};
  font-size: ${({ theme }) => theme.fontSize.body};
  padding-left: ${({ theme }) => theme.fontSize.bodyXSmall};
  white-space: nowrap;
`;

export const MarketMetrics: FC = (props) => {
  const { marketMetrics } = useMarketMetrics();
  const percentChangeUsd = formatPercent(
    marketMetrics?.marketCapChangePercentage24hUsd,
  );
  const totalMarketCap = formatPrice(marketMetrics?.totalMarketCapUsd);
  const bitcoinDominance = formatPercent(
    marketMetrics?.marketCapPercentage?.["btc"],
  );

  return (
    <ContentWrapper>
      <MainSubContentWrapper>
        <span className="content__sub">Total Market Cap</span>
        <span className="content__main--large">
          {totalMarketCap}
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
    </ContentWrapper>
  );
};
