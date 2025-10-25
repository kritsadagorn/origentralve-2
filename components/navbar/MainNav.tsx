"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";
import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";
import { usePathname, useRouter } from "next/navigation";

function useNavItems() {
  const t = useTranslations("nav");
  return [
    { href: "/about", label: t("about") },
    { href: "/programs", label: t("programs") },
    { href: "/blog", label: t("blog") },
    { href: "/case-studies", label: t("cases") },
    { href: "/contact", label: t("contact") },
  ];
}

export default function MainNav() {
  const [open, setOpen] = useState(false);
  const items = useNavItems();
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname?.split("/")[1] || "th";

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function switchLocale(next: "th" | "en") {
    if (!pathname) return;
    const segs = pathname.split("/");
    segs[1] = next; // replace locale segment
    router.push(segs.join("/"));
  }
  return (
    <nav
      aria-label="Primary"
      className="w-full border-b border-black/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center py-3">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center"
              aria-label="Origen Travel homepage"
            >
              <Image
                src="/images/logo.svg"
                alt="Origen Travel"
                width={140}
                height={40}
                priority
              />
            </Link>
          </div>

          {/* Right: Links + Controls (language at far right) */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            {/* Desktop links */}
            <ul className="hidden md:flex items-center justify-end">
              {items.map((item) => (
                <li key={item.href} className="px-3 py-3">
                  <NavLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>

            {/* Mobile menu button */}

            {/* Language selector (always shown; rightmost) */}
            <div className="">
              <LanguageSelector />
            </div>
            <button
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu-panel"
              onClick={() => setOpen(true)}
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} items={items} />
    </nav>
  );
}
