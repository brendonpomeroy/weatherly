import { ReactNode } from "react";
import { cn } from "../../utils";

export interface InputProps {
  placeholder?: string;
  value: string;
  onEnter?: () => void;
  onChange: (value: string) => void;
  className?: string;
}

export const Input: (props: InputProps) => ReactNode = (props) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && props.onEnter) {
      props.onEnter();
    }
  };

  return (
    <input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      className={cn(
        "mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm",
        props.className,
      )}
    />
  );
};
