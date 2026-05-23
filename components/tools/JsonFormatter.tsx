"use client";

import { useState } from "react";
import {
  IconBraces,
  IconTrash,
  IconCopy,
  IconCheck,
} from "@tabler/icons-react";
import ToolShell from "./ui/ToolShell";

type Mode = "prettify" | "minify" | "validate";
type Indent = "2" | "4" | "tab";

const SAMPLE =
  '{"name":"DevUtils","version":"1.0.0","tools":["json","base64","uuid"],"author":{"name":"You","role":"Dev"},"published":true}';

function processJson(raw: string, mode: Mode, indent: Indent) {
  if (!raw.trim()) return null;
  try {
    const parsed = JSON.parse(raw);
    const spaces = indent === "tab" ? "\t" : parseInt(indent);
    if (mode === "prettify")
      return { out: JSON.stringify(parsed, null, spaces), valid: true };
    if (mode === "minify") return { out: JSON.stringify(parsed), valid: true };
    const type = Array.isArray(parsed) ? `Array [${parsed.length}]` : "Object";
    const keys = Array.isArray(parsed)
      ? parsed.length
      : Object.keys(parsed).length;
    return { out: `✓ Valid JSON\n\nType: ${type}\nKeys: ${keys}`, valid: true };
  } catch (e) {
    return { out: `✗ ${(e as Error).message}`, valid: false };
  }
}

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("prettify");
  const [indent, setIndent] = useState<Indent>("2");
  const [copied, setCopied] = useState(false);

  const result = processJson(input, mode, indent);

  async function copy() {
    if (!result?.out) return;
    await navigator.clipboard.writeText(result.out);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <ToolShell
      icon={IconBraces}
      title="JSON formatter"
      actions={
        <>
          <button
            onClick={() => setInput("")}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border border-edge text-muted hover:bg-surface-2 transition-colors cursor-pointer"
          >
            <IconTrash size={13} /> Clear
          </button>
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
        { id: "prettify", label: "Prettify" },
        { id: "minify", label: "Minify" },
        { id: "validate", label: "Validate" },
      ]}
      activeTab={mode}
      onTabChange={(t) => setMode(t as Mode)}
    >
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 overflow-hidden border-r border-r-edge-subtle">
          <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle flex items-center justify-between px-3 text-xs text-muted font-medium">
            Input
            <button
              onClick={() => setInput(SAMPLE)}
              className="text-[11px] px-2 py-0.5 rounded border border-edge-subtle bg-surface text-muted hover:bg-surface-2 cursor-pointer"
            >
              Load sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              'Paste your JSON here…\n\n{"name":"DevUtils","version":"1.0"}'
            }
            className="flex-1 w-full resize-none p-3 font-mono text-xs leading-relaxed bg-surface text-foreground outline-none placeholder:text-subtle"
          />
          <div className="h-10 shrink-0 border-t border-t-edge-subtle bg-surface-2 flex items-center gap-2 px-3 text-xs text-muted">
            Indent:
            <select
              value={indent}
              onChange={(e) => setIndent(e.target.value as Indent)}
              className="text-[11px] px-1.5 py-0.5 rounded border border-edge bg-surface text-foreground"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="tab">Tab</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle flex items-center justify-between px-3 text-xs text-muted font-medium">
            Output
            {result && (
              <span
                className={`text-[11px] px-2 py-0.5 rounded border ${
                  result.valid
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
                }`}
              >
                {result.valid ? "✓ Valid" : "Invalid"}
              </span>
            )}
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
            {result?.out ?? "Your formatted JSON will appear here…"}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
