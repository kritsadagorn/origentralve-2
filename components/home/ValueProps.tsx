"use client";

import React from "react";
import { useTranslations } from "next-intl";

type Feature = {
  title: string;
  description: string;
  Icon: (props: { className?: string }) => React.ReactElement | null;
};

function useFeatures(t: ReturnType<typeof useTranslations>): Feature[] {
  const items = t.raw("valueProps.items") as { title: string; desc: string }[];
  const icons = [QualityIcon, TrustIcon, GlobeIcon, DiscountIcon];
  return items.map((it, idx) => ({ title: it.title, description: it.desc, Icon: icons[idx] }));
}

export default function ValueProps() {
  const t = useTranslations();
  const features = useFeatures(t);
  return (
    <section
      aria-labelledby="value-props-heading"
      className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
    >
      {/* Background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-20 h-64 w-64 rounded-full bg-gradient-to-br from-[#7B1FA2]/15 to-[#C2185B]/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-gradient-to-tr from-[#C2185B]/15 to-[#7B1FA2]/10 blur-3xl" />
        <div className="absolute inset-0 opacity-50 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>
      <header className="text-center">
        <h2 id="value-props-heading" className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          {t("valueProps.heading")}
        </h2>
      </header>

      <div
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        role="list"
        aria-label="Value propositions"
      >
        {features.map((f) => (
          <article
            key={f.title}
            className="group relative rounded-2xl border border-pink-50 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FCE7F3] via-[#F8BBD0] to-[#F48FB1] text-[#C2185B] shadow-inner ring-1 ring-white/60">
              <f.Icon className="h-7 w-7" />
            </div>
            <h3 className="text-pink-600 text-lg font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{f.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function QualityIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l2.39 4.84L20 8.27l-3.5 3.41.83 4.86L12 14.77l-4.33 1.77.83-4.86L5 8.27l5.61-1.43L12 2z" />
    </svg>
  );
}

function TrustIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l7 4v6c0 5-3.33 9-7 10-3.67-1-7-5-7-10V6l7-4zm-1 12l6-6-1.41-1.42L11 10.17 8.41 7.59 7 9l4 5z" />
    </svg>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm8 10a8 8 0 01-6.2 7.77c.74-1.3 1.2-3.73 1.2-6.77s-.46-5.47-1.2-6.77A8 8 0 0120 12zM10 4.23C9.26 5.53 8.8 7.98 8.8 11s.46 5.47 1.2 6.77A8 8 0 0112 4a8 8 0 01-2 0.23z" />
    </svg>
  );
}

function DiscountIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a5 5 0 015 5v1h1a4 4 0 110 8h-1v1a5 5 0 11-10 0v-1H6a4 4 0 110-8h1V7a5 5 0 015-5zm-2.5 11.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm5 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8 16l8-8" />
    </svg>
  );
}
