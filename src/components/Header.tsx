"use client";
import { SocialIconsMap } from "@/lib/social-icons-map";
import {
  Button,
  Divider,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  SettingsDocument,
  SocialLinksDocument,
  SocialLinksDocumentData,
} from "../../prismicio-types";
import { NavLink } from "./NavLink";
import { ThemeSwitcher } from "./ThemeSwitcher";

export interface HeaderProps {
  socials: SocialLinksDocument<string>;
  navigationItems: SettingsDocument<string>;
}

export default function Header({ socials, navigationItems }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{ wrapper: "max-w-screen-xl mb-2" }}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          icon={isMenuOpen ? <X /> : <Menu />}
        />
        <NavbarBrand>
          <Link
            className="font-sign text-2xl text-foreground transition-all hover:scale-110"
            href={"/"}
            as={PrismicNextLink}
          >
            mcj
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {navigationItems.data.navigation.map((item, index) => {
          return (
            <NavbarItem key={index}>
              <NavLink linkField={item.link}></NavLink>
            </NavbarItem>
          );
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        {Object.keys(socials.data).map((k) => {
          const socialKey = k as keyof SocialLinksDocumentData;
          const socialEntryUrl = asLink(socials.data[socialKey]);

          return (
            <Button
              key={k}
              isExternal
              href={socialEntryUrl!}
              disableRipple
              as={Link}
              isIconOnly
              variant="light"
            >
              {SocialIconsMap[socialKey]}
            </Button>
          );
        })}

        <Divider orientation="vertical" className="h-8" />
        <ThemeSwitcher />
      </NavbarContent>
      <NavbarMenu>
        {navigationItems.data.navigation.map((item, index) => {
          return (
            <NavbarMenuItem key={index}>
              <NavLink linkField={item.link}></NavLink>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}
