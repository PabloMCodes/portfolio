"use client";

import { useState } from "react";

type Celestial = "sun" | "moon";

// Update the document theme directly so the rest of the page stays server-rendered.
export function ThemeToggle() {
  const [celestial, setCelestial] = useState<Celestial | null>(null);

  function toggleTheme() {
    const root = document.documentElement;
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = theme;
    setCelestial(theme === "light" ? "sun" : "moon");

    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // The switch still works when browser storage is unavailable.
    }
  }

  return (
    <>
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        title="Switch between light and dark mode"
      >
        <span data-theme-label="light"><span aria-hidden="true">◐</span> Light mode</span>
        <span data-theme-label="dark"><span aria-hidden="true">◑</span> Dark mode <span>(My favorite)</span></span>
      </button>
      {celestial && (
        <div
          key={celestial}
          className="celestial-transition"
          data-celestial={celestial}
          aria-hidden="true"
          onAnimationEnd={() => setCelestial(null)}
        >
          {celestial === "sun" ? (
            <svg viewBox="0 0 100 100">
              <g className="sun-rays">
                <path d="M50 3v14M50 83v14M3 50h14M83 50h14M17 17l10 10M73 73l10 10M83 17 73 27M27 73 17 83" />
              </g>
              <circle cx="50" cy="50" r="23" />
            </svg>
          ) : (
            <svg viewBox="0 0 100 100">
              <path d="M72 72A36 36 0 1 1 43 15a30 30 0 0 0 29 57Z" />
              <circle className="moon-star" cx="76" cy="22" r="3" />
              <circle className="moon-star" cx="85" cy="36" r="1.75" />
            </svg>
          )}
        </div>
      )}
    </>
  );
}
