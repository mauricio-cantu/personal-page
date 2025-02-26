"use client";

import { cn } from "@/lib/utils";
import { Link, LinkProps } from "@heroui/react";
import { asLink, LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";

export interface NavLinkProps {
  linkField: LinkField;
  className?: string;
  linkProps?: LinkProps;
}

export function NavLink({ linkField, className, linkProps }: NavLinkProps) {
  const pathname = usePathname();
  const link = asLink(linkField);
  // @ts-expect-error 'target' prop exists but it's not defined in the lib
  const isExternal = linkField.target === "_blank";

  const isActive = pathname === `/${link}`;

  return (
    <Link
      color={isActive ? "primary" : "foreground"}
      className={cn("lowercase", className)}
      field={linkField}
      isExternal={isExternal}
      showAnchorIcon={isExternal}
      as={PrismicNextLink}
      href={link!}
      {...linkProps}
    >
      {linkField.text}
    </Link>
  );
}
