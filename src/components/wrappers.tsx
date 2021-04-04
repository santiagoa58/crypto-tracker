import styled from "styled-components/macro";

export const BaseWrapper = styled.div`
  overflow: hidden;

  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};

  //elevation in dark theme
  filter: brightness(1.08);
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: fit-content;
  padding: 1rem;
  max-width: 100%;
`;

export const MainSubContentWrapper = styled(BaseWrapper)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  padding: 0.5rem 0.75rem;
  margin: 0.5rem;
  word-break: break-word;
  text-align: center;

  .content__sub,
  .content__main {
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
