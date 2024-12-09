import { Contained } from "@/components/Contained";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client.getByUID("post", params.uid);
  return (
    <Contained>
      <h1>{page.data.title}</h1>
      <PrismicRichText field={page.data.content}></PrismicRichText>
    </Contained>
  );
}
