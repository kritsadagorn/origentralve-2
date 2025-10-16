"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ResultsPanel({ results }: { results: string[] }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const items = el.querySelectorAll('[data-result]');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="rounded-lg border border-black/10 bg-white p-4 sm:p-5 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Results</h3>
      <ul className="mt-3 space-y-2">
        {results.map((r, i) => (
          <li key={i} data-result className="flex items-start gap-2 text-gray-900">
            <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">✓</span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
