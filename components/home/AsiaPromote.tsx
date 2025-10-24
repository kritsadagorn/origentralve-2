"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP as any);

type CountryKey = "jp" | "kr" | "vn" | "sg" | "my" | "cn";

// Attempt to match common id/name patterns in generic Asia SVGs
const SELECTOR_MAP: Record<CountryKey, string[]> = {
  jp: [
    "#japan",
    "#Japan",
    "#JP",
    '[data-name="Japan"]',
    'path[title="Japan"]',
    "#country-jp",
  ],
  kr: [
    "#korea",
    "#SouthKorea",
    "#KR",
    '[data-name="Korea"]',
    '[data-name="South Korea"]',
    'path[title="South Korea"]',
    "#country-kr",
  ],
  vn: [
    "#vietnam",
    "#Vietnam",
    "#VN",
    '[data-name="Vietnam"]',
    'path[title="Vietnam"]',
    "#country-vn",
  ],
  sg: [
    "#singapore",
    "#Singapore",
    "#SG",
    '[data-name="Singapore"]',
    'path[title="Singapore"]',
    "#country-sg",
  ],
  my: [
    "#malaysia",
    "#Malaysia",
    "#MY",
    '[data-name="Malaysia"]',
    'path[title="Malaysia"]',
    "#country-my",
  ],
  cn: [
    "#china",
    "#China",
    "#CN",
    '[data-name="China"]',
    'path[title="China"]',
    "#country-cn",
  ],
};

