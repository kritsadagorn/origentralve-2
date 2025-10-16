"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const SocialIcon = ({ href, label, src }: { href: string; label: string; src: string }) => (
  <Link href={href} aria-label={label} className="inline-flex">
    <Image src={src} alt="" width={28} height={28} className="h-7 w-7" />
  </Link>
);

export default function Footer() {
  const t = useTranslations("footer");
  const packages = t.raw("packages") as string[][];
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-black/10 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left: Company info */}
          <div className="md:col-span-5">
            <Image src="/images/logo.svg" alt="Origen Travel" width={150} height={44} className="mb-3" />
            <div className="space-y-2 text-[14px] leading-6 text-gray-800">
              <h3 className="text-[16px] font-semibold text-pink-700">{t("company.name")}</h3>
              <p className="leading-6">{t("company.address")}</p>
              <div className="text-[13px] text-gray-700">
                <div>{t("hours.monFri")}</div>
                <div>{t("hours.sat")}</div>
              </div>
            </div>

            {/* License card */}
            <div className="mt-4 rounded-xl border border-gray-200 p-3">
              <div className="flex items-center gap-2">
                <Image src="/images/contact-bunny.svg" alt="" width={22} height={22} />
                <div>
                  <div className="text-[12px] text-gray-600">{t("license.title")}</div>
                  <div className="text-[14px] font-medium text-gray-900">{t("license.number")}</div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <Image src="/images/contact-office.svg" alt="" width={28} height={28} />
                <Image src="/images/contact-clock.svg" alt="" width={28} height={28} />
                <Image src="/images/contact-location.svg" alt="" width={28} height={28} />
              </div>
            </div>

            {/* Socials */}
            <div className="mt-4 flex items-center gap-2.5">
              <SocialIcon href="#" label="Facebook" src="/images/social-facebook.svg" />
              <SocialIcon href="#" label="Instagram" src="/images/social-instagram.svg" />
              <SocialIcon href="#" label="Line" src="/images/social-line.svg" />
              <SocialIcon href="#" label="YouTube" src="/images/social-youtube.svg" />
            </div>
          </div>

          {/* Right: Link columns */}
          <div className="md:col-span-7">
            <h4 className="mb-3 text-[15px] font-semibold text-pink-700">{t("packagesTitle")}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {packages.map((col: any, idx: number) => (
                <div key={idx} className="space-y-1.5">
                  <ul className="space-y-1 text-[14px] text-gray-800">
                    {(col as string[]).map((item: string, i: number) => (
                      <li key={i}><Link href="#" className="hover:underline">{item}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gradient-to-r from-[#C2185B] to-[#F06292] py-2.5 text-center text-white text-[12px] tracking-wide">
        COPYRIGHT © {year} ORIGEN TRAVEL, ALL RIGHTS RESERVED
      </div>
    </footer>
  );
}
