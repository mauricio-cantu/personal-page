"use client";

import { FilledLinkToWebField, GroupField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  SettingsDocumentDataNavigationItem,
  Simplify,
} from "../../prismicio-types";

interface NavbarLinksProps {
  navigation: GroupField<Simplify<SettingsDocumentDataNavigationItem>>;
}

export const NavbarLinks = ({ navigation }: NavbarLinksProps) => {
  const currentPath = usePathname();
  const resolvedPath =
    currentPath === "/"
      ? currentPath
      : currentPath.slice(1, currentPath.length);
  return navigation.map((menuItem, index) => {
    const link = menuItem.link as FilledLinkToWebField;

    return (
      <li key={index}>
        <PrismicNextLink
          className={clsx("lowercase transition-colors hover:text-primary", {
            "font-semibold text-primary": resolvedPath === link.url,
          })}
          field={link}
        ></PrismicNextLink>
      </li>
    );
  });
};
