import { ReactNode } from "react";
import { Input } from "../ui/input";

export interface SearchFieldProps {
  onChange: (value: string) => void;
  value: string;
}

export const SearchField: (props: SearchFieldProps) => ReactNode = (props) => {
  return (
    <Input
      value={props.value}
      onChange={props.onChange}
      placeholder="City"
      className="mt-0.5 w-full rounded-3xl border-gray-300 shadow-sm sm:text-sm py-2 px-4 bg-white"
    />
  );
};
