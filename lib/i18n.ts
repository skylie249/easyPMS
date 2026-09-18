export type Locale = "ko" | "en";

export const DEFAULT_LOCALE: Locale = "ko";
export const LOCALES: Locale[] = ["ko", "en"];

/** Prefix a path for the given locale ("ko" has no prefix, "en" uses "/en"). */
export function localizedPath(lang: Locale, path: string): string {
  if (lang === DEFAULT_LOCALE) return path;
  return `/en${path}`;
}
