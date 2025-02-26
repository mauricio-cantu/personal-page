import { getSettings, getSocialLinks } from "@/api/prismic/settings";
import { Link } from "@nextui-org/react";
import { asLink } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { SocialLinksDocumentData } from "../../prismicio-types";

export async function Footer() {
  const settings = await getSettings();
  const socials = await getSocialLinks();

  return (
    <footer className="mt-5 border-t border-foreground/40 px-6 py-10">
      <ul className="flex list-none flex-col items-center gap-1">
        <li>
          <span className="text-sm">
            <PrismicText field={settings.data.site_title} /> -{" "}
            {new Date().getFullYear()}
          </span>
        </li>
        <li>
          <span className="text-xs">mauriciocantujoc@gmail.com</span>
        </li>
        {Object.keys(socials.data).map((k, i) => {
          const socialKey = k as keyof SocialLinksDocumentData;
          const socialEntryUrl = asLink(socials.data[socialKey]);
          return (
            <li key={i}>
              <Link
                href={socialEntryUrl!}
                isExternal
                showAnchorIcon
                className="text-xs text-foreground"
              >
                {socials.data[socialKey].text}
              </Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
