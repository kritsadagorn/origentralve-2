"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFormatter } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export type BlogPost = {
  title: string;
  excerpt: string;
  category: "trends" | "edu" | "corp";
  date: string;
  readTime: number;
  imageAlt: string;
};

export default function BlogCard({ post, index, readLabel }: { post: BlogPost; index: number; readLabel: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const format = useFormatter();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: index * 0.05, scrollTrigger: { trigger: el, start: "top 88%" } }
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <article ref={ref} className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src="/images/placeholder600x400.svg" alt={post.imageAlt} fill className="object-cover transition-transform duration-500 hover:scale-[1.03]" />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span className="rounded bg-gray-100 px-2 py-0.5 font-medium text-gray-800">{post.category}</span>
          <span aria-hidden>•</span>
          <time dateTime={post.date}>{format.dateTime(new Date(post.date), { year: "numeric", month: "numeric", day: "numeric" })}</time>
          <span aria-hidden>•</span>
          <span>{post.readTime} {readLabel}</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-gray-900">{post.title}</h3>
        <p className="mt-1 text-gray-700">{post.excerpt}</p>
      </div>
    </article>
  );
}
