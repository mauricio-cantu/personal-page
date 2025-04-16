import { dateFormatter } from "@/lib/utils";
import { Card, CardFooter, CardHeader, Divider, Link } from "@heroui/react";
import { asDate, asLink } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { CertificationDocument } from "../../prismicio-types";

export function CertificateCard({
  certificate,
}: {
  certificate: CertificationDocument;
}) {
  const href = asLink(certificate.data.link);

  return (
    <Card
      radius="sm"
      shadow="none"
      className="border border-foreground/40 bg-transparent"
    >
      <CardHeader className="flex gap-3">
        <PrismicNextImage
          className="size-[80px] object-contain"
          field={certificate.data.image}
        />
        <div className="flex flex-col gap-1">
          <p className="text-md font-bold">{certificate.data.title}</p>
          <p className="text-small text-foreground-600">
            {certificate.data.issued_by}
          </p>
          <p className="text-small text-foreground-600">
            {dateFormatter.format(
              asDate(
                certificate.data.accomplished_date ||
                  certificate.first_publication_date,
              ),
            )}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          href={href!}
          className="text-foreground"
          showAnchorIcon
        >
          View
        </Link>
      </CardFooter>
    </Card>
  );
}
