import React, { FC } from "react";
import { MainSubContentWrapper } from "../ContentWrappers";
import { TextPlaceHolder, TextPlaceholderProps } from "./styled";

interface MainSubPlaceholderProps {
  className?: string;
  showContent: boolean;
}
export const MainSubContentPlaceholder: FC<MainSubPlaceholderProps> = (
  props,
) => {
  return (
    <MainSubContentWrapper className={props.className}>
      {props.showContent ? (
        props.children
      ) : (
        <>
          <TextPlaceHolder />
          <TextPlaceHolder height="0.75rem" width="2rem" />
        </>
      )}
    </MainSubContentWrapper>
  );
};

interface PlaceholderProps extends TextPlaceholderProps {
  count?: number;
  showContent: boolean;
}
export const ContentPlaceholder: FC<PlaceholderProps> = ({
  children,
  count = 1,
  showContent,
  ...props
}) => {
  const placeholders = new Array(count).fill({});
  return (
    <>
      {showContent
        ? children
        : placeholders.map((_, index) => (
            <TextPlaceHolder {...props} key={index} />
          ))}
    </>
  );
};
