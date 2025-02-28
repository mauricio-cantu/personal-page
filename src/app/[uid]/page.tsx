// src/app/[uid]/page.tsx

import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";

import { getSettings } from "@/api/prismic/settings";
import { PageLayout } from "@/components/PageLayout";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export async function generateMetadata({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("generic_page", params.uid)
    .catch(() => notFound());
  const settings = await getSettings();

  return {
    title: `${page.data.title} | ${asText(settings.data.site_title)}`,
    description: `${page.data.meta_description}`,
  };
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client.getByUID("generic_page", params.uid);

  return (
    <PageLayout data={page.data}>
      <SliceZone slices={page.data.slices} components={components} />
    </PageLayout>
  );
}
