import React, { FC, useEffect } from "react";
import {
  DATETIME_FORMAT,
  formatPrice,
  formatQuantity,
  parseDateString,
} from "../../utils/formatters";
import { isDefined } from "../../utils/isDefined";
import { ContentPlaceholder } from "../placeholders/PlaceholderWrappers";
import { DetailsWrapper, DetailsRow } from "./styled";
import { useAssetDetailsService } from "./useAssetsService";

interface Props {
  assetId: string;
}

export const CyrptoAssetFullDetails: FC<Props> = (props) => {
  const { getAsset, asset, error } = useAssetDetailsService(props.assetId);

  useEffect(() => {
    getAsset();
  }, [getAsset]);

  return (
    <DetailsWrapper>
      <ContentPlaceholder
        count={4}
        showContent={isDefined(asset) || Boolean(error)}
        width="8rem"
      >
        <DetailsRow>
          <span className="label">Current Price</span>
          <span className="value">{formatPrice(asset?.price)}</span>
        </DetailsRow>
        <DetailsRow>
          <span className="label">Market Cap</span>
          <span className="value">{formatPrice(asset?.marketCap)}</span>
        </DetailsRow>
        <DetailsRow>
          <span className="label">Market Cap Rank</span>
          <span className="value">{asset?.rank}</span>
        </DetailsRow>
        <DetailsRow>
          <span className="label">Trading Volume</span>
          <span className="value">{formatPrice(asset?.totalVolume)}</span>
        </DetailsRow>
        <DetailsRow>
          <span className="label">24h Low / 24h High</span>
          <span className="value">{`${formatPrice(
            asset?.low24h,
            3,
          )} / ${formatPrice(asset?.high24h)}`}</span>
        </DetailsRow>
        <DetailsRow>
          <span className="label">All-Time High</span>
          <span>
            <span className="value">{formatPrice(asset?.allTimeHigh)} </span>
            <span className="value--small">
              {asset?.allTimeHighDate
                ? `(${parseDateString(asset?.allTimeHighDate)})`
                : "--"}
            </span>
          </span>
        </DetailsRow>
        <DetailsRow>
          <span className="label">Fully Diluted Valuation</span>
          <span className="value">
            {formatPrice(asset?.fullyDilutedValuation)}
          </span>
        </DetailsRow>
        <DetailsRow>
          <span className="label">Circulating Supply</span>
          <span className="value">
            {formatQuantity(asset?.circulatingSupply)}
          </span>
        </DetailsRow>
        <DetailsRow>
          <span className="label">Max Supply</span>
          <span className="value">{formatQuantity(asset?.maxSupply)}</span>
        </DetailsRow>
        <DetailsRow>
          <span className="label">
            {error ? "Failed To Update" : "Last Updated"}
          </span>
          <span className="value">
            {error ?? parseDateString(asset?.lastUpdated, DATETIME_FORMAT)}
          </span>
        </DetailsRow>
      </ContentPlaceholder>
    </DetailsWrapper>
  );
};
