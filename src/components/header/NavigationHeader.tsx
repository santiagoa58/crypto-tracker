import React from "react";
import styled from "styled-components/macro";
import { AssetSearch } from "../search/AssetSearch";
import { SearchSelectWrapper } from "../search/SearchSelect";
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
    padding-right: 1rem;
  }
  ${SearchSelectWrapper} {
    margin-left: 3px;
  }

  @media (max-width: ${({ theme }) => theme.screenSizes.mobileL}) {
    .nav_header__logo--link {
      display: none;
    }
    grid-template-columns: repeat(2, 1fr);
  }
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  height: 100%;

  ${NavItemWrapper} {
    &:not(:first-child) {
      margin-left: 1rem;
      @media (max-width: ${({ theme }) => theme.screenSizes.mobileL}) {
        margin-left: 0.5rem;
      }
    }
  }
`;

export const NavigationHeader = () => {
  return (
    <NavBarWrapper>
      <NavLink
        to="/"
        title="Home"
        omitActive={true}
        className="nav_header__logo--link"
      >
        <Logo />
      </NavLink>
      <NavBar>
        <NavLink to="/" exact={true}>
          Overview
        </NavLink>
        <NavLink to="/price-action">Price Action</NavLink>
      </NavBar>
      <AssetSearch />
    </NavBarWrapper>
  );
};
