import { Contained } from "@/components/Contained";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { asDate } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

type Params = { uid: string };

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client.getByUID("post", params.uid);
  return (
    <Contained className="max-w-screen-md">
      <div className="mb-3 grid w-full gap-3 border-b border-foreground-900/25 py-8 align-middle">
        <h1 className="text-3xl font-bold md:text-5xl">{page.data.title}</h1>
        {!!page.data.description && (
          <p className="text-sm md:text-medium">{page.data.description}</p>
        )}
        <p className="text-sm">
          By Maurício Cantú
          <span className="mx-2">·</span>
          {dateFormatter.format(
            asDate(page.data.publish_date || page.first_publication_date),
          )}
        </p>
      </div>
      <article className="mx-auto mt-8">
        <SliceZone slices={page.data.slices} components={components} />
      </article>
    </Contained>
  );
}
