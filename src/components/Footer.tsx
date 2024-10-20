import { getSettings } from "@/api/prismic/settings";
import { PrismicText } from "@prismicio/react";

export async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="px-6 py-10">
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm">
          <PrismicText field={settings.data.site_title} /> &mdash;{" "}
          {new Date().getFullYear()}
        </span>
        <span className="text-xs text-slate-400">
          Built with Next, Tailwind and Primisc.
        </span>
      </div>
    </footer>
  );
}
