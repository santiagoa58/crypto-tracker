import React, { FC } from "react";
import styled from "styled-components/macro";
import { useAssetsService } from "./hooks/useAssetsService";

const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CryptoAssetsGrid: FC = (props) => {
  const cryptos = useAssetsService();
  return (
    <GridWrapper>
      {cryptos.map((crypto) => (
        <div key={crypto.id}>
          <h3>{crypto.symbol}</h3>
          <p>Name: {crypto.name}</p>
          <p>Rank: {crypto.rank}</p>
          <p>Price: {crypto.priceUsd}</p>
          <p>24hr %Change: {crypto.changePercent24Hr}%</p>
        </div>
      ))}
    </GridWrapper>
  );
};
