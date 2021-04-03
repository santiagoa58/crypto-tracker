import { ICellRendererParams } from "ag-grid-community";
import { FC } from "react";
import styled from "styled-components/macro";
import { CryptoAsset } from "../../services/crypto_assets/AssetsServiceInterface";

export type CryptoNameValue = Pick<CryptoAsset, "symbol" | "name">;
interface CryptoNameCellProps extends ICellRendererParams {
  value: CryptoNameValue;
}
const NameCellWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;

  .cf {
    font-size: ${({ theme }) => theme.fontSize.h6};
  }

  .crypto-name {
    &__wrapper {
      display: flex;
      flex-direction: column;
      line-height: 1.5;
      padding-left: 0.6rem;
      overflow: hidden;
    }
    &--sub,
    &--main {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &--sub {
      font-size: ${({ theme }) => theme.fontSize.bodyXSmall};
      opacity: ${({ theme }) => theme.opacityMuted};
    }
  }
`;

export const CryptoNameCell: FC<CryptoNameCellProps> = (props) => {
  return (
    <NameCellWrapper>
      <i className={`cf cf-${props.value.symbol.toLowerCase()}`}></i>
      <div className="crypto-name__wrapper">
        <span className="crypto-name--main">{props.value.symbol}</span>
        <span className="crypto-name--sub">{props.value.name}</span>
      </div>
    </NameCellWrapper>
  );
};