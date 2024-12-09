import { createClient } from "@/prismicio";

export async function getSettings() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return settings;
}

export async function getSocialLinks() {
  const client = createClient();
  const socialLinks = await client.getSingle("social_links");

  return socialLinks;
}
