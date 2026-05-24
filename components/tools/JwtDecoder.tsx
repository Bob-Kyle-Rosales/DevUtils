"use client";

import { useState } from "react";
import { IconLock } from "@tabler/icons-react";
import ToolShell from "./ui/ToolShell";
import CopyButton from "./ui/CopyButton";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMyIsIm5hbWUiOiJKYW5lIERldiIsInJvbGUiOiJwcm8iLCJpYXQiOjE3MTY0NjA4MDAsImV4cCI6OTk5OTk5OTk5OX0.signature";

function decodeJwt(token: string) {
  if (!token.trim()) return null;
  try {
    const parts = token.split(".");
    if (parts.length < 2)
      throw new Error("Not a valid JWT (need header.payload.signature)");
    const decode = (p: string) =>
      JSON.parse(atob(p.replace(/-/g, "+").replace(/_/g, "/")));
    const header = decode(parts[0]);
    const payload = decode(parts[1]);
    const exp = payload.exp ? new Date(payload.exp * 1000) : null;
    const expired = exp ? exp < new Date() : false;
    const lines = [
      "── HEADER ──",
      JSON.stringify(header, null, 2),
      "",
      "── PAYLOAD ──",
      JSON.stringify(payload, null, 2),
      ...(exp
        ? [
            "",
            "── EXPIRY ──",
            exp.toLocaleString() + (expired ? "  ✗ EXPIRED" : "  ✓ Valid"),
          ]
        : []),
    ];
    return { out: lines.join("\n"), valid: !expired };
  } catch (e) {
    return { out: `✗ ${(e as Error).message}`, valid: false };
  }
}

export default function JwtDecoder() {
  const [input, setInput] = useState("");

  const result = decodeJwt(input);

  return (
    <ToolShell
      icon={IconLock}
      title="JWT decoder"
      actions={
        <>
          <button
            onClick={() => setInput(SAMPLE)}
            className="text-xs px-2.5 py-1 rounded-md border border-edge text-muted hover:bg-surface-2 transition-colors cursor-pointer"
          >
            Sample JWT
          </button>
          <CopyButton value={result?.out ?? null} />
        </>
      }
    >
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 border-r border-r-edge-subtle overflow-hidden">
          <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle px-3 flex items-center text-xs text-muted font-medium">
            Encoded token
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              "Paste your JWT token here…\n\neyJhbGciOiJIUzI1NiJ9..."
            }
            className="flex-1 resize-none p-3 font-mono text-[11px] leading-relaxed bg-surface text-foreground outline-none placeholder:text-subtle"
          />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="h-9 shrink-0 bg-surface-2 border-b border-b-edge-subtle px-3 flex items-center text-xs text-muted font-medium">
            Decoded
          </div>
          <div
            className={`flex-1 overflow-y-auto p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap ${
              !result
                ? "text-subtle"
                : result.valid
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-red-700 dark:text-red-400"
            }`}
          >
            {result?.out ?? "Decoded payload will appear here…"}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
