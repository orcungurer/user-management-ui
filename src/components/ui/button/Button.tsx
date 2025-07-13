import { StyledButton } from "./Button.style";

interface ButtonProps {
  type?: "button" | "submit";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  outline?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  className,
  onClick,
  outline,
  isFirst,
  isLast,
  disabled,
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      className={className}
      $outline={outline}
      $isFirst={isFirst}
      $isLast={isLast}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
