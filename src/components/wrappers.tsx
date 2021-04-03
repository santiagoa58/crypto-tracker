import styled from "styled-components/macro";

export const ContentWrapper = styled.div`
  overflow: hidden;

  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};

  //elevation in dark theme
  filter: brightness(1.08);
`;
