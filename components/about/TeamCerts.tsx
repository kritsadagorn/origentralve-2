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

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-team] [data-card]", {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-team]", start: "top 80%" },
      });
      gsap.from("[data-certs] img", {
        y: 16,
        opacity: 0,
        stagger: 0.06,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-certs]", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const people = t.raw("team.members") as { name: string; role: string; img: string }[];
  const certs = t.raw("certs") as { img: string; alt: string }[];

  return (
    <section ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.28] [background-image:repeating-linear-gradient(135deg,rgba(123,31,162,0.10)_0px,rgba(123,31,162,0.10)_2px,transparent_2px,transparent_12px)]" />
        <div className="absolute inset-0 opacity-[0.35] bg-dots-soft" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#7B1FA2]/10 to-transparent" />
      </div>
      <div className="relative z-10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">{t("team.title")}</h2>
        <p className="mt-2 text-gray-600">{t("team.desc")}</p>
      </div>

      <div data-team className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {people.map((p, i) => (
          <div key={i} data-card className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
            <div className="relative mb-2 aspect-[4/5] w-full overflow-hidden rounded-xl">
              <Image src={p.img} alt={p.name} fill className="object-cover" />
            </div>
            <div className="text-sm font-semibold text-gray-900">{p.name}</div>
            <div className="text-xs text-gray-600">{p.role}</div>
          </div>
        ))}
      </div>

  <div className="mt-10">
        <div className="mb-4 text-center text-sm font-semibold text-gray-900">{t("certsTitle")}</div>
        <div data-certs className="flex flex-wrap items-center justify-center gap-6 opacity-90 mb-8">
          {certs.map((c, i) => (
            <Image key={i} src={c.img} alt={c.alt} width={80} height={80} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
