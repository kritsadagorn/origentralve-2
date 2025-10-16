"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  const [hideVideo, setHideVideo] = React.useState(false);
  return (
    <section
      aria-label="Hero section"
      className="relative isolate min-h-[60vh] w-full overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#1B365D] to-[#7B1FA2] text-white sm:min-h-[70vh]"
    >
      {/* Background video */}
      {!hideVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onError={() => setHideVideo(true)}
        >
          <source src="/videos/hero_video.mp4" type="video/mp4" />
        </video>
      )}

      {/* Overlay for readability + soft animated shine */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="absolute -inset-1 bg-[radial-gradient(60%_50%_at_10%_20%,rgba(255,255,255,0.15),transparent),radial-gradient(40%_40%_at_90%_80%,rgba(255,255,255,0.12),transparent)]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-20 sm:px-6 lg:px-8 sm:py-28 text-center">
        <header>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{t("h1")}</h1>
          <h2 className="mt-3 text-2xl font-semibold sm:mt-4 sm:text-4xl">{t("h2")}</h2>
          <h3 className="mt-2 text-xl font-medium sm:text-2xl">{t("h3")}</h3>
          <p className="mt-4 max-w-3xl text-base/7 text-white/90 sm:text-lg/8">{t("p")}</p>
        </header>
      </div>
    </section>
  );
}
