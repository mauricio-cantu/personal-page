import { Contained } from "@/components/Contained";
import { dateFormatter } from "@/lib/utils";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { asDate, asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { Metadata, ResolvingMetadata } from "next";

type Params = { uid: string };

export async function generateMetadata(
  { params }: { params: Params },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("post", params.uid);
  const settings = await client.getSingle("settings");

  const parentMetadata = await parent;

  return {
    title: `${page.data.title} | ${asText(settings.data.site_title)}`,
    description: page.data.description,
    openGraph: {
      type: "article",
      images: [
        page.data.thumbnail.url || "",
        ...(parentMetadata.openGraph?.images || []),
      ],
      title: `${page.data.title} | ${asText(settings.data.site_title)}`,
      description: page.data.description || "",
      url: `https://mcjcm.com/posts/${params.uid}`,
    },
    twitter: {
      images: [
        page.data.thumbnail.url || "",
        ...(parentMetadata.openGraph?.images || []),
      ],
      title: `${page.data.title} | ${asText(settings.data.site_title)}`,
      description: page.data.description || "",
      site: `https://mcjcm.com/posts/${params.uid}`,
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client.getByUID("post", params.uid);
  return (
    <Contained className="max-w-screen-md">
      <div className="grid w-full gap-3 border-b border-foreground-900/25 py-5 align-middle">
        <h1 className="text-3xl font-bold md:text-5xl">{page.data.title}</h1>
        {!!page.data.description && (
          <p className="text-medium">{page.data.description}</p>
        )}
        <p className="text-sm">
          By Maurício Cantú
          <span className="mx-2">·</span>
          {dateFormatter.format(
            asDate(page.data.publish_date || page.first_publication_date),
          )}
        </p>
      </div>
      <article className="mx-auto mt-3">
        <SliceZone slices={page.data.slices} components={components} />
      </article>
    </Contained>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
