import React, { FC } from "react";
import styled from "styled-components/macro";
import { CryptoAsset } from "../../services/crypto_assets/AssetsServiceInterface";
import {
  formatPrice,
  formatQuantity,
  parseDateString,
} from "../../utils/formatters";
import { isDefined } from "../../utils/isDefined";

interface Props {
  asset?: CryptoAsset;
}

const Wrapper = styled.div`
  padding-top: 3rem;
`;

const DetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 1rem;
  column-gap: 6rem;

  @media (max-width: ${({ theme }) => theme.screenSizes.tablet}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;

  .value,
  .label {
    text-transform: capitalize;
  }
  .value {
    font-weight: bold;
    &--small {
      font-size: ${({ theme }) => theme.fontSize.bodyXSmall};
      opacity: ${({ theme }) => theme.opacityMuted};
    }
  }
  .label {
    opacity: ${({ theme }) => theme.opacityMuted};
  }
`;

export const CyrptoAssetFullDetails: FC<Props> = ({ asset, ...props }) => {
  if (!asset) {
    return null;
  }

  return (
    <Wrapper>
      <DetailsWrapper>
        <Row>
          <span className="label">Current Price</span>
          <span className="value">{formatPrice(asset.price, 3)}</span>
        </Row>
        <Row>
          <span className="label">Market Cap</span>
          <span className="value">{formatPrice(asset.marketCap)}</span>
        </Row>
        <Row>
          <span className="label">Market Cap Rank</span>
          <span className="value">{asset.rank}</span>
        </Row>
        <Row>
          <span className="label">Trading Volume</span>
          <span className="value">{formatPrice(asset.totalVolume)}</span>
        </Row>
        <Row>
          <span className="label">24h Low / 24h High</span>
          <span className="value">{`${formatPrice(
            asset.low24h,
            3,
          )} / ${formatPrice(asset.high24h, 3)}`}</span>
        </Row>
        {isDefined(asset.allTimeHigh) && (
          <Row>
            <span className="label">All-Time High</span>
            <span>
              <span className="value">
                {formatPrice(asset.allTimeHigh, 3)}{" "}
              </span>
              <span className="value--small">
                ({parseDateString(asset.allTimeHighDate)})
              </span>
            </span>
          </Row>
        )}
        <Row>
          <span className="label">Fully Diluted Valuation</span>
          <span className="value">
            {formatPrice(asset.fullyDilutedValuation)}
          </span>
        </Row>
        <Row>
          <span className="label">Circulating Supply</span>
          <span className="value">
            {formatQuantity(asset.circulatingSupply)}
          </span>
        </Row>
        <Row>
          <span className="label">Max Supply</span>
          <span className="value">{formatQuantity(asset.maxSupply)}</span>
        </Row>
        <Row>
          <span className="label">Last Updated</span>
          <span className="value">{parseDateString(asset.lastUpdated)}</span>
        </Row>
      </DetailsWrapper>
    </Wrapper>
  );
};
