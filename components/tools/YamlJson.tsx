"use client";

import { useState } from "react";
import { IconTransform } from "@tabler/icons-react";
import ToolShell from "./ui/ToolShell";
import CopyButton from "./ui/CopyButton";

const SAMPLE = "name: DevUtils\nversion: 1.0\npublished: true\nauthor: You";

function parseYaml(text: string) {
  if (!text.trim()) return null;
  try {
    const obj: Record<string, unknown> = {};
    for (const line of text.split("\n")) {
      const m = line.match(/^([\w-]+):\s*(.*)$/);
      if (!m) continue;
      const [, key, raw] = m;
      const v = raw.trim().replace(/^['"]|['"]$/g, "");
      obj[key] =
        v === "true"
          ? true
          : v === "false"
            ? false
            : !isNaN(Number(v)) && v !== ""
              ? Number(v)
              : v;
    }
    return { out: JSON.stringify(obj, null, 2), valid: true };
  } catch {
    return { out: "✗ Parse error", valid: false };
  }
}

export default function YamlJson() {
  const [input, setInput] = useState("");

  const result = parseYaml(input);

  return (
    <ToolShell
      icon={IconTransform}
      title="YAML → JSON"
      actions={
        <>
          <button
            onClick={() => setInput(SAMPLE)}
            className="text-xs px-2.5 py-1 rounded-md border border-edge text-muted hover:bg-surface-2 transition-colors cursor-pointer"
          >
            Sample
          </button>
          <CopyButton value={result?.out ?? null} />
        </>
      }
    >
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 border-r border-r-edge-subtle overflow-hidden">
          <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle px-3 flex items-center text-xs text-muted font-medium">
            YAML input
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"name: DevUtils\nversion: 1.0\npublished: true"}
            className="flex-1 resize-none p-3 font-mono text-xs leading-relaxed bg-surface text-foreground outline-none placeholder:text-subtle"
          />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle px-3 flex items-center text-xs text-muted font-medium">
            JSON output
          </div>
          <div
            className={`flex-1 overflow-y-auto p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap ${
              !result
                ? "text-subtle"
                : result.valid
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-red-700 dark:text-red-400"
            }`}
          >
            {result?.out ?? "JSON will appear here…"}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}