export default function AsiaPromote() {
  const t = useTranslations("asiaPromote");
  const container = useRef<HTMLDivElement | null>(null);
  const svgHost = useRef<HTMLDivElement | null>(null);
  const overlayLayer = useRef<HTMLDivElement | null>(null);
  const tooltip = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);

  // Load external SVG and inject inline to enable styling interactivity
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/images/map/asia_map.svg");
        if (!res.ok) throw new Error("SVG not found");
        const markup = await res.text();
        if (!cancelled) {
          setSvgMarkup(markup);
          setLoaded(true);
        }
      } catch (e) {
        // Fallback note will render below
        setLoaded(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      if (!loaded || !svgHost.current || !svgMarkup) return;

      // Make SVG responsive
      const svg = svgHost.current.querySelector("svg");
      if (svg) {
        // Remove fixed intrinsic sizing to avoid invalid values and allow CSS to size
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.classList.add("w-full", "h-auto");
      }

      // Dim everything by default for focus highlight
      const allRegions = svgHost.current.querySelectorAll(
        "path, polygon, polyline, rect"
      );
      gsap.set(allRegions, { fillOpacity: 0.9 });

      // Subtle background animations for decorative elements
      try {
        const prefersReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        if (!prefersReduced && container.current) {
          const floats = container.current.querySelectorAll(
            '[data-anim="float"]'
          );
          if (floats.length) {
            gsap.to(floats, {
              y: 12,
              duration: 6,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
              stagger: { each: 0.6, from: "random" },
            });
          }
          const beams = container.current.querySelectorAll(
            '[data-anim="beam"]'
          );
          if (beams.length) {
            gsap.to(beams, {
              rotate: (i) => (i % 2 === 0 ? -10 : -14),
              duration: 8,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
              stagger: { each: 1.2 },
            });
          }
        }
      } catch {}

      // Utility to find nodes for a given country via multiple selectors
      const pick = (key: CountryKey) => {
        const sels = SELECTOR_MAP[key];
        const found: Element[] = [];
        for (const s of sels)
          svgHost.current!.querySelectorAll(s).forEach((el) => found.push(el));
        return found;
      };

      const groups: Record<CountryKey, Element[]> = {
        jp: pick("jp"),
        kr: pick("kr"),
        vn: pick("vn"),
        sg: pick("sg"),
        my: pick("my"),
        cn: pick("cn"),
      };

      // Color scheme: JP pink, others orange
      const colorMap: Record<CountryKey, string> = {
        jp: "#ec4899", // pink-500
        kr: "#f97316", // orange-500
        vn: "#f97316",
        sg: "#f97316",
        my: "#f97316",
        cn: "#f97316",
      };

      const overlayPos: Record<CountryKey, { x: number; y: number }> = {
        jp: { x: 720, y: 230 },
        kr: { x: 660, y: 230 },
        vn: { x: 535, y: 370 },
        sg: { x: 520, y: 460 },
        my: { x: 570, y: 455 },
        cn: { x: 500, y: 250 },
      };

      // Apply base fills and interactivity to found nodes; collect missing for overlay
      const unsubs: Array<() => void> = [];
      const needsOverlay: CountryKey[] = [];
      (Object.keys(groups) as CountryKey[]).forEach((key) => {
        const nodes = groups[key];
        if (!nodes.length) {
          needsOverlay.push(key);
          return;
        }

        gsap.set(nodes, {
          fill: colorMap[key],
          stroke: "#111827",
          strokeOpacity: 0.12,
          strokeWidth: 1,
        });

        // Hover animations
        nodes.forEach((node) => {
          node.classList.add("cursor-pointer");
          const enter = () => {
            gsap.to(node, {
              duration: 0.25,
              ease: "power2.out",
              scale: 1.04,
              transformOrigin: "center",
            });
            showTooltip(t(`countries.${key}`));
          };
          const leave = () => {
            gsap.to(node, { duration: 0.25, ease: "power2.out", scale: 1 });
            hideTooltip();
          };
          node.addEventListener("mouseenter", enter);
          node.addEventListener("mouseleave", leave);
          node.addEventListener("focus", enter as any);
          node.addEventListener("blur", leave as any);
          unsubs.push(() => {
            node.removeEventListener("mouseenter", enter);
            node.removeEventListener("mouseleave", leave);
            node.removeEventListener("focus", enter as any);
            node.removeEventListener("blur", leave as any);
          });
        });
      });

      // Overlay markers for countries we couldn't select inside the SVG
      const createdOverlays: HTMLElement[] = [];
      const placeOverlays = () => {
        if (!overlayLayer.current) return;
        // Clear existing overlays
        createdOverlays.forEach((el) => el.remove());
        createdOverlays.length = 0;
        const svgEl = svgHost.current?.querySelector("svg");
        const svgBox = svgEl?.getBoundingClientRect();
        const hostBox = svgHost.current?.getBoundingClientRect();
        if (!svgEl || !svgBox || !hostBox) return;

        const vb = svgEl.viewBox.baseVal;
        const scaleX = svgBox.width / vb.width;
        const scaleY = svgBox.height / vb.height;
        // Position overlays relative to svgHost (the overlayLayer's containing block)
        const offsetX = svgBox.left - hostBox.left;
        const offsetY = svgBox.top - hostBox.top;

        needsOverlay.forEach((key) => {
          const pos = overlayPos[key];
          const px = pos.x * scaleX + offsetX;
          const py = pos.y * scaleY + offsetY;

          const dot = document.createElement("div");
          dot.className = "absolute -translate-x-1/2 -translate-y-1/2";
          dot.style.left = `${px}px`;
          dot.style.top = `${py}px`;
          dot.style.pointerEvents = "auto";
          dot.innerHTML = `
            <div class="relative">
              <span class="block h-3 w-3 rounded-full shadow-md outline-2 outline-white" style="background:${colorMap[key]}"></span>
              <span class="pointer-events-none absolute -inset-3 rounded-full" style="background: radial-gradient(${colorMap[key]}33, transparent)"></span>
            </div>
          `;

          const enter = () => {
            showTooltip(t(`countries.${key}`));
            gsap.fromTo(
              dot,
              { scale: 1 },
              { scale: 1.15, duration: 0.25, ease: "power2.out" }
            );
          };
          const leave = () => {
            hideTooltip();
            gsap.to(dot, { scale: 1, duration: 0.2 });
          };
          dot.addEventListener("mouseenter", enter);
          dot.addEventListener("mouseleave", leave);
          dot.addEventListener("focus", enter as any);
          dot.addEventListener("blur", leave as any);
          unsubs.push(() => {
            dot.removeEventListener("mouseenter", enter);
            dot.removeEventListener("mouseleave", leave);
            dot.removeEventListener("focus", enter as any);
            dot.removeEventListener("blur", leave as any);
          });

          overlayLayer.current!.appendChild(dot);
          createdOverlays.push(dot);
        });
      };

      // Place overlays initially and on resize (debounced)
      placeOverlays();
      const onResize = () => placeOverlays();
      window.addEventListener("resize", onResize);

      function showTooltip(text: string) {
        if (!tooltip.current || !svgHost.current) return;
        const content =
          tooltip.current.querySelector<HTMLSpanElement>(".tooltip-content");
        if (content) content.textContent = text;
        gsap.set(tooltip.current, { autoAlpha: 1 });
      }
      function hideTooltip() {
        if (!tooltip.current) return;
        gsap.to(tooltip.current, { autoAlpha: 0, duration: 0.2 });
      }

      // Track mouse for tooltip (positioned slightly above-left of the cursor)
      const onMove = (e: MouseEvent) => {
        const tip = tooltip.current;
        if (!tip) return;
        const { clientX, clientY } = e;
        // Anchor to tooltip's positioned parent (the map frame)
        const anchor = tip.parentElement as HTMLElement | null;
        const b = anchor?.getBoundingClientRect();
        if (!b) return;
        // Measure tooltip size for accurate offset
        const r = tip.getBoundingClientRect();
        const gap = 10;
        // Place top-left of tooltip a bit above-left of the cursor
        let x = clientX - b.left - r.width - gap;
        let y = clientY - b.top - r.height - gap;
        // Clamp inside the frame
        x = Math.max(0, Math.min(x, b.width - r.width));
        y = Math.max(0, Math.min(y, b.height - r.height));
        gsap.to(tip, { x, y, duration: 0.1, ease: "power2.out" });
      };
      svgHost.current.addEventListener("mousemove", onMove);

      return () => {
        svgHost.current?.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        unsubs.forEach((fn) => fn());
      };
    },
    { scope: container, dependencies: [loaded, svgMarkup] }
  );

  return (
    <section
      ref={container}
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Floating gradient blobs */}
        <div data-anim="float" className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#7B1FA2]/12 blur-3xl" />
        <div data-anim="float" className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-[#C2185B]/12 blur-3xl" />
        <div data-anim="float" className="absolute top-1/3 left-[-6rem] h-52 w-52 rounded-full bg-pink-500/10 blur-3xl" />

        {/* Soft beams */}
        <div data-anim="beam" className="absolute left-[8%] top-[18%] h-40 w-[600px] -rotate-12 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-transparent blur-2xl" />
        <div data-anim="beam" className="absolute right-[6%] bottom-[12%] h-36 w-[520px] -rotate-6 bg-gradient-to-l from-amber-400/10 via-orange-500/10 to-transparent blur-2xl" />

        {/* Dotted grid with radial mask */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.25] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" role="presentation">
          <defs>
            <pattern id="dots-pattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" className="fill-gray-300" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-pattern)" />
        </svg>

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.06),transparent_60%)]" />
      </div>

      <header className="mb-8 text-center">
        <p className="text-sm font-medium text-pink-600">{t("eyebrow")}</p>
        <h2 className="mt-2 text-2xl font-semibold sm:text-3xl text-gray-900">
          {t("heading")}
        </h2>
        <p className="mt-2 text-gray-600">{t("tagline")}</p>
      </header>

      <div className="relative">
        {/* Map frame */}
        <div className="mx-auto w-full max-w-3xl md:max-w-3xl lg:max-w-4xl relative overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <div ref={svgHost} className="relative w-full">
            {!svgMarkup && (
              <div className="aspect-[16/9] flex items-center justify-center text-sm text-gray-500 p-6">
                <div>
                  <div className="font-semibold text-gray-800">
                    {t("fallback.title")}
                  </div>
                  <div className="mt-1">{t("fallback.desc")}</div>
                  <div className="mt-1">/public/images/map/asia_map.svg</div>
                </div>
              </div>
            )}
            {svgMarkup && (
              <div
                className="w-full h-auto aspect-[16/9]"
                dangerouslySetInnerHTML={{ __html: svgMarkup }}
              />
            )}
            {/* Overlay interactive markers (fallback when SVG lacks per-country paths) */}
            <div ref={overlayLayer} className="absolute inset-0" />
          </div>

          {/* Floating tooltip */}
          <div
            ref={tooltip}
            className="pointer-events-none absolute left-0 top-0 z-50 hidden sm:block"
          >
            <div className="rounded-md bg-gray-900/90 px-2 py-1 text-xs text-white shadow-md will-change-transform">
              <span className="tooltip-content" />
            </div>
          </div>
        </div>

        {/* Legend */}
        {/* <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
          <LegendItem color="#ec4899" label={t("legend.jp")} />
          <LegendItem
            color="#f97316"
            label={
              t("legend.others") +
              ": " +
              [
                t("countries.kr"),
                t("countries.vn"),
                t("countries.sg"),
                t("countries.my"),
                t("countries.cn"),
              ].join(", ")
            }
          />
        </div> */}
      </div>
    </section>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
      <span className="text-gray-700">{label}</span>
    </div>
  );
}
