import React, { ReactNode, useMemo, useRef, useState } from "react";
import styled from "styled-components/macro";
import { getSafeIndex } from "../../utils/safeGetters";

export interface SearchOption<TValue, TMeta = any> {
  value: TValue;
  label: ReactNode;
  meta?: TMeta;
}

interface Props<TValue, TMeta> {
  options: SearchOption<TValue, TMeta>[];
  onOptionSelect(value: TValue): void;
  filterOptions(
    option: SearchOption<TValue, TMeta>,
    searchText: string,
  ): boolean;
}

const Option = styled.li<{ isSelected?: boolean }>`
  padding: 0.4rem 0.5rem;
  :hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  ${({ isSelected, theme }) =>
    isSelected && `background-color: ${theme.colors.secondaryLight};`}
  overflow: auto;
`;

const OptionsWrapper = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  list-style: none;
  opacity: 1;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  border: solid 1px transparent;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 0;
  margin: 0;
  top: 100%;
  margin-top: 0.25rem;
  z-index: 20;
  overflow: hidden;
`;

export const SearchSelectWrapper = styled.div`
  display: flex;
  max-width: 20rem;
  min-width: 6rem;
  position: relative;
  color: ${({ theme }) => theme.colors.fontOnBackground};

  input {
    border: solid 1px transparent;
    background-color: ${({ theme }) => theme.colors.backgroundMuted};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 0.5rem;
    width: 100%;
    color: ${({ theme }) => theme.colors.fontOnBackgroundLight};

    &:focus {
      border-color: ${({ theme }) => theme.colors.focus};
      outline: none;
    }
  }
`;

const MAX_RESULTS = 5;

export const SearchSelect = <TValue, TMeta = any>({
  options,
  filterOptions,
  ...props
}: Props<TValue, TMeta>) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const filteredOptions = useMemo(
    () =>
      options
        .filter((option) => filterOptions(option, searchValue))
        .slice(0, MAX_RESULTS),
    [options, filterOptions, searchValue],
  );

  const SearchInputRef = useRef<HTMLInputElement | null>(null);

  const selectOption = (value: TValue) => {
    props.onOptionSelect(value);
    setSearchValue("");
    SearchInputRef.current?.blur();
  };

  return (
    <SearchSelectWrapper
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.stopPropagation();
          event.preventDefault();
          const option = filteredOptions[
            getSafeIndex(selectedIndex, filteredOptions.length)
          ] as SearchOption<TValue> | undefined;
          if (option) {
            return selectOption(option.value);
          }
        }
        if (event.key === "ArrowDown") {
          event.stopPropagation();
          event.preventDefault();
          setSelectedIndex((prevIndex) =>
            getSafeIndex(++prevIndex, filteredOptions.length),
          );
        }
        if (event.key === "ArrowUp") {
          event.stopPropagation();
          event.preventDefault();
          setSelectedIndex((prevIndex) =>
            getSafeIndex(--prevIndex, filteredOptions.length),
          );
        }
      }}
    >
      <input
        type="text"
        ref={SearchInputRef}
        placeholder="Search"
        onFocus={() => {
          if (searchValue.length >= 2) {
            setShowResult(true);
          }
        }}
        onBlur={(event) => {
          setShowResult(false);
          setSelectedIndex(0);
        }}
        value={searchValue}
        onChange={(event) => {
          const newValue = event.target.value;
          setShowResult(newValue.length >= 2);
          setSearchValue(newValue);
        }}
      />
      {showResult && (
        <OptionsWrapper>
          {filteredOptions.length ? (
            filteredOptions.map((option, index) => (
              <Option
                key={String(option.value)}
                onMouseDown={(event) => {
                  //prevent parent's onBlur from occurring before the option's onClick
                  event.preventDefault();
                }}
                onClick={() => selectOption(option.value)}
                isSelected={index === selectedIndex}
              >
                {option.label}
              </Option>
            ))
          ) : (
            <Option>No Results</Option>
          )}
        </OptionsWrapper>
      )}
    </SearchSelectWrapper>
  );
};
