import { asLink, LinkField, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import { Link } from "@heroui/react";
import React, { ReactNode } from "react";
import { LinkPreview } from "./LinkPreview";

const textFieldComponents = {
  heading1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="mb-7 text-2xl">{children}</h1>
  ),
  heading2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="mb-7 text-xl">{children}</h2>
  ),
  heading3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="mb-7 text-lg">{children}</h3>
  ),
  paragraph: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-7">{children}</p>
  ),
  oList: ({ children }: { children: React.ReactNode }) => (
    <ol className="mb-7 pl-4 md:pl-6">{children}</ol>
  ),
  oListItem: ({ children }: { children: React.ReactNode }) => (
    <li className="mb-1 list-decimal pl-1 md:pl-2">{children}</li>
  ),
  list: ({ children }: { children: React.ReactNode }) => (
    <ul className="mb-7 pl-4 md:pl-6">{children}</ul>
  ),
  listItem: ({ children }: { children: React.ReactNode }) => (
    <li className="mb-1 list-disc pl-1 md:pl-2">{children}</li>
  ),
  preformatted: ({ children }: { children: React.ReactNode }) => (
    <code className="mb-7 block rounded bg-slate-200 p-4 text-sm text-zinc-950 md:p-6 md:text-lg">
      {children}
    </code>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  hyperlink: ({
    children,
    node,
  }: {
    children: ReactNode;
    node: { data: LinkField };
  }) => {
    const href = asLink(node.data);
    const isExternal =
      node.data.link_type === "Web" && node.data.target === "_blank";
    return (
      <LinkPreview url={href!}>
        <Link
          isExternal={isExternal}
          underline="always"
          className="text-[length:inherit] text-foreground"
          showAnchorIcon={isExternal}
          href={href!}
        >
          {children}
        </Link>
      </LinkPreview>
    );
  },
};

export function PrismicRichTextWrapper({
  field,
}: {
  field: RichTextField | null | undefined;
}) {
  return <PrismicRichText components={textFieldComponents} field={field} />;
}
