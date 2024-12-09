import { getSettings, getSocialLinks } from "@/api/prismic/settings";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { repositoryName } from "@/prismicio";
import { asText } from "@prismicio/client";
import { PrismicPreview } from "@prismicio/next";
import { Metadata } from "next";
import { indieFlower, lato } from "./fonts/localFont";
import "./globals.css";
import { Providers } from "./providers";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: asText(settings.data.site_title),
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
          <main className="text-foreground bg-background grid h-screen grid-rows-[auto_1fr_auto]">
            <Header socials={socials} navigationItems={navigationItems} />
            {children}
            <Footer />
          </main>
          <PrismicPreview repositoryName={repositoryName} />
        </Providers>
      </body>
    </html>
  );
}
