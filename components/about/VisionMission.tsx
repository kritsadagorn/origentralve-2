"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger, useGSAP as any);

export default function VisionMission() {
  const t = useTranslations("about");
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from("[data-accent]", { opacity: 0, y: 20, duration: 0.6 });
      tl.from("[data-vision-card]", { opacity: 0, y: 24, duration: 0.6 }, "<+0.1");
      tl.from("[data-underline]", { scaleX: 0, transformOrigin: "0% 50%", duration: 0.7 }, "<");

      // Floating/parallax orbs
      gsap.utils.toArray<HTMLElement>("[data-orb]").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? 10 : -12,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        ScrollTrigger.create({
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          onUpdate: (self) => {
            gsap.to(el, { yPercent: (i % 2 === 0 ? 6 : -8) * self.progress });
          },
        });
      });

      // Mission cards stagger
      gsap.from("[data-mission-grid] [data-card]", {
        y: (i: number) => (i % 2 === 0 ? 26 : 40),
        rotate: (i: number) => (i % 2 === 0 ? -0.5 : 0.5),
        opacity: 0,
        stagger: 0.08,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-mission-grid]", start: "top 80%" },
      });

      const removeListeners: Array<() => void> = [];
      gsap.utils.toArray<HTMLElement>("[data-mission-grid] [data-card]").forEach((card) => {
        const shine = card.querySelector<HTMLElement>("[data-shine]");
        const badge = card.querySelector<HTMLElement>("[data-badge]");
        const underline = card.querySelector<HTMLElement>("[data-underline2]");
        if (!shine || !badge || !underline) return;
        gsap.set(underline, { scaleX: 0, transformOrigin: "0% 50%" });
        const onEnter = () => {
          gsap.killTweensOf([shine, badge, underline]);
          gsap.fromTo(
            shine,
            { xPercent: -120, opacity: 0 },
            { xPercent: 120, opacity: 1, duration: 0.8, ease: "power2.out" }
          );
          gsap.fromTo(badge, { y: 0, scale: 1 }, { y: -2, scale: 1.06, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 });
          gsap.to(underline, { scaleX: 1, duration: 0.5, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.killTweensOf(underline);
          gsap.to(underline, { scaleX: 0, duration: 0.35, ease: "power2.inOut" });
        };
        card.addEventListener("pointerenter", onEnter);
        card.addEventListener("pointerleave", onLeave);
        card.addEventListener("pointercancel", onLeave);
        card.addEventListener("touchend", onLeave, { passive: true });
        removeListeners.push(() => {
          card.removeEventListener("pointerenter", onEnter);
          card.removeEventListener("pointerleave", onLeave);
          card.removeEventListener("pointercancel", onLeave);
          card.removeEventListener("touchend", onLeave);
        });
      });
      return () => {
        removeListeners.forEach((fn) => fn());
      };
    },
    { scope }
  );

  const mission = (t.raw("mission.items") as string[]) ?? [];

  return (
    <section ref={scope} className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50/50">
      {/* Background accents */}
      <div data-accent className="pointer-events-none absolute -left-24 top-[-40px] h-64 w-64 rounded-full bg-gradient-to-br from-pink-300/40 to-fuchsia-300/40 blur-3xl" aria-hidden />
      <div data-accent className="pointer-events-none absolute -right-16 bottom-[-40px] h-72 w-72 rounded-full bg-gradient-to-tr from-purple-300/40 to-rose-300/40 blur-3xl" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Sticky Vision panel */}
          <div className="md:col-span-5 lg:col-span-5 md:sticky md:top-24 self-start">
            <div data-vision-card className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-fuchsia-200/60 via-pink-200/60 to-purple-200/60 blur-2xl" aria-hidden />
              <div className="relative rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm backdrop-blur">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  {t("vision.title")}
                </div>
                <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                  {t("vision.desc")}
                </h2>
                <div className="mt-4 h-1.5 w-24 origin-left rounded-full bg-gradient-to-r from-pink-600 to-fuchsia-600" data-underline />
              </div>
            </div>
          </div>

          {/* Mission grid */}
          <div className="md:col-span-7 lg:col-span-7">
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-pink-600" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-pink-700">
                {t("mission.title")}
              </h3>
            </div>

            <div data-mission-grid className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {mission.map((text, i) => (
                <div
                  key={i}
                  data-card
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* decorative orb */}
                  <div
                    data-orb
                    className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br from-pink-300/60 to-purple-300/60 blur-xl"
                    aria-hidden
                  />
                  {/* shine sweep */}
                  <div
                    data-shine
                    className="pointer-events-none absolute -inset-1 opacity-0 [mask-image:linear-gradient(115deg,transparent,rgba(255,255,255,0.8),transparent)] bg-white/50"
                    aria-hidden
                  />
                  <div className="flex items-start gap-3">
                    <span
                      data-badge
                      className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gradient-to-b from-pink-600 to-fuchsia-600 text-[11px] font-semibold text-white shadow-sm"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <p className="text-[15px] leading-7 text-gray-800">{text}</p>
                  </div>
                  <div
                    data-underline2
                    className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-pink-600 to-fuchsia-600"
                    aria-hidden
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
