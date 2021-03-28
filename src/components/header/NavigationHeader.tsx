import React from "react";
import styled from "styled-components/macro";
import { Logo, LogoWrapper } from "./Logo";

const NavBarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;

  padding: 1rem;
  padding-bottom: 0rem;

  border-bottom: solid 1px ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.backgroundDark};

  ${LogoWrapper} {
    margin-bottom: 0.75rem;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  padding: 0.3rem 0.75rem;
  color: ${({ theme }) => theme.colors.fontOnBackground};
  opacity: ${({ theme }) => theme.opacityMuted};
  white-space: nowrap;
  transition: all 200ms;

  &:disabled {
    opacity: ${({ theme }) => theme.opacityDisabled};
  }

  &:enabled:focus,
  &:enabled:hover {
    opacity: 1;
    border-bottom: solid 1px ${({ theme }) => theme.colors.primaryLight};
    cursor: pointer;
  }
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  height: 100%;

  ${NavButton} {
    padding-bottom: 0.75rem;
    &:not(:first-child) {
      margin-left: 0.75rem;
    }
  }
`;

export const NavigationHeader = () => {
  return (
    <NavBarWrapper>
      <Logo />
      <NavBar>
        <NavButton type="button">Overview</NavButton>
        <NavButton type="button">Price Action</NavButton>
      </NavBar>
    </NavBarWrapper>
  );
};
