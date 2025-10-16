"use client";

import type { CSSProperties, PropsWithChildren } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type VariantKey = "default" | "home" | "about" | "blog" | "caseStudies" | "contact" | "programs";

type OverlayMotion = {
  xPercent?: number;
  yPercent?: number;
  rotate?: number;
  duration?: number;
  ease?: string;
  repeat?: number;
  yoyo?: boolean;
  delay?: number;
};

type OverlayConfig = {
  style: CSSProperties;
  opacity?: number;
  mixBlendMode?: CSSProperties["mixBlendMode"];
  animate?: OverlayMotion;
};

type SparkleConfig = {
  top: string;
  left: string;
  size?: string;
  delay?: number;
};

type AccentConfig = {
  gradient: string;
  blobs: Array<{ top?: string; bottom?: string; left?: string; right?: string; size: string; color: string; opacity?: number }>;
  overlays?: OverlayConfig[];
  sparkles?: SparkleConfig[];
};

const VARIANTS: Record<VariantKey, AccentConfig> = {
  default: {
    gradient: "linear-gradient(180deg, #ffffff 0%, #f1f4fa 100%)",
    blobs: [
      { top: "-6rem", right: "-4rem", size: "18rem", color: "rgba(10,37,64,0.18)" },
      { bottom: "-5rem", left: "-4rem", size: "16rem", color: "rgba(248,185,212,0.22)" },
    ],
  },
  home: {
    gradient: "linear-gradient(180deg, #ffffff 0%, #eff4fb 100%)",
    blobs: [
      { top: "-5rem", left: "-3rem", size: "16rem", color: "rgba(12,52,93,0.18)" },
      { bottom: "-6rem", right: "-4rem", size: "18rem", color: "rgba(248,185,212,0.2)" },
    ],
    overlays: [
      {
        style: {
          top: "-40%",
          left: "-15%",
          width: "130%",
          height: "70%",
          background: "linear-gradient(120deg, rgba(10,37,64,0.22) 0%, rgba(10,37,64,0) 70%)",
          transform: "rotate(-6deg)",
        },
        opacity: 0.6,
        mixBlendMode: "multiply",
        animate: { xPercent: 6, yPercent: -4, duration: 18, ease: "sine.inOut" },
      },
      {
        style: {
          bottom: "-35%",
          right: "-10%",
          width: "90%",
          height: "60%",
          background: "linear-gradient(130deg, rgba(248,185,212,0.18) 0%, rgba(248,185,212,0) 65%)",
          transform: "rotate(8deg)",
        },
        opacity: 0.7,
        mixBlendMode: "screen",
        animate: { xPercent: -5, yPercent: 4, duration: 20, ease: "sine.inOut", delay: 1.2 },
      },
    ],
    sparkles: [
      { top: "18%", left: "28%", size: "0.55rem", delay: 0.2 },
      { top: "32%", left: "62%", size: "0.65rem", delay: 0.6 },
      { top: "48%", left: "40%", size: "0.5rem", delay: 1 },
      { top: "62%", left: "68%", size: "0.7rem", delay: 1.5 },
      { top: "75%", left: "36%", size: "0.55rem", delay: 2 },
    ],
  },
  about: {
    gradient: "linear-gradient(180deg, #ffffff 0%, #f6f0f5 100%)",
    blobs: [
      { top: "-5rem", left: "-3rem", size: "16rem", color: "rgba(248,185,212,0.24)" },
      { bottom: "-5rem", right: "-3rem", size: "16rem", color: "rgba(10,37,64,0.16)" },
    ],
  },
  blog: {
    gradient: "linear-gradient(180deg, #ffffff 0%, #eef5ff 100%)",
    blobs: [
      { top: "-4rem", left: "-3rem", size: "15rem", color: "rgba(10,37,64,0.2)" },
      { bottom: "-5rem", right: "-4rem", size: "17rem", color: "rgba(248,185,212,0.18)" },
    ],
  },
  caseStudies: {
    gradient: "linear-gradient(180deg, #ffffff 0%, #f3f5fb 100%)",
    blobs: [
      { top: "-4.5rem", left: "-3rem", size: "16rem", color: "rgba(10,37,64,0.18)" },
      { bottom: "-5rem", right: "-4rem", size: "17rem", color: "rgba(248,185,212,0.18)" },
    ],
  },
  contact: {
    gradient: "linear-gradient(180deg, #ffffff 0%, #eff5fb 100%)",
    blobs: [
      { top: "-4rem", left: "-3rem", size: "16rem", color: "rgba(10,37,64,0.18)" },
      { bottom: "-5rem", right: "-4rem", size: "17rem", color: "rgba(248,185,212,0.2)" },
    ],
  },
  programs: {
    gradient: "linear-gradient(180deg, #ffffff 0%, #eff3fb 100%)",
    blobs: [
      { top: "-4rem", left: "-3rem", size: "16rem", color: "rgba(10,37,64,0.18)" },
      { bottom: "-5rem", right: "-3.5rem", size: "17rem", color: "rgba(248,185,212,0.2)" },
    ],
  },
};

