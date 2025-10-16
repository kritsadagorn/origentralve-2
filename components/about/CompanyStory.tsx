"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger, useGSAP as any);

export default function CompanyStory() {
  const t = useTranslations("about");
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-story-title]", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-story]", start: "top 75%" },
      });
      gsap.from("[data-timeline] > li", {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-timeline]", start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const milestones = t.raw("story.milestones") as { year: string; text: string }[];

  return (
    <section ref={ref} data-story className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-8 text-center">
        <h2 data-story-title className="text-2xl font-semibold text-gray-900 sm:text-3xl">{t("story.title")}</h2>
        <p className="mt-2 text-gray-600">{t("story.desc")}</p>
      </header>
      <ol data-timeline className="relative mx-auto max-w-3xl border-l border-gray-200 pl-6">
        {milestones.map((m, i) => (
          <li key={i} className="mb-6">
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-3 w-3 -translate-x-[27px] items-center justify-center rounded-full bg-pink-600 ring-4 ring-white" />
              <div>
                <div className="text-sm font-semibold text-pink-700">{m.year}</div>
                <p className="text-gray-800">{m.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
