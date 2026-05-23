"use client";

import type { ComponentType, ReactNode } from "react";

type Tab = {
  id: string;
  label: string;
};

export default function ToolShell({
  icon: Icon,
  title,
  actions,
  tabs,
  activeTab,
  onTabChange,
  children,
}: {
  icon: ComponentType<{ size: number; className?: string }>;
  title: string;
  actions?: ReactNode;
  tabs?: Tab[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  children: ReactNode;
}) {
  return (
    <>
      <div className="h-11 shrink-0 border-b border-b-edge-subtle flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Icon size={16} className="text-subtle" />
          {title}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {tabs && (
        <div className="flex gap-0.5 px-3 border-b border-b-edge-subtle bg-surface-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onTabChange?.(t.id)}
              className={`text-xs px-3 py-2 border-b-2 transition-colors cursor-pointer bg-transparent
                ${
                  activeTab === t.id
                    ? "text-foreground font-medium border-b-brand"
                    : "text-muted border-b-transparent hover:text-foreground"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {children}
    </>
  );
}
