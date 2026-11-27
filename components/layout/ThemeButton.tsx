"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeButton() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem("theme") as Theme | null;
      const initial = saved === "dark" || saved === "light" ? saved : "light";
      document.documentElement.dataset.theme = initial;
      setTheme(initial);
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    const applyTheme = () => {
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem("theme", next);
      setTheme(next);
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const transition = document.startViewTransition;

    if (!reducedMotion && typeof transition === "function") {
      transition.call(document, applyTheme);
    } else {
      applyTheme();
    }
  };

  return (
    <button
      type="button"
      className="theme-button"
      onClick={toggleTheme}
      aria-label={
        mounted && theme === "light"
          ? "Switch to dark mode"
          : "Switch to light mode"
      }
      title={
        mounted && theme === "light"
          ? "Switch to dark mode"
          : "Switch to light mode"
      }
    >
      <span className="theme-button-icon" aria-hidden="true">
        {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
      </span>
    </button>
  );
}
