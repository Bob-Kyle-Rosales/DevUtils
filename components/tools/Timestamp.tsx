"use client";

import { useState, useEffect } from "react";
import { IconClock } from "@tabler/icons-react";
import ToolShell from "./ui/ToolShell";

function formatTs(ms: number) {
  const d = new Date(ms);
  return [
    ["UTC", d.toUTCString()],
    ["ISO 8601", d.toISOString()],
    ["Local", d.toLocaleString()],
    ["Date only", d.toLocaleDateString()],
    ["Time only", d.toLocaleTimeString()],
    ["Relative", timeAgo(d)],
  ];
}

function timeAgo(d: Date) {
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (Math.abs(s) < 60) return `${s}s ago`;
  if (Math.abs(s) < 3600) return `${Math.floor(s / 60)}m ago`;
  if (Math.abs(s) < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default function Timestamp() {
  const [input, setInput] = useState("");
  const [now, setNow] = useState(() => Date.now());

  // Live clock — cleanup clears the interval when component unmounts
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const ms = input.trim()
    ? input.length > 10
      ? parseInt(input)
      : parseInt(input) * 1000
    : null;
  const rows = ms !== null && !isNaN(ms) ? formatTs(ms) : null;
  const invalid = input.trim() && !rows;

  return (
    <ToolShell
      icon={IconClock}
      title="Unix timestamp converter"
      actions={
        <button
          onClick={() => setInput(String(Math.floor(Date.now() / 1000)))}
          className="text-xs px-2.5 py-1 rounded-md border border-edge text-muted hover:bg-surface-2 transition-colors cursor-pointer"
        >
          Use now
        </button>
      }
    >
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        <div>
          <label className="text-xs text-muted mb-1.5 block">
            Unix timestamp
          </label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 1716460800"
            className="w-full font-mono text-sm px-3 py-2 rounded-lg border border-edge bg-surface text-foreground outline-none focus:border-brand"
          />
        </div>

        {invalid && (
          <p className="text-xs text-red-600 dark:text-red-400">
            Invalid timestamp
          </p>
        )}

        {rows && (
          <div className="grid grid-cols-2 gap-2">
            {rows.map(([label, value]) => (
              <div
                key={label}
                className="bg-surface-2 border border-edge-subtle rounded-lg px-3 py-2"
              >
                <div className="text-[10px] text-subtle mb-0.5">{label}</div>
                <div className="font-mono text-xs">{value}</div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-t-edge-subtle pt-4">
          <div className="text-xs text-muted mb-2">Current time</div>
          <div className="font-mono text-xl font-medium">
            {Math.floor(now / 1000)}
          </div>
          <div className="text-xs text-subtle mt-1">
            {new Date(now).toString()}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
