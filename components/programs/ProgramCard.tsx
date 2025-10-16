"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export type ProgramItem = {
  key: string;
  title: string;
  desc: string;
  duration?: string;
  bestFor?: string;
  destinations?: string;
  highlights?: string[];
};

export default function ProgramCard({ item, index }: { item: ProgramItem; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const t = useTranslations("programsPage.labels");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: index * 0.05, scrollTrigger: { trigger: el, start: "top 88%" } }
      );
    });
    return () => ctx.revert();
  }, [index]);

  // Simple hover tilt via CSS transforms affected by mouse position
  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
  }
  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative rounded-xl border border-black/10 bg-white p-5 shadow-sm transition-transform will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 rounded-xl bg-[radial-gradient(100px_50px_at_var(--x,50%)_-20%,rgba(123,31,162,0.15),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-1 ring-black/10">
          <Image src="/images/placeholder600x400.svg" alt={item.title} fill className="object-cover" sizes="64px" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          <p className="mt-1 text-gray-700">{item.desc}</p>
          <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-700">
            {item.duration && (
              <div><span className="font-medium text-gray-900">{t("duration")}:</span> {item.duration}</div>
            )}
            {item.bestFor && (
              <div><span className="font-medium text-gray-900">{t("bestFor")}:</span> {item.bestFor}</div>
            )}
            {item.destinations && (
              <div><span className="font-medium text-gray-900">{t("destinations")}:</span> {item.destinations}</div>
            )}
          </div>
          {item.highlights && item.highlights.length > 0 && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-1 rounded-md border border-black/10 px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                {open ? t("less") : t("more")}
                <svg className={`h-4 w-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-[max-height,opacity] duration-300 ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <ul className="mt-2 space-y-2">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-900">
                      <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7B1FA2]/10 text-[#7B1FA2] ring-1 ring-[#7B1FA2]/20">★</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
