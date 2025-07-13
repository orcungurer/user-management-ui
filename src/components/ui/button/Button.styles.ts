import styled, { css } from "styled-components";

export const StyledButton = styled.button<{
  $outline?: boolean;
  $isFirst?: boolean;
  $isLast?: boolean;
}>`
  font-size: 0.8rem;
  border-radius: 0.25rem;
  padding: 0.5rem 0.65rem;
  cursor: pointer;
  border: 1px solid;
  transition: all 0.2s ease;

  ${({ $outline }) =>
    $outline
      ? css`
          background-color: transparent;
          color: #333;
          border-color: #333;

          &:hover,
          &:active {
            background-color: #333;
            color: #fff;
          }
        `
      : css`
          background-color: #333;
          color: #fff;
          border-color: #333;

          &:hover,
          &:active {
            background-color: #000;
          }
        `}

  ${({ $isFirst }) =>
    $isFirst &&
    css`
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `}

  ${({ $isLast }) =>
    $isLast &&
    css`
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    `}

  &:disabled {
    color: #333;
    background-color: #d2d2d2;
    border-color: #d2d2d2;
    cursor: default;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 0.5rem;
`;
