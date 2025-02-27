import { Divider } from "@heroui/react";
import { ReactNode } from "react";
import { GenericPageDocumentData } from "../../prismicio-types";
import { Contained } from "./Contained";

export function PageLayout({
  data,
  children,
}: {
  data: GenericPageDocumentData;
  children: ReactNode;
}) {
  return (
    <Contained className="flex h-full flex-col">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold lg:text-4xl">{data.title} </h1>
        {!!data.description && (
          <h3 className="text-medium lg:text-lg">{data.description}</h3>
        )}
        <Divider className="mb-4" />
      </div>
      {children}
    </Contained>
  );
}
