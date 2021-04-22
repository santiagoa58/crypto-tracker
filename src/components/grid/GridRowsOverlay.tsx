import React, { FC } from "react";
import styled from "styled-components/macro";
import { INoRowsOverlayParams } from "ag-grid-community";
import { LoadingSpinner } from "../LoadingSpinner";

interface Props extends INoRowsOverlayParams {
  noRowsMessage: string;
  isLoading: boolean;
}

const MessageWrapper = styled.span`
  font-weight: bold;
`;

export const NoRowsOverlay: FC<Props> = (props) => {
  return props.isLoading ? (
    <LoadingSpinner />
  ) : (
    <MessageWrapper>{props.noRowsMessage}</MessageWrapper>
  );
};
