"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function TopBar() {
  const t = useTranslations("topbar");
  return (
    <div
      className="w-full bg-gradient-to-r from-[#7B1FA2] via-[#C2185B] to-[#F06292] text-white text-sm"
      role="note"
      aria-label="Service hours and contact"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 py-2 text-center">
          <span className="inline-flex items-center gap-2 font-medium">
            <PhoneIcon className="h-4 w-4 opacity-90" />
            {t("serviceCenter")} <a className="underline decoration-white/40 underline-offset-2 hover:decoration-white" href="tel:+66951474615" aria-label="โทรหา 095-147-4615">095-1474615</a>
          </span>
          <span className="hidden sm:inline-flex items-center rounded-full bg-white/25 px-3 py-1 text-[13px] font-medium shadow-sm ring-1 ring-white/30 backdrop-blur">
            {t("hours")}
          </span>
        </div>
      </div>
    </div>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.3 22 2 13.7 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
    </svg>
  );
}
