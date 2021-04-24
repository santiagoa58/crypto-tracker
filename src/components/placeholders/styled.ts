import styled from "styled-components/macro";

const BasePlaceHolder = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.backgroundLightMuted};
`;
export const PlaceHolder = styled(BasePlaceHolder)<{
  size?: string;
  borderRadius?: string;
}>`
  height: ${({ size = "2rem" }) => size};
  width: ${({ size = "2rem" }) => size};
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius};`}
`;

export interface TextPlaceholderProps {
  width?: string;
  height?: string;
}
export const TextPlaceHolder = styled(BasePlaceHolder)<TextPlaceholderProps>`
  height: ${({ height = "1rem" }) => height};
  width: ${({ width = "5rem" }) => width};
`;
