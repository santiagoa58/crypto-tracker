import React from "react";
import styled from "styled-components/macro";
import { Logo } from "./Logo";

const NavBarWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: solid 1px ${({ theme }) => theme.colors.border};
  padding: 1rem;
`;

const NavButton = styled.button`
  background-color: transparent;
  outline: none;
  border: solid 1px transparent;
  border-radius: 1px;
  padding: 0.3rem 0.75rem;
  color: ${({ theme }) => theme.colors.fontOnBackground};
  opacity: ${({ theme }) => theme.opacityMuted};
  transition: all 100ms;

  &:disabled {
    opacity: ${({ theme }) => theme.opacityDisabled};
  }

  &:enabled:focus,
  &:enabled:hover {
    border-bottom-color: ${({ theme }) => theme.colors.primaryLight};
    opacity: 1;
    cursor: pointer;
  }
`;

const NavBar = styled.nav`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;
      padding: 0;
      margin-right: 1rem;
    }
  }
`;

export const NavigationHeader = () => {
  return (
    <NavBarWrapper>
      <Logo />
      <NavBar>
        <ul>
          <li>
            <NavButton type="button">Overview</NavButton>
          </li>
          <li>
            <NavButton type="button">Price Action</NavButton>
          </li>
        </ul>
      </NavBar>
    </NavBarWrapper>
  );
};
