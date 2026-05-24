"use client";

import { useState } from "react";
import { IconRegex } from "@tabler/icons-react";
import ToolShell from "./ui/ToolShell";
import CopyButton from "./ui/CopyButton";

const SAMPLE = {
  pattern: "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b",
  flags: "g",
  input: "Contact us at hello@devutils.io or support@example.com for help.",
};

function runRegex(pattern: string, flags: string, str: string) {
  if (!pattern || !str) return null;
  try {
    const safeFlags = flags.includes("g") ? flags : flags + "g";
    const rx = new RegExp(pattern, safeFlags);
    const matches = [...str.matchAll(rx)];
    return { matches, error: null };
  } catch (e) {
    return { matches: [], error: (e as Error).message };
  }
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [input, setInput] = useState("");

  const result = runRegex(pattern, flags, input);
  const matchesText =
    result && !result.error && result.matches.length
      ? result.matches
          .map((m, i) => `Match ${i + 1}: "${m[0]}" at index ${m.index}`)
          .join("\n")
      : null;

  function loadSample() {
    setPattern(SAMPLE.pattern);
    setFlags(SAMPLE.flags);
    setInput(SAMPLE.input);
  }

  return (
    <ToolShell
      icon={IconRegex}
      title="Regex tester"
      actions={
        <>
          <button
            onClick={loadSample}
            className="text-xs px-2.5 py-1 rounded-md border border-edge text-muted hover:bg-surface-2 transition-colors cursor-pointer"
          >
            Sample
          </button>
          <CopyButton value={matchesText} />
        </>
      }
    >
      {/* Pattern bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-b-edge-subtle bg-surface-2">
        <span className="text-muted font-mono text-sm">/</span>
        <input
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="Enter regex pattern…"
          className="flex-1 font-mono text-[13px] border border-edge rounded-md px-2.5 py-1 bg-surface text-foreground outline-none focus:border-brand"
        />
        <span className="text-muted font-mono text-sm">/</span>
        <select
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          className="text-xs px-1.5 py-1 rounded-md border border-edge bg-surface text-foreground"
        >
          {["g", "gi", "gm", "gim"].map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle px-3 flex items-center text-xs text-muted font-medium">
          Test string
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your test string here…"
          style={{ maxHeight: 160 }}
          className="resize-none p-3 font-mono text-xs leading-relaxed bg-surface text-foreground outline-none placeholder:text-subtle border-b border-b-edge-subtle"
        />

        <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle px-3 flex items-center gap-2 text-xs text-muted font-medium">
          Matches
          {result && !result.error && (
            <span className="font-normal">
              {result.matches.length} match
              {result.matches.length !== 1 ? "es" : ""}
            </span>
          )}
        </div>
        <div
          className={`flex-1 overflow-y-auto p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap ${
            !result
              ? "text-subtle"
              : result.error
                ? "text-red-700 dark:text-red-400"
                : result.matches.length
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-muted"
          }`}
        >
          {!result
            ? "Matches will appear here…"
            : result.error
              ? `✗ ${result.error}`
              : result.matches.length === 0
                ? "No matches found."
                : result.matches
                    .map(
                      (m, i) => `Match ${i + 1}: "${m[0]}" at index ${m.index}`,
                    )
                    .join("\n")}
        </div>
      </div>
    </ToolShell>
  );
}
