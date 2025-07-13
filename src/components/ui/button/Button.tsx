import styled, { css } from "styled-components";

interface ButtonProps {
  type?: "button" | "submit";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  outline?: boolean;
  disabled?: boolean;
}

const StyledButton = styled.button<{ $outline?: boolean }>`
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

  &:disabled {
    color: #333;
    background-color: #d2d2d2;
    border-color: #d2d2d2;
    cursor: default;
  }
`;

const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  className,
  onClick,
  outline,
  disabled,
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      className={className}
      $outline={outline}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
