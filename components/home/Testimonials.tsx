"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP as any);

type Testimonial = {
  name: string;
  companyUrl?: string;
  avatar?: string;
  quote: string;
};

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const container = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const data: Testimonial[] = [
    {
      name: t("items.0.name"),
      companyUrl: t("items.0.url"),
      avatar: "/images/placeholder600x400.svg",
      quote: t("items.0.quote"),
    },
    {
      name: t("items.1.name"),
      companyUrl: t("items.1.url"),
      avatar: "/images/placeholder600x400.svg",
      quote: t("items.1.quote"),
    },
    {
      name: t("items.2.name"),
      companyUrl: t("items.2.url"),
      avatar: "/images/placeholder600x400.svg",
      quote: t("items.2.quote"),
    },
  ];

  const videoThumb = "/images/placeholder600x400.svg";

  useGSAP(
    () => {
      gsap.from("[data-title]", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" });
      gsap.from("[data-lead]", { y: 20, opacity: 0, duration: 0.6, delay: 0.1, ease: "power2.out" });
    },
    { scope: container }
  );

  const next = () => {
    setIndex((i) => (i + 1) % data.length);
  };
  const prev = () => {
    setIndex((i) => (i - 1 + data.length) % data.length);
  };

  // Auto-cycle every 4s; pause on hover/focus
  useEffect(() => {
    if (paused) {
      if (autoTimer.current) {
        clearInterval(autoTimer.current);
        autoTimer.current = null;
      }
      return;
    }
    autoTimer.current = setInterval(() => {
      setIndex((i) => (i + 1) % data.length);
    }, 4000);
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
      autoTimer.current = null;
    };
  }, [index, paused, data.length]);

  return (
    <section ref={container} aria-labelledby="testimonials-heading" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#7B1FA2]/10 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-[#C2185B]/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-50 to-transparent" />
      </div>
      <header className="text-center mb-8">
        <p data-lead className="text-sm font-medium text-pink-600">{t("eyebrow")}</p>
        <h2 data-title id="testimonials-heading" className="mt-2 text-2xl font-semibold sm:text-3xl text-gray-900">
          {t("heading")}
        </h2>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: Video thumbnail or highlight card */}
        <div className="rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-3">
          <div className="relative overflow-hidden rounded-2xl">
            <Image src={videoThumb} alt="Customer story video" width={960} height={540} className="w-full h-auto" />
            <button
              aria-label="Play video"
              className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-white/80 text-pink-600 backdrop-blur flex items-center justify-center shadow-lg hover:scale-105 transition"
              onClick={() => {/* hook up to lightbox later */}}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <p className="mt-4 px-2 text-lg font-semibold text-gray-900">{t("highlight")}</p>
          <div className="mt-4 flex items-center gap-3 px-2 pb-2">
            <Image src={data[0].avatar!} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
            <div className="text-sm">
              <div className="font-semibold text-gray-900">{data[0].name}</div>
              <a href={data[0].companyUrl} className="text-pink-600 hover:underline" target="_blank" rel="noreferrer">{data[0].companyUrl}</a>
            </div>
          </div>
        </div>

        {/* Right: Vertical slideshow */}
        <div
          className="relative self-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonials"
          aria-live="polite"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") {
              e.preventDefault();
              prev();
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              next();
            }
          }}
        >
          <div className="absolute -right-2 -top-2 hidden md:flex flex-col gap-2 z-50 pointer-events-auto">
            <button aria-label="Previous testimonial (Up)" onClick={prev} className="rounded-full bg-white p-2 shadow hover:shadow-md">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button aria-label="Next testimonial (Down)" onClick={next} className="rounded-full bg-white p-2 shadow hover:shadow-md">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="relative min-h-[360px] pointer-events-none">
            {data.map((item, i) => {
              const isActive = i === index;
              const prevIndex = (index - 1 + data.length) % data.length;
              const nextIndex = (index + 1) % data.length;
              const role: Role = isActive ? "active" : i === prevIndex ? "prev" : i === nextIndex ? "next" : "hidden";
              return <Card key={i} item={item} role={role} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

type Role = "active" | "prev" | "next" | "hidden";

function Card({ item, role }: { item: Testimonial; role: Role }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const common = { duration: 0.45, ease: "power2.out", yPercent: -50 } as const;
      if (role === "active") {
        gsap.to(el, { y: 0, opacity: 1, scale: 1, zIndex: 30, ...common });
      } else if (role === "prev") {
        gsap.to(el, { y: -90, opacity: 0.4, scale: 0.98, zIndex: 20, ...common });
      } else if (role === "next") {
        gsap.to(el, { y: 90, opacity: 0.4, scale: 0.98, zIndex: 20, ...common });
      } else {
        gsap.to(el, { y: 160, opacity: 0, scale: 0.98, zIndex: 10, duration: 0.3, ease: "power2.inOut", yPercent: -50 });
      }
    },
    { dependencies: [role], scope: ref }
  );

  return (
    <div
      ref={ref}
      className="absolute left-0 right-0 top-1/2 rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5 will-change-transform pointer-events-auto"
      aria-hidden={role !== "active"}
      style={{ pointerEvents: role === "active" ? "auto" : "none" }}
    >
      <div className="flex items-start gap-3">
        <Image src={item.avatar ?? "/images/placeholder600x400.svg"} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <div className="font-semibold text-gray-900">{item.name}</div>
          {item.companyUrl && (
            <a href={item.companyUrl} className="text-pink-600 hover:underline text-sm" target="_blank" rel="noreferrer">
              {item.companyUrl}
            </a>
          )}
        </div>
      </div>
      <blockquote className="mt-3 text-gray-700 leading-relaxed">“{item.quote}”</blockquote>
    </div>
  );
}
