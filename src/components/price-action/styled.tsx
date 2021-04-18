import styled from "styled-components/macro";

export const PriceActionWrapper = styled.div`
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
`;

export const TimeRangeSelectionWrapper = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: solid 1px ${({ theme }) => theme.colors.border};
`;

export const TimeRangeSelectionItem = styled.li`
  text-align: center;
  width: 4rem;
  padding-bottom: 1.5rem;
  transition: all 200ms;
  margin: 0 0.5rem;
  margin-bottom: -1px;
  border-bottom: solid 1px transparent;
  opacity: ${({ theme }) => theme.opacityMuted};

  &.selected,
  &:hover {
    opacity: 1;
    border-bottom-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    cursor: default;
  }
`;
