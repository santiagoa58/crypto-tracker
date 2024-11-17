import React from "react";
import styled from "styled-components/macro";
import LogoSVG from "../../LogoSVG";

export const LogoWrapper = styled.div`
  height: 2rem;
`;

interface Props {
  onClick?: VoidFunction;
}
export const Logo = (props: Props) => {
  return (
    <LogoWrapper onClick={props.onClick}>
      <LogoSVG />
    </LogoWrapper>
  );
};
