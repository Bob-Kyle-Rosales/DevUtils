"use client";

import { useState } from "react";
import {
  IconFingerprint,
  IconRefresh,
  IconCopy,
  IconCheck,
} from "@tabler/icons-react";
import ToolShell from "./ui/ToolShell";

type Version = "v4" | "v7";

function uuidv4() {
  return crypto.randomUUID();
}

function uuidv7() {
  const ts = Date.now().toString(16).padStart(12, "0");
  const rnd = crypto.getRandomValues(new Uint8Array(10));
  const h = (b: number) => b.toString(16).padStart(2, "0");
  return [
    ts.slice(0, 8),
    ts.slice(8, 12),
    "7" + h(rnd[0]) + rnd[1].toString(16)[0],
    h((rnd[2] & 0x3f) | 0x80) + h(rnd[3]),
    Array.from(rnd.slice(4)).map(h).join(""),
  ].join("-");
}

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [version, setVersion] = useState<Version>("v4");
  const [upper, setUpper] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  function generate() {
    const gen = version === "v4" ? uuidv4 : uuidv7;
    let result = Array.from({ length: count }, gen);
    if (upper) result = result.map((u) => u.toUpperCase());
    setUuids(result);
  }

  async function copy() {
    if (!uuids.length) return;
    await navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <ToolShell
      icon={IconFingerprint}
      title="UUID generator"
      actions={
        <>
          <button
            onClick={generate}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-brand text-white hover:bg-[#3C3489] transition-colors cursor-pointer border-0"
          >
            <IconRefresh size={13} /> Generate
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
                <IconCopy size={13} /> Copy all
              </>
            )}
          </button>
        </>
      }
    >
      <div className="h-11 shrink-0 border-b border-b-edge-subtle bg-surface-2 flex items-center gap-4 px-3 text-xs text-muted">
        <label className="flex items-center gap-1.5">
          Count:
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="text-[11px] px-1.5 py-0.5 rounded border border-edge bg-surface text-foreground"
          >
            {[1, 5, 10, 20].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-1.5">
          Version:
          <select
            value={version}
            onChange={(e) => setVersion(e.target.value as Version)}
            className="text-[11px] px-1.5 py-0.5 rounded border border-edge bg-surface text-foreground"
          >
            <option value="v4">v4</option>
            <option value="v7">v7</option>
          </select>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={upper}
            onChange={(e) => setUpper(e.target.checked)}
          />
          Uppercase
        </label>
      </div>
      <div
        className={`flex-1 overflow-y-auto p-3 font-mono text-sm leading-loose ${uuids.length ? "text-foreground" : "text-subtle"}`}
      >
        {uuids.length ? uuids.join("\n") : "Click Generate to create UUIDs…"}
      </div>
    </ToolShell>
  );
}
