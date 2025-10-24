"use client";

import React, { useEffect, useRef } from "react";

// We'll dynamically import amCharts to avoid SSR issues
// and only run in the browser.

const HEADING = "We Specialist Asia & The Best Japan";
const TAGLINE = "ทุกที่ ทุกความต้องการในเอเชีย ไว้ใจเรา";

// ISO A2 codes for target countries
const TARGETS = {
  JP: { color: "#ec4899", label: "Japan" }, // pink
  KR: { color: "#f97316", label: "South Korea" }, // orange
  VN: { color: "#f97316", label: "Vietnam" },
  SG: { color: "#f97316", label: "Singapore" },
  MY: { color: "#f97316", label: "Malaysia" },
  CN: { color: "#f97316", label: "China" },
} as const;

type Iso2 = keyof typeof TARGETS;

export default function AsiaPromote2() {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let root: any;
    let cleanup: (() => void) | undefined;

    (async () => {
      const el = chartRef.current;
      if (!el || !(el instanceof HTMLElement)) return;

      // In dev/route transitions, ensure previous root tied to this element is disposed
      try {
        const maybeAm5 = (await import("@amcharts/amcharts5")) as any;
        // Dispose any root that still references this element
        const registry = maybeAm5?.registry?.rootElements as any[] | undefined;
        if (registry && Array.isArray(registry)) {
          registry
            .filter((r: any) => r && r.dom === el)
            .forEach((r: any) => {
              try { r.dispose(); } catch {}
            });
        }
      } catch {}

      // Cancel any pending frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      // Defer creation so element has computed styles and is connected
      await new Promise<void>((resolve) => {
        rafRef.current = requestAnimationFrame(() => resolve());
      });
      if (!el.isConnected) return;

      // Dynamic imports (client-side only)
      const am5 = await import("@amcharts/amcharts5");
      const am5map = await import("@amcharts/amcharts5/map");
      const am5themes_Animated = await import("@amcharts/amcharts5/themes/Animated");
  // Use world geodata and zoom to our region; asiaLow may not exist in v5 package
  const geodata = await import("@amcharts/amcharts5-geodata/worldLow");

      // Root + theme
      // Dispose existing root if ref holds one
      if (rootRef.current) {
        try { rootRef.current.dispose(); } catch {}
        rootRef.current = null;
      }
      root = am5.Root.new(el);
      rootRef.current = root;
      root.setThemes([am5themes_Animated.default.new(root)]);

      // Chart
      const chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: "none",
          panY: "none",
          wheelX: "none",
          wheelY: "none",
          projection: am5map.geoMercator(),
        })
      );

      // Series for world (we'll zoom to our target region after load)
      const polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: geodata.default as any,
          // We'll show all Asia features
          valueField: "value",
          calculateAggregates: true,
          exclude: ["AQ"],
        })
      );

      // Default styles
      polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        interactive: true,
        strokeOpacity: 0.5,
        stroke: am5.color(0x111827),
        fillOpacity: 0.9,
        fill: am5.color(0xd1d5db), // gray-300 for other countries (slightly darker)
      });

      // Create a styled tooltip (rounded, shadow, nice typography)
      const tooltip: any = (am5 as any).Tooltip.new(root, {
        pointerOrientation: "down",
        getFillFromSprite: false,
        getStrokeFromSprite: false,
        animationDuration: 120,
      });
      const bg: any = tooltip.get("background") as any;
      if (bg) {
        bg.setAll({
          fill: (am5 as any).color(0xffffff), // white bg to match site tone
          fillOpacity: 1,
          stroke: (am5 as any).color(0xe5e7eb), // gray-200 border
          strokeOpacity: 1,
          cornerRadius: 10 as any,
        } as any);
        bg.filters?.push(
          (am5 as any).DropShadowFilter.new(root, {
            color: (am5 as any).color(0x000000),
            opacity: 0.16,
            blur: 14,
            offsetX: 0,
            offsetY: 6,
          })
        );
      }
      (tooltip.label as any).setAll({
        populateText: true,
        textAlign: "left",
        paddingTop: 8,
        paddingRight: 10,
        paddingBottom: 8,
        paddingLeft: 10,
        fontSize: 14,
        lineHeight: 1.25,
        fill: (am5 as any).color(0x111827), // gray-900 text
      });

      polygonSeries.mapPolygons.template.set("tooltip", tooltip);

      // Hover behavior: move slightly upward instead of shifting right
      polygonSeries.mapPolygons.template.states.create("hover", {
        dx: 0,
        dy: -3, // subtle upward nudge
        strokeOpacity: 0.3,
        // remove scale to avoid perceived lateral shift on hover
        scale: 1,
      });

      // Apply target colors
      polygonSeries.mapPolygons.template.adapters.add("fill", (fill: any, target: any) => {
        const dataItem = target.dataItem as any;
        const id: string | undefined = dataItem?.get("id");
        if (id && (TARGETS as any)[id as Iso2]) {
          return am5.color((TARGETS as any)[id as Iso2].color);
        }
        return fill;
      });

      // Make only target countries fully interactive; others subtle
      polygonSeries.mapPolygons.template.adapters.add(
        "interactive",
        (interactive: any, target: any) => {
          const id: string | undefined = (target.dataItem as any)?.get("id");
          return !!(id && (TARGETS as any)[id as Iso2]);
        }
      );

      // Keep tooltip content simple: show only the country name
      // Default tooltipText is already set to "{name}" above, so no adapter needed.

      // Opacity selection on hover: dim others when hovering a target, restore on out
      const dimOthers = (except?: any) => {
        polygonSeries.mapPolygons.each((p: any) => {
          p.set("fillOpacity", p === except ? 1 : 0.3);
        });
      };
      const resetOpacity = () => {
        polygonSeries.mapPolygons.each((p: any) => {
          const id: string | undefined = p.dataItem?.get("id");
          // Targets slightly higher base opacity than non-targets
          p.set("fillOpacity", id && (TARGETS as any)[id as Iso2] ? 0.95 : 0.85);
        });
      };

      // Initial opacity setup
      resetOpacity();

      polygonSeries.mapPolygons.template.events.on("pointerover", (ev: any) => {
        const id: string | undefined = ev.target.dataItem?.get("id");
        if (id && (TARGETS as any)[id as Iso2]) {
          dimOthers(ev.target);
        }
      });
      polygonSeries.mapPolygons.template.events.on("pointerout", () => {
        resetOpacity();
      });

      // Asia-focused initial view (avoid relying on bounds to prevent runtime errors)
      polygonSeries.events.on("datavalidated", () => {
        try {
          chart.set("homeGeoPoint", { longitude: 110, latitude: 23 });
          chart.set("homeZoomLevel", 2.5);
          chart.goHome(0);
        } catch {}
      });

      cleanup = () => {
        try { rootRef.current?.dispose(); } catch {}
        rootRef.current = null;
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      };
    })();

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-6 text-center">
        <p className="text-sm font-medium text-pink-600">We Specialist Asia</p>
        <h2 className="mt-2 text-2xl font-semibold sm:text-3xl text-gray-900">
          {HEADING}
        </h2>
        <p className="mt-2 text-gray-600">{TAGLINE}</p>
      </header>

      {/* Card frame */}
      <div className="mx-auto w-full max-w-3xl md:max-w-3xl lg:max-w-4xl relative overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
        {/* Map container */}
        <div className="aspect-[16/9] w-full" ref={chartRef} />

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-3 text-sm">
          <LegendItem color="#ec4899" label="Japan" />
          <LegendItem
            color="#f97316"
            label={"Korea, Vietnam, Singapore, Malaysia, China"}
          />
        </div>
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
