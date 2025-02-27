// src/slices/Hero/index.tsx

import EncoraLogo from "@/assets/encora-logo.jpg";
import { Contained } from "@/components/Contained";
import { LinkPreview } from "@/components/LinkPreview";
import { Divider, Link } from "@heroui/react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
export default function Hero({ slice }: HeroProps): JSX.Element {
  return (
    <Contained className="relative flex max-w-[900px] flex-grow flex-col items-center justify-center gap-7 py-10 md:flex-row">
      <div>
        <p className="text-xs md:text-medium">{slice.primary.hi_message}</p>
        <h2 className="bg-gradient-to-br from-primary to-foreground-900 bg-clip-text text-4xl font-bold tracking-tighter text-primary text-transparent md:text-7xl">
          Maurício Cantú
        </h2>

        <div className="flex flex-col gap-2">
          <p className="text-lg md:text-xl">{slice.primary.subtitle}</p>
          <Divider className="h-[0.8px] bg-foreground/40" />
          <p className="text-sm lg:text-medium">{slice.primary.subtitle_2}</p>
          <div className="text-sm lg:text-medium">
            <PrismicRichText
              components={{
                hyperlink: ({ node, children }) => {
                  return (
                    <LinkPreview
                      url={node.data.url!}
                      isStatic={true}
                      imageSrc={EncoraLogo.src}
                    >
                      <Link
                        isExternal
                        underline="hover"
                        className="text-sm lg:text-medium"
                        showAnchorIcon
                        href={node.data.url}
                      >
                        {children}
                      </Link>
                    </LinkPreview>
                  );
                },
              }}
              field={slice.primary.current_work}
            ></PrismicRichText>
          </div>

          <div className="relative text-sm lg:text-medium">
            <PrismicRichText
              components={{
                strong: ({ children }) => (
                  <span className="text-primary">{children}</span>
                ),
                paragraph: ({ children }) => (
                  <p className="text-justify">{children}</p>
                ),
              }}
              field={slice.primary.text}
            ></PrismicRichText>
          </div>
        </div>
      </div>
      <PrismicNextImage
        field={slice.primary.image}
        className="h-[240px] w-min md:h-[360px]"
      />
    </Contained>
  );
}
