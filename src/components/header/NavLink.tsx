import React, { FC } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components/macro";

export const NavItemWrapper = styled.div`
  background-color: transparent;
  padding: 0rem 0.5rem;
  color: ${({ theme }) => theme.colors.fontOnBackground};
  opacity: ${({ theme }) => theme.opacityMuted};
  white-space: nowrap;
  transition: all 200ms;
  border-bottom: solid 1px transparent;
  margin-bottom: -1px;

  a {
    height: 100%;
    display: flex;
    align-items: center;
    color: inherit;
    text-decoration: none;
  }

  &.nav-link--active,
  &:focus,
  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.primaryLight};
    opacity: 1;
    cursor: pointer;
  }
`;

interface NavLinkProps {
  to: string;
  exact?: boolean;
}

export const NavLink: FC<NavLinkProps> = (props) => {
  const match = useRouteMatch({
    path: props.to,
    exact: props.exact,
  });
  const className = match ? "nav-link--active" : undefined;

  return (
    <NavItemWrapper className={className}>
      <Link to={props.to}>{props.children}</Link>
    </NavItemWrapper>
  );
};
