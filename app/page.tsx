"use client";

import { useState } from "react";
import Link from "next/link";
import { IconLayoutGrid } from "@tabler/icons-react";
import { tools } from "../lib/tools";
import type { Tool } from "../lib/tools";

const categories = [
  { id: "all", label: "All" },
  { id: "formatter", label: "Formatters" },
  { id: "encoder", label: "Encoders" },
  { id: "generator", label: "Generators" },
  { id: "tool", label: "Tools" },
  { id: "ai", label: "AI" },
];

function ToolTile({ tool }: { tool: Tool }) {
  const Icon = tool.icon;

  return (
    <div
      className={`
      bg-surface border border-edge-subtle rounded-lg p-3 
      flex flex-col gap-1 transition-colors 
      ${
        tool.pro
          ? "opacity-75 cursor-default"
          : "cursor-pointer hover:borded-brand hover:bg-surface-2"
      }`}
    >
      <Icon
        size={18}
        style={{ color: tool.pro ? "#854F0B" : "#534AB7" }}
        className="mb-0.5"
      />
      <div className="text-xs font-medium">{tool.name}</div>
      <div className="text-[11px] text-muted leading-snug">{tool.desc}</div>
      {tool.pro && (
        <span className="self-start mt-auto text-[9px] font-medium px-[5px] py-px rounded bg-[#EEEDFE] text-brand">
          Pro
        </span>
      )}
    </div>
  );
}

export default function Home() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredTools = tools.filter((t) => {
    const matchesCategory = category === "all" || t.category === category;
    const searchLower = search.toLowerCase();
    const matchesSearch =
      !searchLower ||
      t.name.toLowerCase().includes(searchLower) ||
      t.desc.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Topbar */}
      <div className="h-11 shrink-0 border-b border-b-edge-subtle flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <IconLayoutGrid size={16} className="text-subtle" />
          All tools
        </div>
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-muted">Free plan</span>
          <button className="text-[11px] px-2.5 py-1 rounded-md bg-brand text-white hover:bg-[#3C3489] transition-colors cursor-pointer">
            Upgrade to Pro
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍  Search 20+ tools…"
          className="w-full px-3 py-2 text-[13px] rounded-lg border border-edge bg-surface-2 text-foreground placeholder:text-subtle outline-none mb-3 focus:border-brand transition-colors"
        />

        <div className="flex gap-1.5 flex-wrap mb-3">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`
                text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer
                ${
                  category === c.id
                    ? "bg-brand text-white border-brand"
                    : "bg-surface border-edge-subtle text-muted hover:bg-brand hover:text-white hover:border-brand"
                }
              `}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {filteredTools.map((t) =>
            t.pro ? (
              <ToolTile key={t.id} tool={t} />
            ) : (
              <Link
                key={t.id}
                href={`/tools/${t.id}`}
                className="no-underline text-inherit"
              >
                <ToolTile tool={t} />
              </Link>
            ),
          )}
        </div>
      </div>
    </>
  );
}
