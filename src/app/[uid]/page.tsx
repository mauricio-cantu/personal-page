// src/app/[uid]/page.tsx

import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";

import { getSettings } from "@/api/prismic/settings";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export async function generateMetadata({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid)
    .catch(() => notFound());
  const settings = await getSettings();

  return {
    title: `${asText(page.data.title)} | ${asText(settings.data.site_title)}`,
    description: page.data.meta_description,
  };
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client.getByUID("page", params.uid);

  return <SliceZone slices={page.data.slices} components={components} />;
}
