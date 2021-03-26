import React from "react";
import styled from "styled-components/macro";
import { Logo } from "./Logo";

const NavBarWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const NavBar = styled.nav`
  ul {
    list-style: none;

    li {
      display: inline-block;
      padding: 0.3rem;
      margin-right: 0.3rem;
      border-radius: 0.1rem;
      border: solid 1px black;
    }
  }
`;

export const NavigationHeader = () => {
  return (
    <NavBarWrapper>
      <Logo />
      <NavBar>
        <ul>
          <li>Overview</li>
          <li>Price Action</li>
        </ul>
      </NavBar>
    </NavBarWrapper>
  );
};
