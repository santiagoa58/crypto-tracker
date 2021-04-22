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
  display: flex;
  flex-wrap: wrap;
  place-content: center;
  row-gap: 1rem;
  margin: 1rem 0;
  overflow: hidden;
`;

export const MainSubContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0.5rem;
  overflow: auto;
  text-align: center;

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
