import React, { FC } from "react";
import { Link, LinkProps, useRouteMatch } from "react-router-dom";
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
    display: inline-flex;
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

const NavItemWrapperNoHover = styled(NavItemWrapper)`
  opacity: 1;
  &:focus,
  &:hover {
    border-bottom-color: transparent;
  }
`;

interface NavLinkProps extends LinkProps {
  to: string;
  exact?: boolean;
  omitActive?: boolean;
}

export const NavLink: FC<NavLinkProps> = ({
  to,
  exact,
  children,
  omitActive,
  ...props
}) => {
  const match = useRouteMatch({
    path: to,
    exact,
  });

  if (omitActive) {
    return (
      <NavItemWrapperNoHover>
        <Link {...props} to={to}>
          {children}
        </Link>
      </NavItemWrapperNoHover>
    );
  }
  const className = match ? "nav-link--active" : undefined;
  return (
    <NavItemWrapper className={className}>
      <Link {...props} to={to}>
        {children}
      </Link>
    </NavItemWrapper>
  );
};
