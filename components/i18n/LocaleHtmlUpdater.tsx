"use client";

import { useEffect } from "react";

export default function LocaleHtmlUpdater({ locale }: { locale: string }) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);
  return null;
}
