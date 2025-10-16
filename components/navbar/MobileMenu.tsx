"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import { createPortal } from "react-dom";

export default function MobileMenu({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: { href: string; label: string }[];
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Focus management: focus first link on open
  useEffect(() => {
    if (open) {
      setTimeout(() => firstLinkRef.current?.focus(), 0);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const overlay = (
    <div className={`fixed inset-0 z-40 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        ref={panelRef}
        className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <span className="text-base font-semibold">เมนู</span>
          <button onClick={onClose} aria-label="Close menu" className="rounded p-1 hover:bg-gray-100">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="px-2 py-2">
          {items.map((it, idx) => (
            <Link
              key={it.href}
              href={it.href}
              ref={idx === 0 ? firstLinkRef : undefined}
              className={`block rounded px-3 py-2 text-[15px] font-medium transition-all ${open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"} duration-300 text-gray-900 hover:bg-gray-50`}
              style={{ transitionDelay: open ? `${Math.min(idx * 40, 240)}ms` : "0ms" }}
              onClick={onClose}
            >
              {it.label}
            </Link>
          ))}
          <div className={`px-3 py-2 transition-all duration-300 ${open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`} style={{ transitionDelay: open ? `${Math.min(items.length * 40, 240)}ms` : "0ms" }}>
            <LanguageSelector />
          </div>
        </nav>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(overlay, document.body) : overlay;
}
