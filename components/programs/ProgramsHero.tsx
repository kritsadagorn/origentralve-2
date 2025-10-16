"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProgramsHero({ heading, intro }: { heading: string; intro: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const title = el.querySelector('[data-title]');
    const text = el.querySelector('[data-text]');
    const ctx = gsap.context(() => {
      gsap.fromTo(title, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
      gsap.fromTo(text, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.1 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl border border-black/10 bg-white px-5 py-10 sm:px-8 sm:py-14 shadow-sm">
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#7B1FA2]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-10 h-64 w-64 rounded-full bg-[#C2185B]/10 blur-3xl" />
      <h1 data-title className="relative text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
        {heading}
        <span className="ml-2 inline-block align-middle text-transparent bg-clip-text bg-gradient-to-r from-[#7B1FA2] to-[#C2185B]">•</span>
      </h1>
      <p data-text className="mt-3 max-w-3xl text-gray-700">{intro}</p>
    </div>
  );
}
