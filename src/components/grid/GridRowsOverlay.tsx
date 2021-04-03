import React, { FC } from "react";
import styled from "styled-components/macro";
import { INoRowsOverlayParams } from "ag-grid-community";
import { ContentWrapper } from "../wrappers";

interface Props extends INoRowsOverlayParams {
  noRowsMessage: string;
  isError: boolean;
}

const ErrorWrapper = styled(ContentWrapper)`
  padding: 3rem;
  background-color: ${({ theme }) => theme.colors.backgroundLightMuted};
  color: ${({ theme }) => theme.colors.red};
`;

export const NoRowsOverlay: FC<Props> = (props) => {
  const message = <span>{props.noRowsMessage}</span>;
  return props.isError ? <ErrorWrapper>{message}</ErrorWrapper> : message;
};
