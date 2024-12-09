"use client";

import { cn } from "@/lib/utils";
import { Link, LinkProps } from "@nextui-org/react";
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
  const isActive = pathname === `/${link}`;
  return (
    <Link
      color={isActive ? "primary" : "foreground"}
      className={cn("lowercase", className)}
      field={linkField}
      as={PrismicNextLink}
      href={link!}
      {...linkProps}
    >
      {linkField.text}
    </Link>
  );
}
