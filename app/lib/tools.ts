import type { FC, CSSProperties } from "react";
import {
  IconBraces,
  IconTransform,
  IconDatabase,
  IconFileCode,
  IconLink,
  IconCode,
  IconFingerprint,
  IconHash,
  IconLock,
  IconRegex,
  IconFileDiff,
  IconClock,
  IconSparkles,
  IconRobot,
} from "@tabler/icons-react";

export type categoryegory = "formatter" | "encoder" | "generator" | "ai";

export type Tool = {
  id: string;
  name: string;
  desc: string;
  icon: FC<{ size?: number; style?: CSSProperties; className?: string }>;
  category: categoryegory;
  pro?: boolean;
};

export const tools: Tool[] = [
  {
    id: "json",
    name: "JSON formatter",
    desc: "Prettify, minify & validate",
    icon: IconBraces,
    category: "formatter",
  },
  {
    id: "yaml",
    name: "YAML ↔ JSON",
    desc: "Convert between formats",
    icon: IconTransform,
    category: "formatter",
  },
  {
    id: "sql",
    name: "SQL formatter",
    desc: "Format + AI explain queries",
    icon: IconDatabase,
    category: "formatter",
    pro: true,
  },
  {
    id: "base64",
    name: "Base64",
    desc: "Encode & decode text",
    icon: IconFileCode,
    category: "encoder",
  },
  {
    id: "url",
    name: "URL encoder",
    desc: "Encode/decode URLs",
    icon: IconLink,
    category: "encoder",
  },
  {
    id: "html",
    name: "HTML encoder",
    desc: "Escape HTML entities",
    icon: IconCode,
    category: "encoder",
  },
  {
    id: "uuid",
    name: "UUID generator",
    desc: "Bulk generate v4 / v7",
    icon: IconFingerprint,
    category: "generator",
  },
  {
    id: "hash",
    name: "Hash generator",
    desc: "MD5, SHA-1, SHA-256",
    icon: IconHash,
    category: "generator",
  },
  {
    id: "jwt",
    name: "JWT decoder",
    desc: "Inspect token header & payload",
    icon: IconLock,
    category: "formatter",
  },
  {
    id: "regex",
    name: "Regex tester",
    desc: "Live match highlighting",
    icon: IconRegex,
    category: "formatter",
  },
  {
    id: "diff",
    name: "Text diff",
    desc: "Side-by-side diff viewer",
    icon: IconFileDiff,
    category: "formatter",
  },
  {
    id: "ts",
    name: "Timestamp",
    desc: "Unix ↔ human date",
    icon: IconClock,
    category: "formatter",
  },
  {
    id: "regex-ai",
    name: "AI regex explainer",
    desc: "Plain English breakdown",
    icon: IconSparkles,
    category: "ai",
    pro: true,
  },
  {
    id: "schema-ai",
    name: "AI JSON schema",
    desc: "Generate schema from JSON",
    icon: IconRobot,
    category: "ai",
    pro: true,
  },
];
