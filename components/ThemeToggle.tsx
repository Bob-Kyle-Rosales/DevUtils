"use client";

import { useTheme } from "./ThemeProvider";
import { IconSun, IconMoon } from "@tabler/icons-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-2 px-[14px] py-2 text-xs text-muted hover:text-foreground hover:bg-surface transition-colors cursor-pointer w-full"
    >
      {isDark ? (
        <IconMoon size={13} className="shrink-0" />
      ) : (
        <IconSun size={13} className="shrink-0" />
      )}
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}