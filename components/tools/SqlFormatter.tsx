"use client";

import { useState } from "react";
import { format } from "sql-formatter";

const SAMPLE = `SELECT u.id, u.name, u.email, p.plan FROM users u LEFT JOIN plans p ON u.plan_id = p.id WHERE u.created_at > '2024-01-01' ORDER BY u.created_at DESC LIMIT 50;`;

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const output = (() => {
    if (!input.trim()) return "";
    try {
      return format(input, { language: "sql", tabWidth: 2 });
    } catch {
      return "Invalid SQL";
    }
  })();

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function loadSample() {
    setInput(SAMPLE);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-b-edge-subtle shrink-0">
        <h1 className="text-sm font-medium text-foreground">SQL Formatter</h1>
        <div className="flex gap-2">
          <button
            onClick={loadSample}
            className="text-xs px-2 py-1 rounded border border-edge text-muted hover:text-foreground transition-colors cursor-pointer"
          >
            Sample
          </button>
          <button
            onClick={copy}
            disabled={!output}
            className="text-xs px-2 py-1 rounded border border-edge text-muted hover:text-foreground transition-colors cursor-pointer disabled:opacity-40"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <textarea
          className="flex-1 resize-none p-4 text-sm font-mono bg-transparent text-foreground outline-none border-r border-r-edge-subtle placeholder:text-subtle"
          placeholder="Paste SQL here…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
        />
        <pre className="flex-1 p-4 text-sm font-mono text-foreground overflow-auto whitespace-pre-wrap">
          {output || (
            <span className="text-subtle">Formatted SQL will appear here</span>
          )}
        </pre>
      </div>
    </div>
  );
}
