import { Contained } from "@/components/Contained";
import { dateFormatter } from "@/lib/utils";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { asDate, asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

type Params = { uid: string };

export async function generateMetadata({ params }: { params: Params }) {
  const client = createClient();
  const page = await client.getByUID("post", params.uid);
  const settings = await client.getSingle("settings");

  return {
    title: `${page.data.meta_title} | ${asText(settings.data.site_title)}`,
    description: page.data.meta_description,
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
