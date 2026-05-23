"use client";

import { useState, useEffect } from "react";
import { IconHash, IconCopy, IconCheck } from "@tabler/icons-react";
import ToolShell from "./ui/ToolShell";

const ALGOS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

async function hashAll(text: string) {
  const enc = new TextEncoder().encode(text);
  return Promise.all(
    ALGOS.map(async (algo) => {
      const buf = await crypto.subtle.digest(algo, enc);
      const hash = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      return { algo, hash };
    }),
  );
}

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<{ algo: string; hash: string }[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!input) {
      return;
    }
    hashAll(input).then(setHashes);
  }, [input]);

  const displayedHashes = input ? hashes : [];

  async function copy(hash: string) {
    await navigator.clipboard.writeText(hash);
    setCopied(hash);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <ToolShell icon={IconHash} title="Hash generator">
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle px-3 flex items-center text-xs text-muted font-medium">
          Input text
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text to hash…"
          style={{ maxHeight: 120 }}
          className="resize-none p-3 font-mono text-xs leading-relaxed bg-surface text-foreground outline-none placeholder:text-subtle border-b border-b-edge-subtle"
        />
        <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle px-3 flex items-center text-xs text-muted font-medium">
          Hashes
        </div>
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
          {displayedHashes.length === 0 ? (
            <p className="text-xs text-subtle">
              Type something above to generate hashes…
            </p>
          ) : (
            displayedHashes.map(({ algo, hash }) => (
              <div
                key={algo}
                className="bg-surface-2 border border-edge-subtle rounded-lg p-3 flex items-start justify-between gap-2"
              >
                <div>
                  <div className="text-[10px] text-subtle mb-1">{algo}</div>
                  <div className="font-mono text-[11px] break-all">{hash}</div>
                </div>
                <button
                  onClick={() => copy(hash)}
                  className="shrink-0 flex items-center gap-1 text-[11px] px-2 py-0.5 rounded border border-edge-subtle bg-surface text-muted hover:bg-surface-2 cursor-pointer mt-0.5"
                >
                  {copied === hash ? (
                    <IconCheck size={11} className="text-emerald-500" />
                  ) : (
                    <IconCopy size={11} />
                  )}
                  Copy
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </ToolShell>
  );
}
