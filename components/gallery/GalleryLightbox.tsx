"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  title?: string;
};

export default function GalleryLightbox({ open, onClose, images, initialIndex = 0, title }: Props) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(initialIndex);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex, open]);

  // Lock scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Open/close animation
  useEffect(() => {
    const o = overlayRef.current;
    const d = dialogRef.current;
    if (!o || !d) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      o.style.opacity = open ? "1" : "0";
      d.style.opacity = open ? "1" : "0";
      d.style.transform = open ? "translateY(0) scale(1)" : "translateY(8px) scale(0.98)";
      return;
    }
    if (open) {
      gsap.killTweensOf([o, d]);
      gsap.set(d, { y: 12, scale: 0.98, opacity: 0 });
      gsap.to(o, { opacity: 1, duration: 0.2, ease: "power2.out" });
      gsap.to(d, { y: 0, scale: 1, opacity: 1, duration: 0.28, ease: "power2.out", delay: 0.02 });
    } else {
      gsap.killTweensOf([o, d]);
      gsap.to(d, { y: 10, scale: 0.985, opacity: 0, duration: 0.2, ease: "power2.inOut" });
      gsap.to(o, { opacity: 0, duration: 0.22, ease: "power2.inOut", delay: 0.02 });
    }
  }, [open]);

  // Keyboard handling
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const total = images.length;
  const current = images[index] ?? images[0];
  const next = () => setIndex((i) => (i + 1) % Math.max(total, 1));
  const prev = () => setIndex((i) => (i - 1 + Math.max(total, 1)) % Math.max(total, 1));

  // Keep focus in sync with active thumbnail when navigating
  useEffect(() => {
    if (!open) return;
    const btn = thumbRefs.current[index];
    if (btn) {
      btn.focus({ preventScroll: true });
    }
  }, [index, open]);

  const overlay = (
    <div
      className={`fixed inset-0 z-[60] pointer-events-auto`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,37,64,0.85),rgba(0,0,0,0.7))] opacity-0"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={title ?? "Gallery"}
          className="relative w-full max-w-5xl rounded-2xl bg-white/98 shadow-2xl ring-1 ring-black/10 opacity-0"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-3 py-2 sm:px-4">
            <div className="truncate text-sm font-semibold text-gray-900">{title ?? "Gallery"}</div>
            <button onClick={onClose} aria-label="Close gallery" className="rounded p-1 hover:bg-gray-100">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main image area */}
          <div className="relative max-h-[70vh] w-full">
            <div className="relative mx-auto aspect-[16/10] max-h-[70vh] w-full">
              <Image src={current} alt="Gallery image" fill className="object-contain bg-black/2" priority />
            </div>

            {/* Prev/Next */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
              <button
                aria-label="Previous image"
                onClick={prev}
                className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-white/90 p-2 text-gray-900 shadow hover:bg-white"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
              </button>
              <button
                aria-label="Next image"
                onClick={next}
                className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-white/90 p-2 text-gray-900 shadow hover:bg-white"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="border-t border-gray-100 px-2 py-2 sm:px-3 bg-gradient-to-b from-white to-gray-50">
            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={`${img}-${i}`}
                  ref={(el) => {
                    thumbRefs.current[i] = el;
                  }}
                  onClick={() => setIndex(i)}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md ring-1 transition outline-none focus-visible:ring-2 focus-visible:ring-[#C2185B] ${
                    i === index ? "ring-[#7B1FA2] shadow" : "ring-black/10"
                  }`}
                  aria-label={`Select image ${i + 1}`}
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!open) return null;
  if (typeof document === "undefined") return null;
  return createPortal(overlay, document.body);
}
