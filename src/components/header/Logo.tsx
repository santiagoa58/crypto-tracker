import React from "react";
import styled from "styled-components/macro";
import logo from "../../logo.svg";

export const LogoWrapper = styled.img`
  height: 2rem;
`;

export const Logo = () => {
  return <LogoWrapper src={logo} alt="logo" />;
};
