import Button from "../button/Button";

interface ToggleGroupProps<T extends string> {
  options: T[];
  value: T;
  onClick: (value: T) => void;
}

const ToggleGroup = <T extends string>({
  options,
  value,
  onClick,
}: ToggleGroupProps<T>) => {
  return (
    <div>
      {options.map((option, index) => (
        <Button
          key={option}
          outline={value !== option}
          onClick={() => onClick(option)}
          isFirst={index === 0}
          isLast={index === options.length - 1}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </Button>
      ))}
    </div>
  );
};

export default ToggleGroup;
