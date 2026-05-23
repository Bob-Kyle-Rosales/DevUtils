"use client";

import { useState } from "react";
import { IconCode, IconCopy, IconCheck } from "@tabler/icons-react";
import ToolShell from "./ui/ToolShell";

const escapeMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export default function HtmlEncoder() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const output = input.replace(/[&<>"']/g, (c) => escapeMap[c]);

  async function copy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <ToolShell
      icon={IconCode}
      title="HTML encoder"
      actions={
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
      }
    >
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 border-r border-r-edge-subtle overflow-hidden">
          <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle px-3 flex items-center text-xs text-muted font-medium">
            Input
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste HTML or text…"
            className="flex-1 resize-none p-3 font-mono text-xs leading-relaxed bg-surface text-foreground outline-none placeholder:text-subtle"
          />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle px-3 flex items-center text-xs text-muted font-medium">
            Encoded
          </div>
          <div
            className={`flex-1 overflow-y-auto p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap break-all ${input ? "text-foreground" : "text-subtle"}`}
          >
            {input ? output : "Result…"}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
