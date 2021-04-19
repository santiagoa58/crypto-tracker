import React, { FC } from "react";
import styled from "styled-components/macro";

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 10rem;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  display: block;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 0.3rem solid ${({ theme }) => theme.colors.border};
  border-color: ${({ theme }) => theme.colors.primary} transparent
    ${({ theme }) => theme.colors.primary} transparent;
  animation: ring-rotate 1.2s linear infinite;

  @keyframes ring-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingSpinner: FC = (props) => {
  return (
    <SpinnerWrapper>
      <Spinner />
      {props.children}
    </SpinnerWrapper>
  );
};
