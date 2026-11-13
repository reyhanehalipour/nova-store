import type { ThemeMode } from "@/types";

export const THEME_STORAGE_KEY = "nova-theme";
export const THEME_COOKIE_KEY = "nova-theme";
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function getStoredTheme(): ThemeMode | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(THEME_STORAGE_KEY);
  return value === "light" || value === "dark" ? value : null;
}

export function setStoredTheme(theme: ThemeMode) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  document.cookie = `${THEME_COOKIE_KEY}=${theme}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; samesite=lax`;
}

export function parseThemeCookie(value?: string | null): ThemeMode | null {
  return value === "light" || value === "dark" ? value : null;
}
