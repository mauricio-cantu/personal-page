import { deepSeekR1Groq } from "@/ai-models";
import { repositoryName } from "@/prismicio";
import { createMigration, createWriteClient } from "@prismicio/client";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  const body = await request.json();
  if (body.secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
    return NextResponse.json({ success: false });
  }

  if (body.type === "test-trigger") {
    return NextResponse.json({ testSuccess: true });
  }

  const writeClient = createWriteClient(repositoryName, {
    writeToken: process.env.PRISMIC_WRITE_TOKEN as string,
  });

  const docToUpdate = await writeClient.getByID(body.documents[0]);

  if (docToUpdate.type !== "post") {
    return NextResponse.json({
      success: false,
      reason: "Document is not from type post",
    });
  }

  // if (docToUpdate.data.seo_data_already_processed) {
  //   return NextResponse.json({
  //     success: false,
  //     reason: "SEO data has already been processed for this document",
  //   });
  // }

  // const staticSeoProps: Partial<(typeof docToUpdate)["data"]> = {
  //   seo_data_already_processed: true,
  // };

  const content = `Utilizando o poder das LLMs, automatizei a criação de título, descrição, TL;DR, metadados para SEO e keywords para cada novo post do meu blog. Agora, tudo que preciso fazer é focar no conteúdo principal – o resto acontece automaticamente.

Recentemente lancei no ar meu site pessoal (link nos comentários 😎), um espaço que vou usar para documentar minha trajetória e publicar posts sobre desenvolvimento e tech no geral.

Estou usando esse site como uma oportunidade para experimentar abordagens e ferramentas novas, como por exemplo o Prismic CMS para gerenciamento de conteúdo (inclusive recomendo muito darem uma olhada, a criação de conteúdo e a integração com Typescript são incríveis ✨). E tenho brincado também com integração com LLMs usando o SDK de IA da Vercel e é essa parte que quero mostrar.

Agora ao que interessa, como essa automação funciona?

1️⃣ Webhook do Prismic CMS – Configurei o Prismic para disparar um webhook sempre que um novo post é publicado. A URL desse webhook aponta para uma rota da minha aplicação onde a mágica acontece.

2️⃣ Structured Outputs – Nessa rota, uso o SDK para gerar os metadados do post. O pulo do gato aqui é o uso da função generateObject, que permite gerar uma resposta estruturada (JSON) baseada em um schema do Zod. Por usar Zod a inferência de tipo é automática, então o Typescript sabe exatamente o formato da resposta vinda do LLM.

3️⃣ Dados prontos para uso – Com essa abordagem, a IA retorna um objeto JSON já formatado com título, descrição, TL;DR e as keywords. Então restou apenas usar esse conteúdo gerado e adicionar ele ao post que foi criado e que recebi no webhook.

O resultado? Menos tempo perdido com cadastros manuais e mais tempo para criar!

Estou usando o Groq Console como provedor de modelo de IA. Ele disponibiliza diversos modelos para uso via API. E o melhor: é GRÁTIS. Muito útil para testes ou demandas pontuais como a desse exemplo. Link nos comentários!

👉 Já pensou ou já usou IA para automatizar algum fluxo manual? Deixa aí nos comentários!`;

  const aiMetadata = await generateAIMetadataForContent(content);

  const migration = createMigration();

  migration.updateDocument({
    ...docToUpdate,
    data: {
      ...docToUpdate.data, // Conteúdo criado manualmente
      ...aiMetadata, // Restante do conteúdo gerado pela IA (título, descrição, TLDR, keywords, ...)
    },
  });

  await writeClient.migrate(migration);

  return NextResponse.json({ success: true });
}

const generateAIMetadataForContent = async (content: string) => {
  const { object } = await generateObject({
    model: deepSeekR1Groq,
    temperature: 0.4,
    system:
      "You're a content writer expert and will help the user generating meaningful and catchy copies for the provided content. The provided content is a post from a blog about software development and tech in general.",
    prompt: `Blog post's content:\n${content}`,
    schema: z.object({
      description: z
        .string()
        .describe("Short and meaningful description about the post."),
      title: z.string().describe("Catchy title for the post."),
      tldr: z
        .string()
        .describe(
          "A TLDR containing the most important points of the post. If there are action/practical items, prioritize describing them.",
        ),
      keywords: z
        .array(z.string())
        .min(2)
        .max(10)
        .describe("Keywords related to the content to be used as SEO data."),
    }),
    maxRetries: 3,
  });

  return object;
};
