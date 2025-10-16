"use client";

import React from "react";
import ReactDOM from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

type Option = { code: "th" | "en"; label: string; Flag: (props: { className?: string }) => React.ReactElement };

export default function LanguageSelector() {
  const t = useTranslations("nav");
  const locale = useLocale() as "th" | "en";
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const [menuPos, setMenuPos] = React.useState<{ top: number; right: number } | null>(null);

  const options: Option[] = [
    { code: "th", label: "ไทย", Flag: FlagTH },
    { code: "en", label: "English", Flag: FlagGB },
  ];

  const current = options.find((o) => o.code === locale) ?? options[0];

  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  function switchLocale(code: "th" | "en") {
    if (!pathname) return;
    const segs = pathname.split("/");
    if (segs[1] === "th" || segs[1] === "en") {
      segs[1] = code;
    } else {
      segs.splice(1, 0, code);
    }
    router.push(segs.join("/"));
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        ref={btnRef}
        className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("language")}
        onClick={() => {
          setOpen((v) => !v);
          // compute menu position
          setTimeout(() => {
            const b = btnRef.current?.getBoundingClientRect();
            if (b) {
              setMenuPos({ top: Math.round(b.bottom + 8), right: Math.round(window.innerWidth - b.right) });
            }
          }, 0);
        }}
      >
        <current.Flag className="h-4 w-6" />
        {current.code.toUpperCase()}
        <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>
      {open && menuPos && typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <div
            role="menu"
            aria-label={t("language")}
            className="z-[9999] w-44 overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg"
            style={{ position: "fixed", top: menuPos.top, right: menuPos.right }}
          >
            {options.map((opt) => (
              <button
                key={opt.code}
                role="menuitemradio"
                aria-checked={locale === opt.code}
                onClick={() => switchLocale(opt.code)}
                className={`flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm ${
                  locale === opt.code ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
              >
                <opt.Flag className="h-4 w-6" />
                <span className="flex-1">{opt.label}</span>
                {locale === opt.code && (
                  <svg className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}

function FlagTH({ className = "" }: { className?: string }) {
  // Thailand flag: red, white, blue (double height), white, red
  return (
    <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <rect width="900" height="600" fill="#A51931" />
      <rect y="120" width="900" height="120" fill="#FFFFFF" />
      <rect y="240" width="900" height="240" fill="#2F5696" />
      <rect y="480" width="900" height="120" fill="#FFFFFF" />
    </svg>
  );
}

function FlagGB({ className = "" }: { className?: string }) {
  // Simplified Union Jack
  return (
    <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" clipPath="url(#s)" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#s)" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}
