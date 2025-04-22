import { ReactNode } from "react";
import { cn } from "../../utils";

export interface SkeletonProps {
  className?: string;
}
export const Skeleton: (props: SkeletonProps) => ReactNode = (props) => {
  return (
    <div className="animate-pulse flex space-x-4">
      <div
        className={cn("h-2.5 bg-[#95d3e9] rounded-full", props.className)}
      ></div>
    </div>
  );
};
