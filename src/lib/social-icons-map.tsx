import { SiGithub, SiLinkedin } from "@icons-pack/react-simple-icons";
import React from "react";
import { SocialLinksDocumentData } from "../../prismicio-types";

export const SocialIconsMap: Record<
  keyof SocialLinksDocumentData,
  React.ReactElement
> = {
  linkedin: <SiLinkedin></SiLinkedin>,
  github: <SiGithub></SiGithub>,
};
