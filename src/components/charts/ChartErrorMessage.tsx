import React, { FC } from "react";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  width: 100%;
  margin: 0 auto;
`;

export const ChartErrorMessage: FC = (props) => {
  return <Wrapper>{props.children}</Wrapper>;
};
