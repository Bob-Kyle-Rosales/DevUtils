import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import JsonFormatter from "@/components/tools/JsonFormatter";
import Base64 from "@/components/tools/Base64";
import UrlEncoder from "@/components/tools/UrlEncoder";
import HtmlEncoder from "@/components/tools/HtmlEncoder";
import YamlJson from "@/components/tools/YamlJson";
import JwtDecoder from "@/components/tools/JwtDecoder";
import UuidGenerator from "@/components/tools/UuidGenerator";
import HashGenerator from "@/components/tools/HashGenerator";
import RegexTester from "@/components/tools/RegexTester";
import TextDiff from "@/components/tools/TextDiff";
import Timestamp from "@/components/tools/Timestamp";

const toolMap: Record<string, ComponentType> = {
  json: JsonFormatter,
  base64: Base64,
  url: UrlEncoder,
  html: HtmlEncoder,
  yaml: YamlJson,
  jwt: JwtDecoder,
  uuid: UuidGenerator,
  hash: HashGenerator,
  regex: RegexTester,
  diff: TextDiff,
  timestamp: Timestamp,
};

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const Tool = toolMap[slug];
  if (!Tool) notFound();
  return <Tool />;
}
