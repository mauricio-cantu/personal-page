import { getSettings, getSocialLinks } from "@/api/prismic/settings";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { createClient, repositoryName } from "@/prismicio";
import { asText } from "@prismicio/client";
import { PrismicPreview } from "@prismicio/next";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { indieFlower, lato } from "./fonts/localFont";
import "./globals.css";
import { Providers } from "./providers";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    description: settings.data.default_meta_tag_description || "",
    title: asText(settings.data.site_title),
    keywords: settings.data.seo_keywords,
    verification: {
      google: "FqxYXO_gAeT8g3rSwLf_mIQbflfbJFjW0bk3OYC02mw",
    },
    openGraph: {
      type: "website",
      images: [settings.data.default_meta_tag_image.url || ""],
      description: settings.data.default_meta_tag_description || "",
      title: asText(settings.data.site_title),
      url: "https://mcjcm.com",
      siteName: asText(settings.data.site_title),
    },
    twitter: {
      card: "summary_large_image",
      creator: asText(settings.data.site_title),
      images: [settings.data.default_meta_tag_image.url || ""],
      description: settings.data.default_meta_tag_description || "",
      title: asText(settings.data.site_title),
      site: "https://mcjcm.com",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const socials = await getSocialLinks();
  const navigationItems = await getSettings();
  return (
    <html className={`${indieFlower.variable} ${lato.variable}`}>
      <body>
        <Providers>
          <main className="grid h-screen grid-rows-[auto_1fr_auto] bg-background text-foreground">
            <Header socials={socials} navigationItems={navigationItems} />
            {children}
            <Analytics />
            <Footer />
          </main>
          <PrismicPreview repositoryName={repositoryName} />
        </Providers>
      </body>
    </html>
  );
}
