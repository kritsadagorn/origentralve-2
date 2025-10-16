"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GalleryLightbox from "../gallery/GalleryLightbox";

gsap.registerPlugin(ScrollTrigger);

type Item = {
  title: string;
  desc: string;
  img: string;
  span?: string; // desktop/tablet span classes (e.g., md:col-span-2)
  mobileSpan?: string; // mobile-only varied layout (e.g., col-span-2 row-span-2)
  hideOnMobile?: boolean; // hide item on mobile-only
};

export default function Showcase() {
  const t = useTranslations("showcase");
  const locale = useLocale();
  const container = useRef<HTMLDivElement | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [lightboxTitle, setLightboxTitle] = useState<string>("");

  // Predefined galleries per activity
  const GALLERY_VALORANT = [
    "/images/Gallery/Valorant-Champion-Seoul-2024-20251013T061045Z-1-001/Valorant Champion Seoul 2024/ValorantChampion1.jpg",
    "/images/Gallery/Valorant-Champion-Seoul-2024-20251013T061045Z-1-001/Valorant Champion Seoul 2024/ValorantChampion2.jpg",
    "/images/Gallery/Valorant-Champion-Seoul-2024-20251013T061045Z-1-001/Valorant Champion Seoul 2024/ValorantChampion3.jpg",
    "/images/Gallery/Valorant-Champion-Seoul-2024-20251013T061045Z-1-001/Valorant Champion Seoul 2024/ValorantChampion4.jpg",
    "/images/Gallery/Valorant-Champion-Seoul-2024-20251013T061045Z-1-001/Valorant Champion Seoul 2024/ValorantChampion5.jpg",
    "/images/Gallery/Valorant-Champion-Seoul-2024-20251013T061045Z-1-001/Valorant Champion Seoul 2024/ValorantChampion6.jpg",
    "/images/Gallery/Valorant-Champion-Seoul-2024-20251013T061045Z-1-001/Valorant Champion Seoul 2024/ValorantChampion7.jpg",
    "/images/Gallery/Valorant-Champion-Seoul-2024-20251013T061045Z-1-001/Valorant Champion Seoul 2024/ValorantChampion8.jpg",
  ];
  const GALLERY_ESPORT = [
    "/images/Gallery/EsportGroup-20251013T061015Z-1-001/22-28 ก.ค. 68 กรุ๊ปอีสปอร์ต/IMG_9042.JPG",
    "/images/Gallery/EsportGroup-20251013T061015Z-1-001/22-28 ก.ค. 68 กรุ๊ปอีสปอร์ต/IMG_9043.JPG",
    "/images/Gallery/EsportGroup-20251013T061015Z-1-001/22-28 ก.ค. 68 กรุ๊ปอีสปอร์ต/IMG_9044.JPG",
    "/images/Gallery/EsportGroup-20251013T061015Z-1-001/22-28 ก.ค. 68 กรุ๊ปอีสปอร์ต/IMG_9051.JPG",
    "/images/Gallery/EsportGroup-20251013T061015Z-1-001/22-28 ก.ค. 68 กรุ๊ปอีสปอร์ต/IMG_9062.JPG",
    "/images/Gallery/EsportGroup-20251013T061015Z-1-001/22-28 ก.ค. 68 กรุ๊ปอีสปอร์ต/IMG_9063.JPG",
    "/images/Gallery/EsportGroup-20251013T061015Z-1-001/22-28 ก.ค. 68 กรุ๊ปอีสปอร์ต/IMG_9068.JPG",
    "/images/Gallery/EsportGroup-20251013T061015Z-1-001/22-28 ก.ค. 68 กรุ๊ปอีสปอร์ต/IMG_9069.JPG",
    "/images/Gallery/EsportGroup-20251013T061015Z-1-001/22-28 ก.ค. 68 กรุ๊ปอีสปอร์ต/IMG_9070.JPG",
    "/images/Gallery/EsportGroup-20251013T061015Z-1-001/22-28 ก.ค. 68 กรุ๊ปอีสปอร์ต/IMG_9071.JPG",
    "/images/Gallery/EsportGroup-20251013T061015Z-1-001/22-28 ก.ค. 68 กรุ๊ปอีสปอร์ต/IMG_9072.JPG",
    "/images/Gallery/EsportGroup-20251013T061015Z-1-001/22-28 ก.ค. 68 กรุ๊ปอีสปอร์ต/IMG_9073.JPG",
  ];
  const GALLERY_ALTF4 = [
    "/images/Gallery/Altf4-20251013T061027Z-1-001/Altf4/S__9076786_0.jpg",
    "/images/Gallery/Altf4-20251013T061027Z-1-001/Altf4/S__9076796_0.jpg",
    "/images/Gallery/Altf4-20251013T061027Z-1-001/Altf4/S__9076797_0.jpg",
    "/images/Gallery/Altf4-20251013T061027Z-1-001/Altf4/S__9076799_0.jpg",
  ];
  const GALLERY_PRIVATE = [
    "/images/Gallery/Private Group-20251013T061035Z-1-001/Private Group/475658257_122155586648331823_2293302248988823377_n.jpg",
    "/images/Gallery/Private Group-20251013T061035Z-1-001/Private Group/475769734_122155586756331823_1683226038266299041_n.jpg",
    "/images/Gallery/Private Group-20251013T061035Z-1-001/Private Group/475775446_122155586552331823_536855441015572591_n.jpg",
    "/images/Gallery/Private Group-20251013T061035Z-1-001/Private Group/475775749_122155586714331823_4918817463599037505_n.jpg",
    "/images/Gallery/Private Group-20251013T061035Z-1-001/Private Group/475778494_122155586624331823_8797575847246142336_n.jpg",
    "/images/Gallery/Private Group-20251013T061035Z-1-001/Private Group/476231446_122155586528331823_6296515145601245720_n.jpg",
  ];
  const PLACEHOLDER = ["/images/placeholder600x400.svg"]; 

  // Format date text per locale (Thai phrase by default)
  function formatDateText(isoLike: string) {
    // input like "2025/10/13" -> Date
    const [y, m, d] = isoLike.split("/").map((v) => parseInt(v, 10));
    const date = new Date(y, m - 1, d);
    const thMonths = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    if (locale === "th") {
      const buddhistYear = (date.getFullYear() + 543).toString();
      const text = `เมื่อวันที่ ${date.getDate()} ${thMonths[date.getMonth()]} ${buddhistYear}`;
      return text;
    }
    // English fallback: On 13 October 2025
    const enMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return `On ${date.getDate()} ${enMonths[date.getMonth()]} ${date.getFullYear()}`;
  }
  const dateDisplay = formatDateText("2025/10/13");

  const items: Item[] = [
    {
      title: "Valorant Champion Seoul 2024",
      desc: dateDisplay,
      img: GALLERY_VALORANT[0],
      span: "md:col-span-2",
      mobileSpan: "col-span-2 row-span-2 md:col-span-1 md:row-span-1",
    },
    {
      title: "Altf4",
      desc: dateDisplay,
      img: GALLERY_ALTF4[0],
      span: "",
      mobileSpan: "row-span-1 md:row-span-1",
    },
    {
      title: "Esport Group",
      desc: dateDisplay,
      img: GALLERY_ESPORT[0],
      span: "",
      mobileSpan: "row-span-2 md:row-span-1",
    },
    {
      title: "Private Group",
      desc: dateDisplay,
      img: GALLERY_PRIVATE[0],
      span: "",
      mobileSpan: "row-span-1 md:row-span-1",
    },
    {
      title: "More Coming Soon",
      desc: "",
      img: "/images/placeholder600x400.svg",
      span: "",
      mobileSpan: "col-span-2 row-span-1 md:col-span-1 md:row-span-1",
      hideOnMobile: true,
    },
  ];

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLDivElement>("[data-card]");
    const removeListeners: Array<() => void> = [];

    // Respect reduced motion
    const reduceMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Initial state for reveal
    gsap.set(cards, { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 24 });
    const allImgs = cards.map((c) => c.querySelector("img")).filter(Boolean) as HTMLElement[];
    if (!reduceMotion) gsap.set(allImgs, { scale: 1.06 });

    if (!reduceMotion) {
      // Batch reveal for smoother, consistent behavior
      ScrollTrigger.batch(cards, {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: { each: 0.08 } });
          const imgs = (batch as HTMLElement[]).map((el) => el.querySelector("img")).filter(Boolean) as HTMLElement[];
          if (imgs.length) gsap.to(imgs, { scale: 1, duration: 0.8, ease: "power2.out", stagger: { each: 0.06 } });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, { opacity: 0, y: 24, duration: 0.4, ease: "power2.inOut", stagger: { each: 0.05 } });
          const imgs = (batch as HTMLElement[]).map((el) => el.querySelector("img")).filter(Boolean) as HTMLElement[];
          if (imgs.length) gsap.to(imgs, { scale: 1.06, duration: 0.4, ease: "power2.inOut" });
        },
      });
    }

    // Hover interactions (desktop)
    cards.forEach((card) => {
      const image = card.querySelector("img") as HTMLElement | null;
      const overlay = card.querySelector("[data-overlay]") as HTMLElement | null;
      const onEnter = () => {
        if (image) gsap.to(image, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        if (overlay) gsap.to(overlay, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" });
      };
      const onLeave = () => {
        if (image) gsap.to(image, { scale: 1, duration: 0.35, ease: "power2.out" });
        if (overlay) gsap.to(overlay, { opacity: 0, y: 8, duration: 0.25, ease: "power2.out" });
      };
      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointerleave", onLeave);
      removeListeners.push(() => {
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => {
      removeListeners.forEach((fn) => fn());
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, { scope: container });

  const galleriesByIndex: string[][] = [
    GALLERY_VALORANT,
    GALLERY_ALTF4,
    GALLERY_ESPORT,
    GALLERY_PRIVATE,
    PLACEHOLDER,
  ];

  return (
    <section aria-labelledby="showcase-heading" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-10 h-64 w-64 rounded-full bg-gradient-to-br from-[#7B1FA2]/15 to-[#C2185B]/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-gradient-to-tr from-[#C2185B]/15 to-[#7B1FA2]/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_20%_20%,rgba(123,31,162,0.05),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(194,24,91,0.05),transparent_45%)]" />
      </div>
      <header className="mb-8 text-center">
        <h2 id="showcase-heading" className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          {t("heading")}
        </h2>
        <p className="mt-2 text-gray-600">{t("subheading")}</p>
      </header>

      {/* Mobile: 2-col staggered grid with varied row/col spans; Desktop: equal-height rows */}
      <div
        ref={container}
        className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[260px]"
      >
        {items.map((it, idx) => (
          <article
            key={idx}
            data-card
            className={`group relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white/95 shadow-md ${
              it.mobileSpan ?? ""
            } ${it.span ?? ""} ${it.hideOnMobile ? "hidden md:block" : ""}`}
            role="button"
            tabIndex={0}
            onClick={() => { setGalleryImages(galleriesByIndex[idx] ?? PLACEHOLDER); setLightboxIndex(0); setLightboxTitle(`${it.title}${it.desc ? ` — ${it.desc}` : ""}`); setLightboxOpen(true); }}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setGalleryImages(galleriesByIndex[idx] ?? PLACEHOLDER); setLightboxIndex(0); setLightboxTitle(`${it.title}${it.desc ? ` — ${it.desc}` : ""}`); setLightboxOpen(true); } }}
          >
            <div className="absolute inset-0">
              <Image src={it.img} alt="" fill className="object-cover transition-transform duration-300 will-change-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" aria-hidden />
            </div>
            <div data-overlay className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 sm:p-4 opacity-0 transition-opacity">
              <h3 className="text-white drop-shadow-md text-lg font-semibold">{it.title}</h3>
              <p className="mt-1 text-sm text-white/90 drop-shadow">{it.desc}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={galleryImages}
        initialIndex={lightboxIndex}
        title={lightboxTitle || "Gallery"}
      />
    </section>
  );
}
