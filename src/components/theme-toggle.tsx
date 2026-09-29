"use client";

// Update the document theme directly so the rest of the page stays server-rendered.
export function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = theme;

    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // The switch still works when browser storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      title="Switch between light and dark mode"
    >
      <span data-theme-label="light"><span aria-hidden="true">◐</span> Light mode</span>
      <span data-theme-label="dark"><span aria-hidden="true">◑</span> Dark mode <span>(My favorite)</span></span>
    </button>
  );
}
