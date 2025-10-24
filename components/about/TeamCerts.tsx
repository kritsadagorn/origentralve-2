"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger, useGSAP as any);

export default function TeamCerts() {
  const t = useTranslations("about");
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.from("[data-ceo-left] > *", {
          y: 16,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-ceo]", start: "top 80%" },
        });
        gsap.from("[data-ceo-img]", {
          x: 24,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-ceo]", start: "top 80%" },
        });
      }, ref);
      return () => ctx.revert();
    },
    { scope: ref }
  );

  const ceoRaw = (t.raw("ceo") as any) || {};
  const ceo = {
    title: (ceoRaw.title as string) ?? t("ceo.title"),
    highlight: (ceoRaw.highlight as string) ?? "",
    quote: (ceoRaw.quote as string) ?? "",
    name: (ceoRaw.name as string) ?? "",
    position: (ceoRaw.position as string) ?? "",
    date: (ceoRaw.date as string) ?? "",
    paragraphs: (ceoRaw.paragraphs as string[]) ?? [],
    badges: (ceoRaw.badges as string[]) ?? [],
    photo: (ceoRaw.photo as string) || "/images/placeholder600x400.svg",
    photoAlt: (ceoRaw.photoAlt as string) || (ceoRaw.title as string) || "CEO",
  };

  return (
    <section
      ref={ref}
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.28] [background-image:repeating-linear-gradient(135deg,rgba(123,31,162,0.10)_0px,rgba(123,31,162,0.10)_2px,transparent_2px,transparent_12px)]" />
        <div className="absolute inset-0 opacity-[0.35] bg-dots-soft" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#7B1FA2]/10 to-transparent" />
      </div>

      <div data-ceo className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">
        {/* Left: Text */}
        <div data-ceo-left>
          {ceo.title && (
            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              {ceo.title}
            </h2>
          )}

          {ceo.highlight && (
            <p className="mt-3 text-lg font-medium text-[#7B1FA2]">
              {ceo.highlight}
            </p>
          )}

          {ceo.quote && (
            <blockquote className="mt-4 rounded-xl border border-violet-100 bg-violet-50/60 p-4 text-violet-900">
              <span className="mr-2 text-violet-500">“</span>
              {ceo.quote}
              <span className="ml-1 text-violet-500">”</span>
            </blockquote>
          )}

          {ceo.paragraphs?.length > 0 && (
            <div className="mt-4 space-y-3 text-gray-700">
              {ceo.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {(ceo.name || ceo.position) && (
            <div className="mt-5 flex flex-col gap-1 text-sm">
              <div className="font-semibold text-gray-900">
                {[ceo.name, ceo.position].filter(Boolean).join(" — ")}
              </div>
              {ceo.date && (
                <div className="text-gray-500">{ceo.date}</div>
              )}
            </div>
          )}

          {/* {ceo.badges?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {ceo.badges.map((b, i) => (
                <span
                  key={i}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm"
                >
                  {b}
                </span>
              ))}
            </div>
          )} */}
        </div>

        {/* Right: Image */}
        <div className="relative mx-auto w-full max-w-md md:max-w-none" data-ceo-img>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
            <Image
              src={ceo.photo}
              alt={ceo.photoAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
