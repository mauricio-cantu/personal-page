import { asDate } from "@prismicio/client";

import { PageLayout } from "@/components/PageLayout";
import { dateFormatter } from "@/lib/utils";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";

// export async function generateMetadata() {
//   const client = createClient();
//   const page = await client
//     .getByUID("generic_page", "posts")
//     .catch(() => notFound());
//   const settings = await getSettings();

//   return {
//     title: `${page.data.title} | ${asText(settings.data.site_title)}`,
//     description: page.data.meta_description,
//   };
// }

export default async function Page() {
  const client = createClient();
  const page = await client.getByUID("generic_page", "posts");
  const posts = await client.getAllByType("post", {
    orderings: [
      { field: "my.post.publish_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  return (
    <PageLayout data={page.data}>
      <ul className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <li key={post.id}>
            <PrismicNextLink href={`posts/${post.uid}`}>
              <div className="flex h-[180px] flex-col justify-center gap-4 rounded-md border border-foreground/40 px-6 py-3 text-foreground transition-colors hover:border-primary">
                <h2 className="line-clamp-2 text-medium font-bold lg:text-xl">
                  {post.data.title}
                </h2>
                <p className="line-clamp-2 text-sm text-foreground/70">
                  {post.data.description}
                </p>
                <p className="text-sm text-foreground/70">
                  {dateFormatter.format(
                    asDate(
                      post.data.publish_date || post.first_publication_date,
                    ),
                  )}
                </p>
              </div>
            </PrismicNextLink>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
