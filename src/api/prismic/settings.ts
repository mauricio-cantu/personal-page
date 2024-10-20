import { createClient } from "@/prismicio";

export async function getSettings() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return settings;
}
