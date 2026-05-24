"use client";

import { useState } from "react";
import { IconLink, IconCopy, IconCheck } from "@tabler/icons-react";
import ToolShell from "./ui/ToolShell";

type Mode = "encode" | "decode";

const SAMPLE = "https://example.com/search?q=hello world&lang=en#results";

function process(v: string, mode: Mode) {
  if (!v) return null;
  try {
    return {
      out: mode === "encode" ? encodeURIComponent(v) : decodeURIComponent(v),
      valid: true,
    };
  } catch {
    return { out: "✗ Invalid URL encoding", valid: false };
  }
}

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const [copied, setCopied] = useState(false);

  const result = process(input, mode);

  async function copy() {
    if (!result?.out) return;
    await navigator.clipboard.writeText(result.out);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <ToolShell
      icon={IconLink}
      title="URL encoder / decoder"
      actions={
        <>
          <button
            onClick={() => setInput(SAMPLE)}
            className="text-xs px-2.5 py-1 rounded-md border border-edge text-muted hover:bg-surface-2 transition-colors cursor-pointer"
          >
            Sample
          </button>
          <button
            onClick={copy}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border border-edge text-muted hover:bg-surface-2 transition-colors cursor-pointer"
          >
          {copied ? (
            <>
              <IconCheck size={13} className="text-emerald-500" /> Copied
            </>
          ) : (
            <>
              <IconCopy size={13} /> Copy
            </>
          )}
          </button>
        </>
      }
      tabs={[
        { id: "encode", label: "Encode" },
        { id: "decode", label: "Decode" },
      ]}
      activeTab={mode}
      onTabChange={(t) => setMode(t as Mode)}
    >
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 border-r border-r-edge-subtle overflow-hidden">
          <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle px-3 flex items-center text-xs text-muted font-medium">
            Input
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste URL or text…"
            className="flex-1 resize-none p-3 font-mono text-xs leading-relaxed bg-surface text-foreground outline-none placeholder:text-subtle"
          />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle px-3 flex items-center text-xs text-muted font-medium">
            Output
          </div>
          <div
            className={`flex-1 overflow-y-auto p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap break-all ${
              !result
                ? "text-subtle"
                : result.valid
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-red-700 dark:text-red-400"
            }`}
          >
            {result?.out ?? "Result appears here…"}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
