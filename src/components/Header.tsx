import { getSettings } from "@/api/prismic/settings";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import Link from "next/link";
import { Contained } from "./Contained";

export async function Header() {
  const settings = await getSettings();

  return (
    <header className="sticky top-0 bg-background py-6">
      <Contained className="flex flex-col items-baseline md:flex-row">
        <Link href="/" className="shrink-0 text-2xl font-medium text-white">
          <PrismicText field={settings.data.site_title} />
        </Link>
        <nav className="grow">
          <ul className="flex flex-wrap gap-x-6 gap-y-4 md:justify-end md:gap-x-12">
            {settings.data.navigation.map((item, index) => (
              <li key={index}>
                <PrismicNextLink field={item.link}>
                  {item.link.text}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
      </Contained>
    </header>
  );
}
