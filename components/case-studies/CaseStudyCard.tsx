"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type CaseStudyItem = {
  client: string;
  role: string;
  imageAlt: string;
  quote: string;
};

export default function CaseStudyCard({ item, index }: { item: CaseStudyItem; index: number }) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef} className="group overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src="/images/placeholder600x400.svg"
          alt={item.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 768px) 33vw, 100vw"
          priority={index < 2}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-4 sm:p-5">
        <blockquote className="text-base sm:text-lg font-medium text-gray-900">
          “{item.quote}”
        </blockquote>
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{item.client}</span>
          <span aria-hidden>•</span>
          <span>{item.role}</span>
        </div>
      </div>
    </div>
  );
}
