import { getSettings, getSocialLinks } from "@/api/prismic/settings";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import { Analytics } from "@vercel/analytics/react";
import { indieFlower, lato } from "./fonts/localFont";
import "./globals.css";
import { Providers } from "./providers";

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

export function generateMetadata() {
  return {
    title: "TESTEE",
  };
}
