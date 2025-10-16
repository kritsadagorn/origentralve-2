"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(useGSAP as any);

export default function ContactForm() {
  const t = useTranslations("contactPage");
  const tContact = useTranslations("contact");
  const ref = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) gsap.from(leftRef.current, { x: -40, opacity: 0, duration: 0.8, ease: "power2.out" });
      if (formRef.current) gsap.from(formRef.current, { x: 40, opacity: 0, duration: 0.8, delay: 0.2, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 900); // fake success for now
  }

  return (
    <section ref={ref} className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white/90 rounded-3xl shadow-xl p-4 sm:p-8 flex flex-col md:flex-row gap-8">
        {/* Left: Contact Info (styled like homepage) */}
        <div ref={leftRef} className="flex-1 min-w-[260px] max-w-md bg-pink-50 rounded-2xl p-6 flex flex-col gap-6 justify-center">
          <div className="flex items-center gap-3 mb-2">
            <Image src="/images/contact-bunny.svg" alt="Contact" width={48} height={48} />
            <h2 className="text-xl font-bold text-pink-600">{t("heading")}</h2>
          </div>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3">
              <Image src="/images/contact-phone.svg" alt="Phone" width={28} height={28} className="mt-0.5" />
              <div>
                <div className="font-semibold text-pink-700">{t("phone")}</div>
                <div className="text-gray-700">+66 95 147 4615</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Image src="/images/contact-office.svg" alt="Email" width={28} height={28} className="mt-0.5" />
              <div>
                <div className="font-semibold text-pink-700">{t("email")}</div>
                <div className="text-gray-700">hello@origen.travel</div>
              </div>
            </li>
          </ul>
        </div>

        {/* Right: Contact Form (homepage style) */}
        <div className="flex-1 min-w-[260px] max-w-xl">
          <div ref={formRef} className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-md">
            {status !== "success" ? (
              <form className="grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
                <h3 className="sm:col-span-2 text-lg font-bold text-pink-600 mb-1">{tContact("formTitle")}</h3>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">{t("name")}</label>
                  <input id="name" name="name" required className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-pink-300 outline-none" />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="org">{t("org")}</label>
                  <input id="org" name="org" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-pink-300 outline-none" />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">{t("email")}</label>
                  <input id="email" name="email" type="email" required className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-pink-300 outline-none" />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">{t("phone")}</label>
                  <input id="phone" name="phone" type="tel" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-pink-300 outline-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">{t("message")}</label>
                  <textarea id="message" name="message" rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-pink-300 outline-none resize-none" />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <button type="submit" className="mt-2 w-full sm:w-auto px-8 py-2 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 text-white font-bold shadow-lg hover:scale-105 transition-transform">{t("submit")}</button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">✓</div>
                <div className="text-[15px] font-medium text-gray-900">{t("successTitle")}</div>
                <p className="text-sm text-gray-600">{t("successDesc")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
