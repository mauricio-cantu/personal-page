"use client";

import { cn } from "@/lib/utils";
import { Link, NavbarItem } from "@nextui-org/react";
import { asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";
import {
  SettingsDocumentDataNavigationItem,
  Simplify,
} from "../../prismicio-types";

export interface ClientNavItemProps {
  navItem: Simplify<SettingsDocumentDataNavigationItem>;
}

export function ClientNavItem({ navItem }: ClientNavItemProps) {
  const pathname = usePathname();
  const link = asLink(navItem.link);
  const isActive = pathname === `/${link}`;

  return (
    <NavbarItem isActive={isActive}>
      <Link
        color={isActive ? "primary" : "foreground"}
        className={cn("lowercase", { "": isActive })}
        field={navItem.link}
        as={PrismicNextLink}
        href={link!}
      >
        {navItem.link.text}
      </Link>
    </NavbarItem>
  );
}
