import React from "react";
import styled from "styled-components/macro";
import { Logo, LogoWrapper } from "./Logo";
import { NavItemWrapper, NavLink } from "./NavLink";

const NavBarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;

  padding: 0.5rem 1rem 0rem 1rem;

  border-bottom: solid 1px ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.backgroundDark};

  ${LogoWrapper} {
    margin: 0.5rem 0;
  }
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  height: 100%;

  ${NavItemWrapper} {
    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
`;

export const NavigationHeader = () => {
  return (
    <NavBarWrapper>
      <Logo />
      <NavBar>
        <NavLink to="/" exact={true}>
          Overview
        </NavLink>
        <NavLink to="/price-action">Price Action</NavLink>
      </NavBar>
    </NavBarWrapper>
  );
};
