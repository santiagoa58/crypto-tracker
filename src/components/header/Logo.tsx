import React from "react";
import styled from "styled-components/macro";
import logo from "../../logo.svg";

const CrytoTrackerLogo = styled.img`
  height: 2rem;
`;

export const Logo = () => {
  return <CrytoTrackerLogo src={logo} alt="logo" />;
};
