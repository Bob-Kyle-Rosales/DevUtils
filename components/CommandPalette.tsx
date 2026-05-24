"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";
import { tools } from "@/lib/tools";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const isOpenRef = useRef(false);

  // Event handlers — calling setState here is fine (not an effect body)
  const openPalette = useCallback(() => {
    isOpenRef.current = true;
    setOpen(true);
    setQuery("");
  }, []);

  const closePalette = useCallback(() => {
    isOpenRef.current = false;
    setOpen(false);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpenRef.current) closePalette();
        else openPalette();
      }
      if (e.key === "Escape") closePalette();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openPalette, closePalette]);

  // DOM interaction only — valid useEffect usage (external system)
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function select(id: string) {
    closePalette();
    router.push(`/tools/${id}`);
  }

  const filtered = tools.filter(
    (t) =>
      !t.pro &&
      (t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.desc.toLowerCase().includes(query.toLowerCase())),
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/40"
      onClick={closePalette}
    >
      <div
        className="w-[480px] bg-surface rounded-xl border border-edge shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input row */}
        <div className="flex items-center gap-2 px-3 border-b border-edge">
          <IconSearch size={16} className="text-subtle shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools…"
            className="flex-1 py-3 text-sm bg-transparent outline-none text-foreground placeholder:text-subtle"
          />
          <kbd className="text-[10px] text-subtle border border-edge rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted text-center py-8">
              No tools found
            </p>
          ) : (
            filtered.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => select(t.id)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-surface-2 transition-colors cursor-pointer"
                >
                  <Icon size={15} className="text-subtle shrink-0" />
                  <div>
                    <div className="text-sm text-foreground">{t.name}</div>
                    <div className="text-[11px] text-muted">{t.desc}</div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
