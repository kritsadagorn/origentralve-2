"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: "/images/contact-location.svg",
    label: "address",
    value: "199/349 หมู่บ้าน ศุภาลัยการ์เด้นวิลล์ กรุงเทพฯ-ปทุมฯ หมู่ที่ 4 ตำบลบางเดื่อ อำเภอเมืองปทุมธานี จ.ปทุมธานี 12000",
  },
  {
    icon: "/images/contact-office.svg",
    label: "office",
    value: "02-123-4567",
  },
  {
    icon: "/images/contact-clock.svg",
    label: "hours",
    value: "จันทร์-ศุกร์ 07.00-22.00 น. | เสาร์ 09.00-16.00 น.",
  },
  {
    icon: "/images/contact-phone.svg",
    label: "hotline",
    value: "081-234-5678",
  },
];

export default function ContactSection() {
  const t = useTranslations("contact");
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const fadeTl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.8 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });
      fadeTl
        .from("[data-contact-left]", { x: -36, opacity: 0 })
        .from("[data-contact-form]", { x: 36, opacity: 0 }, "<0.15");

      gsap.utils.toArray<HTMLElement>("[data-contact-info-item]").forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          y: 18,
          duration: 0.6,
          delay: index * 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.from("[data-contact-button]", {
        opacity: 0,
        y: 22,
        scale: 0.92,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-contact-form]",
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-20 h-64 w-64 rounded-full bg-gradient-to-br from-[#7B1FA2]/18 to-[#C2185B]/10 blur-3xl blob" />
        <div className="absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-gradient-to-tr from-[#C2185B]/18 to-[#7B1FA2]/10 blur-3xl blob" style={{ animationDelay: '1.2s' }} />
        <div className="absolute inset-0 opacity-50 bg-grid-soft" />
      </div>
      <div className="bg-white/90 rounded-3xl shadow-xl p-4 sm:p-8 flex flex-col md:flex-row gap-8">
        {/* Left: Contact Info */}
        <div data-contact-left className="flex-1 min-w-[260px] max-w-md bg-pink-50 rounded-2xl p-6 flex flex-col gap-6 justify-center">
          <div className="flex items-center gap-3 mb-2">
            <Image src="/images/contact-bunny.svg" alt="Contact" width={48} height={48} />
            <h2 className="text-xl font-bold text-pink-600">{t("heading")}</h2>
          </div>
          <ul className="flex flex-col gap-4">
            {contactInfo.map((item, i) => (
              <li key={item.label} data-contact-info-item className="flex items-start gap-3">
                <Image src={item.icon} alt="" width={36} height={36} className="mt-1" />
                <div>
                  <div className="font-semibold text-pink-700">{t(item.label)}</div>
                  <div className="text-gray-700 text-sm whitespace-pre-line">{item.value}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Right: Contact Form */}
        <form
          data-contact-form
          className="flex-1 min-w-[260px] max-w-xl bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-md"
          onSubmit={e => { e.preventDefault(); }}
        >
          <h3 className="text-lg font-bold text-pink-600 mb-2">{t("formTitle")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("firstName")}</label>
              <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-pink-300 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("lastName")}</label>
              <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-pink-300 outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("email")}</label>
              <input type="email" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-pink-300 outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("phone")}</label>
              <input type="tel" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-pink-300 outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("message")}</label>
              <textarea rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-pink-300 outline-none resize-none" required />
            </div>
          </div>
          <button
            type="submit"
            data-contact-button
            className="mt-2 w-full sm:w-auto px-8 py-2 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 text-white font-bold shadow-lg hover:scale-105 transition-transform"
          >
            {t("submit")}
          </button>
        </form>
      </div>
    </section>
  );
}
