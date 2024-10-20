import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
interface ContainedProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}

export async function Contained({
  children,
  className,
  as: Component = "div",
}: ContainedProps) {
  return (
    <Component className={twMerge("container mx-auto px-3 lg:px-6", className)}>
      {children}
    </Component>
  );
}
