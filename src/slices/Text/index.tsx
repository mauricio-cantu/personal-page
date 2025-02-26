// src/slices/Text/index.tsx
import { PrismicRichTextWrapper } from "@/components/PrismicRichTextWrapper";
import * as prismic from "@prismicio/client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Text`.
 */
export type TextProps = SliceComponentProps<Content.TextSlice>;

/**
 * Component for "Text" Slices.
 */
export default function Text({ slice }: TextProps): JSX.Element {
  return (
    <>
      {prismic.isFilled.richText(slice.primary.content) && (
        <div className="font-serif leading-relaxed md:text-xl md:leading-relaxed">
          <PrismicRichTextWrapper field={slice.primary.content} />
        </div>
      )}
    </>
  );
}
