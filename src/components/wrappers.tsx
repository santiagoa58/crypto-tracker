import styled from "styled-components/macro";

export const BaseWrapper = styled.div`
  overflow: hidden;

  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};

  //elevation in dark theme
  filter: brightness(1.08);
`;

interface ContentWrapperProps {
  minColumnSize?: string;
  maxColumnSize?: string;
}
export const ContentWrapper = styled.div<ContentWrapperProps>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    ${({ minColumnSize = "20rem", maxColumnSize = "1fr" }) =>
      `minmax(${minColumnSize}, ${maxColumnSize})`}
  );
  place-content: center;
  row-gap: 1rem;
  margin: 1rem 0;
  overflow: hidden;
`;

export const MainSubContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  text-align: center;
  overflow: auto;

  .content__sub,
  .content__main,
  .content__main--large {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content__sub {
    font-size: ${({ theme }) => theme.fontSize.bodyXSmall};
    opacity: ${({ theme }) => theme.opacityMuted};
  }
  .content__main--large {
    font-size: ${({ theme }) => theme.fontSize.h6};
  }
`;
