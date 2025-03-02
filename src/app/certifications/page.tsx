import { asText } from "@prismicio/client";
import { notFound } from "next/navigation";

import { getSettings } from "@/api/prismic/settings";
import { CertificateCard } from "@/components/Certificate";
import { PageLayout } from "@/components/PageLayout";
import { createClient } from "@/prismicio";

export async function generateMetadata() {
  const client = createClient();
  const page = await client
    .getByUID("generic_page", "certifications")
    .catch(() => notFound());
  const settings = await getSettings();

  return {
    title: `${page.data.title} | ${asText(settings.data.site_title)}`,
    description: page.data.meta_description,
  };
}

export default async function Page() {
  const client = createClient();
  const page = await client.getByUID("generic_page", "certifications");
  const certifications = await client.getAllByType("certification", {
    orderings: [
      { field: "my.certification.accomplished_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  return (
    <PageLayout data={page.data}>
      <ul className="grid gap-4 md:grid-cols-3">
        {certifications.map((certification) => (
          <li key={certification.id}>
            <CertificateCard certificate={certification} />
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
