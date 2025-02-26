import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home");

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home");
  const settings = await client.getSingle("settings");

  return {
    title: asText(settings.data.site_title),
    description: page.data.meta_description,
  };
}
