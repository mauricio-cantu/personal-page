// src/slices/Text/index.tsx
import * as prismic from "@prismicio/client";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Text`.
 */
export type TextProps = SliceComponentProps<Content.TextSlice>;

/**
 * Component for "Text" Slices.
 */
export default function Text({ slice }: TextProps): JSX.Element {
  return (
    <section className="bg-red-500 px-6 py-28 md:px-10">
      {prismic.isFilled.richText(slice.primary.text) && (
        <div className="mx-auto grid w-full max-w-prose gap-6">
          <PrismicRichText
            field={slice.primary.text}
            components={{
              heading3: ({ children }) => (
                <h3 className="text-sm font-semibold uppercase tracking-widest">
                  {children}
                </h3>
              ),
              heading1: ({ children }) => (
                <h1 className="text-4xl font-semibold">{children}</h1>
              ),
              preformatted: ({ children }) => (
                <div className="mb-7 flex items-start justify-between gap-2 rounded bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg">
                  <code>{children}</code>
                  <button>Copy</button>
                </div>
              ),
            }}
          />
        </div>
      )}
    </section>
  );
}
