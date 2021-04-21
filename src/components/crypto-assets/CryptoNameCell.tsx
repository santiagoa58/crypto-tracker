import { ICellRenderer, ICellRendererParams } from "ag-grid-community";
import { useImperativeHandle, forwardRef } from "react";
import styled from "styled-components/macro";
import { CryptoAsset } from "../../services/crypto_assets/AssetsServiceInterface";

export type CryptoNameValue = Pick<CryptoAsset, "symbol" | "name" | "image">;
interface CryptoNameCellProps extends ICellRendererParams {
  value: CryptoNameValue;
}
const NameCellWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  img {
    height: 1rem;
  }
  .crypto-name--main {
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    padding-left: 0.5rem;
  }
`;

export const CryptoNameCell = forwardRef<ICellRenderer, CryptoNameCellProps>(
  (props, ref) => {
    useImperativeHandle(ref, () => ({
      refresh() {
        return true;
      },
    }));

    return (
      <NameCellWrapper>
        <img src={props.value.image} alt={props.value.name} />
        <span className="crypto-name--main">{props.value.symbol}</span>
      </NameCellWrapper>
    );
  },
);