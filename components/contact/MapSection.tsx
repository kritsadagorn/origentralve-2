"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP as any);

type Props = { query?: string; lat?: number; lng?: number; placeLabel?: string };

export default function MapSection({ query, lat, lng, placeLabel }: Props) {
  const t = useTranslations("contactPage");
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-map-card]", { y: 24, opacity: 0, duration: 0.6, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  // Build URLs from coords or query
  const q = typeof lat === "number" && typeof lng === "number"
    ? `${lat},${lng}`
    : (query ?? "Origen Travel Bangkok");
  const enc = encodeURIComponent(q);
  const mapsUrl = `https://www.google.com/maps?q=${enc}&output=embed`;
  const openUrl = `https://www.google.com/maps/search/?api=1&query=${enc}`;

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md" data-map-card>
        <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-r from-indigo-200/40 via-violet-200/40 to-blue-200/40 blur-2xl" aria-hidden />
        <div className="w-full h-56 sm:h-64 md:h-72">
          <iframe
            title="Google Map"
            src={mapsUrl}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-gray-100 px-4 py-3 text-sm">
          <div className="truncate text-gray-700">{placeLabel ?? t("heading")}</div>
          <a href={openUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 font-medium text-white hover:opacity-95">
            Open in Google Maps
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
