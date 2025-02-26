import { asText } from "@prismicio/client";
import { notFound } from "next/navigation";

import { getSettings } from "@/api/prismic/settings";
import { PageLayout } from "@/components/PageLayout";
import { createClient } from "@/prismicio";

export async function generateMetadata() {
  const client = createClient();
  const page = await client
    .getByUID("generic_page", "posts")
    .catch(() => notFound());
  const settings = await getSettings();

  return {
    title: `${page.data.title} | ${asText(settings.data.site_title)}`,
    description: page.data.meta_description,
  };
}

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
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.data.title}</h2>
            <p>{post.data.description}</p>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
