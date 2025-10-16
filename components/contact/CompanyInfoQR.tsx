"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP as any);

export default function CompanyInfoQR() {
  const t = useTranslations("contactPage");
  const tTop = useTranslations("topbar");
  const tCompany = useTranslations("footer.company");
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-company-card]", { y: 22, opacity: 0, duration: 0.6, ease: "power2.out" });
      gsap.from("[data-qr-card]", { y: 26, opacity: 0, duration: 0.6, delay: 0.08, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  return (
  <section ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid gap-6 md:grid-cols-12">
        {/* Company info card */}
        <div className="md:col-span-7">
          <div data-company-card className="relative h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-md">
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-r from-indigo-200/40 via-violet-200/40 to-blue-200/40 blur-2xl" aria-hidden />
            <h2 className="text-xl font-semibold text-gray-900">{t("companySection.title")}</h2>
            <div className="mt-1 text-sm text-gray-600">{tCompany("name")}</div>
            <div className="mt-4 space-y-3 text-[15px] text-gray-800">
              <div className="flex items-start gap-3">
                <Image src="/images/contact-location.svg" alt="Location" width={20} height={20} />
                <div>
                  <div className="font-medium">{t("companySection.addressLabel")}</div>
                  <div className="text-gray-700">{tCompany("address")}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Image src="/images/contact-clock.svg" alt="Hours" width={20} height={20} />
                <div>
                  <div className="font-medium">{t("companySection.hoursLabel")}</div>
                  <div className="text-gray-700">{tTop("hours")}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Image src="/images/contact-phone.svg" alt="Hotline" width={20} height={20} />
                <div>
                  <div className="font-medium">{t("companySection.hotlineLabel")}</div>
                  <div className="text-gray-700">+66 95 147 4615</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Image src="/images/contact-office.svg" alt="Office" width={20} height={20} />
                <div>
                  <div className="font-medium">{t("companySection.officeLabel")}</div>
                  <div className="text-gray-700">hello@origen.travel</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LINE QR card */}
        <div className="md:col-span-5">
          <div data-qr-card className="relative h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-md">
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-r from-blue-200/40 via-violet-200/40 to-indigo-200/40 blur-2xl" aria-hidden />
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-gray-900">{t("companySection.line.title")}</h3>
              <Image src="/images/social-line.svg" alt="LINE" width={22} height={22} />
            </div>
            <div className="mt-2 text-sm text-gray-600">{t("companySection.line.scan")}</div>
            <div className="mt-4 flex flex-col items-center">
              <div className="rounded-xl border border-gray-200 bg-white p-3">
                {/* Placeholder QR – replace src with your real QR in public/images/line-qr.png */}
                <Image src="/images/line-qr-placeholder.svg" width={220} height={220} alt="LINE QR" className="rounded-md" />
              </div>
              <div className="mt-2 text-xs text-gray-500">{t("companySection.line.lineId")}</div>
              <a
                href={t("companySection.line.link")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-medium text-white hover:opacity-95"
              >
                {t("companySection.line.addButton")}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
