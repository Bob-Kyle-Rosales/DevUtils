"use client";

import { useState } from "react";
import { IconCopy, IconCheck } from "@tabler/icons-react";

export default function CopyButton({ value }: { value: string | null }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      disabled={!value}
      className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border border-edge text-muted hover:bg-surface-2 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
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
  );
}