/*
 * The light / dark choice. Dark is the brand default; the choice is
 * remembered, and the head script (theme-init) applies it before first paint
 * so the wrong theme never flashes. "system" follows the OS.
 */
const key = "theme";

export type Theme = "light" | "dark" | "system";

/** Sets the theme, remembers it, and returns whether the page ended up dark. */
export function applyTheme(theme: Theme): boolean {
  const dark =
    theme === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches : theme === "dark";
  document.documentElement.classList.toggle("dark", dark);
  try {
    if (theme === "system") localStorage.removeItem(key);
    else localStorage.setItem(key, theme);
  } catch {
    // Private modes can refuse storage; the choice just won't persist.
  }
  return dark;
}
