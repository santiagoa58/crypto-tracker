import React from "react";
import styled from "styled-components/macro";
import logo from "../../logo.svg";

export const LogoWrapper = styled.img`
  height: 2rem;
`;

interface Props {
  onClick?: VoidFunction;
}
export const Logo = (props: Props) => {
  return <LogoWrapper src={logo} alt="logo" onClick={props.onClick} />;
};
