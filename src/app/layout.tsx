import { getSettings } from "@/api/prismic/settings";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { repositoryName } from "@/prismicio";
import { asText } from "@prismicio/client";
import { PrismicPreview } from "@prismicio/next";
import { Metadata } from "next";
import "./globals.css";

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
  return (
    <html>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        {/* <Contained as={"main"}>{children}</Contained> */}
        {/* <main className="container mx-auto px-3 lg:px-6">{children}</main> */}
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
