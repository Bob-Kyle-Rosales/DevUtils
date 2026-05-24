"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: "light", setTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("theme") as Theme | null;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return saved ?? (systemDark ? "dark" : "light");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Sync DOM class with the initial theme after mount
  useEffect(() => {
    applyTheme(theme);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setTheme(t: Theme) {
    setThemeState(t);
    applyTheme(t);
    localStorage.setItem("theme", t);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function applyTheme(t: Theme) {
  document.documentElement.classList.toggle("dark", t === "dark");
}
