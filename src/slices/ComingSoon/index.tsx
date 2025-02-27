import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

/**
 * Props for `ComingSoon`.
 */
export type ComingSoonProps = SliceComponentProps<Content.ComingSoonSlice>;

/**
 * Component for "ComingSoon" Slices.
 */
const ComingSoon: FC<ComingSoonProps> = ({ slice }) => {
  return (
    <div className="grid h-full w-full place-items-center">
      <p className="text-foreground">{slice.primary.coming_soon}</p>
    </div>
  );
};

export default ComingSoon;
