"use client";

import { useState } from "react";
import { IconFileDiff } from "@tabler/icons-react";
import ToolShell from "./ui/ToolShell";
import CopyButton from "./ui/CopyButton";

const SAMPLE = {
  a: 'function greet(name) {\n  console.log("Hello " + name);\n  return true;\n}',
  b: 'function greet(name, greeting = "Hello") {\n  console.log(`${greeting} ${name}`);\n  return name;\n}',
};

type DiffLine = { type: "same" | "added" | "removed"; text: string };

function diffLines(a: string, b: string): DiffLine[] {
  const aLines = a.split("\n");
  const bLines = b.split("\n");
  const max = Math.max(aLines.length, bLines.length);
  const result: DiffLine[] = [];
  for (let i = 0; i < max; i++) {
    if (aLines[i] === bLines[i]) {
      result.push({ type: "same", text: aLines[i] ?? "" });
    } else {
      if (aLines[i] !== undefined)
        result.push({ type: "removed", text: aLines[i] });
      if (bLines[i] !== undefined)
        result.push({ type: "added", text: bLines[i] });
    }
  }
  return result;
}

export default function TextDiff() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const diff = a || b ? diffLines(a, b) : null;
  const diffText = diff
    ? diff
        .map(
          (l) =>
            `${l.type === "added" ? "+" : l.type === "removed" ? "-" : " "} ${l.text}`,
        )
        .join("\n")
    : null;

  return (
    <ToolShell
      icon={IconFileDiff}
      title="Text diff viewer"
      actions={
        <>
          <button
            onClick={() => {
              setA(SAMPLE.a);
              setB(SAMPLE.b);
            }}
            className="text-xs px-2.5 py-1 rounded-md border border-edge text-muted hover:bg-surface-2 transition-colors cursor-pointer"
          >
            Sample
          </button>
          <CopyButton value={diffText} />
        </>
      }
    >
      <div className="flex flex-col flex-1 overflow-hidden">
        <div
          className="flex flex-1 overflow-hidden"
          style={{ maxHeight: "50%" }}
        >
          <div className="flex flex-col flex-1 border-r border-r-edge-subtle overflow-hidden">
            <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle px-3 flex items-center text-xs text-muted font-medium">
              Original
            </div>
            <textarea
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="Original text…"
              className="flex-1 resize-none p-3 font-mono text-xs leading-relaxed bg-surface text-foreground outline-none placeholder:text-subtle"
            />
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle px-3 flex items-center text-xs text-muted font-medium">
              Modified
            </div>
            <textarea
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="Modified text…"
              className="flex-1 resize-none p-3 font-mono text-xs leading-relaxed bg-surface text-foreground outline-none placeholder:text-subtle"
            />
          </div>
        </div>

        <div className="border-t border-t-edge-subtle flex flex-col flex-1 overflow-hidden">
          <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle px-3 flex items-center text-xs text-muted font-medium">
            Diff output
          </div>
          <div className="flex-1 overflow-y-auto p-3 font-mono text-xs leading-loose">
            {!diff ? (
              <span className="text-subtle">
                Enter text in both panels to see the diff…
              </span>
            ) : (
              diff.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.type === "added"
                      ? "text-emerald-700 dark:text-emerald-400"
                      : line.type === "removed"
                        ? "text-red-700 dark:text-red-400"
                        : "text-subtle"
                  }
                >
                  {line.type === "added"
                    ? "+ "
                    : line.type === "removed"
                      ? "- "
                      : "  "}
                  {line.text}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
