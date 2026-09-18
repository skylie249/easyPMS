"use client";

import { useEffect } from "react";

/**
 * The root layout hardcodes <html lang="ko"> since /en/* pages share it
 * (no [lang] route segment). This corrects the attribute client-side so
 * assistive tech and browser translation tools read the right language.
 */
export function HtmlLangSync({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "ko";
    };
  }, [lang]);
  return null;
}
