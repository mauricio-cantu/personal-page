import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home");

  return <SliceZone slices={page.data.slices} components={components} />;
}