type PageBackgroundProps = PropsWithChildren<{
  variant?: VariantKey;
  className?: string;
}>;

export default function PageBackground({ variant = "default", className, children }: PageBackgroundProps) {
  const scope = useRef<HTMLDivElement | null>(null);
  const config = VARIANTS[variant] ?? VARIANTS.default;

  useGSAP(
    () => {
      const blobs = gsap.utils.toArray<HTMLElement>(".js-soft-blob");
      blobs.forEach((blob, index) => {
        gsap.to(blob, {
          xPercent: index % 2 === 0 ? 3 : -3,
          yPercent: index % 2 === 0 ? -4 : 4,
          duration: 12 + index * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      const overlayNodes = gsap.utils.toArray<HTMLElement>(".js-overlay");
      const overlayTweens: Array<{ element: HTMLElement; targetOpacity: number; tween?: gsap.core.Tween }> = [];
      overlayNodes.forEach((layer, index) => {
        const cfg = config.overlays?.[index];
        if (!cfg) return;
        const targetOpacity = cfg.opacity ?? 1;
        gsap.set(layer, { opacity: 0 });
        const motion = cfg.animate;
        if (motion) {
          const tweenVars: gsap.TweenVars = {
            duration: motion.duration ?? 18,
            ease: motion.ease ?? "sine.inOut",
            repeat: motion.repeat ?? -1,
            yoyo: motion.yoyo ?? true,
            delay: motion.delay ?? 0,
            paused: true,
          };
          if (typeof motion.xPercent === "number") tweenVars.xPercent = motion.xPercent;
          if (typeof motion.yPercent === "number") tweenVars.yPercent = motion.yPercent;
          if (typeof motion.rotate === "number") tweenVars.rotate = motion.rotate;
          const tween = gsap.to(layer, tweenVars);
          overlayTweens.push({ element: layer, targetOpacity, tween });
        } else {
          overlayTweens.push({ element: layer, targetOpacity });
        }
      });

      const sparkleNodes = gsap.utils.toArray<HTMLElement>(".js-sparkle");
      const sparkleTweens: Array<{
        element: HTMLElement;
        targetOpacity: number;
        baselineOpacity: number;
        twinkle: gsap.core.Tween;
        spin: gsap.core.Tween;
      }> = [];
      sparkleNodes.forEach((sparkle, index) => {
        const cfg = config.sparkles?.[index];
        const delay = cfg?.delay ?? 0;
        const targetOpacity = 0.95;
        const baselineOpacity = targetOpacity * 0.55;
        gsap.set(sparkle, { opacity: 0, scale: 0.75 });
        const twinkle = gsap.to(sparkle, {
          opacity: targetOpacity,
          scale: 1.12,
          duration: 2.2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: true,
          delay,
        });
        const spin = gsap.to(sparkle, {
          rotate: 360,
          duration: 18 + index * 2,
          repeat: -1,
          ease: "linear",
          paused: true,
          delay,
        });
        sparkleTweens.push({ element: sparkle, targetOpacity, baselineOpacity, twinkle, spin });
      });

      if (overlayTweens.length > 0 || sparkleTweens.length > 0) {
        ScrollTrigger.create({
          trigger: scope.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            overlayTweens.forEach(({ element, targetOpacity, tween }) => {
              gsap.to(element, { opacity: targetOpacity, duration: 1, ease: "power1.out" });
              tween?.play();
            });
            sparkleTweens.forEach(({ element, baselineOpacity, twinkle, spin }) => {
              gsap.to(element, {
                opacity: baselineOpacity,
                scale: 0.9,
                duration: 0.6,
                ease: "power1.out",
                onComplete: () => {
                  twinkle.play();
                  spin.play();
                },
              });
            });
          },
        });
      }
    },
    { scope, dependencies: [variant] }
  );

  return (
    <div ref={scope} className={["relative isolate overflow-hidden", className].filter(Boolean).join(" ")}>
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0" style={{ background: config.gradient }} />
        {config.overlays?.map((overlay, index) => (
          <div
            key={`overlay-${index}`}
            className="js-overlay absolute"
            style={{
              ...overlay.style,
              opacity: overlay.opacity ?? 1,
              mixBlendMode: overlay.mixBlendMode,
            }}
          />
        ))}
        {config.blobs.map((blob, index) => (
          <div
            key={`blob-${index}`}
            className="js-soft-blob absolute rounded-full blur-3xl"
            style={{
              top: blob.top,
              bottom: blob.bottom,
              left: blob.left,
              right: blob.right,
              width: blob.size,
              height: blob.size,
              backgroundColor: blob.color,
              opacity: blob.opacity ?? 1,
            }}
          />
        ))}
        {config.sparkles?.map((sparkle, index) => (
          <div
            key={`sparkle-${index}`}
            className="js-sparkle absolute flex items-center justify-center"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              width: sparkle.size ?? "0.6rem",
              height: sparkle.size ?? "0.6rem",
              transform: "translate(-50%, -50%) rotate(45deg)",
            }}
          >
            <span className="h-full w-full rounded-[45%] bg-gradient-to-tr from-white via-rose-100 to-sky-100 shadow-sm" />
          </div>
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
