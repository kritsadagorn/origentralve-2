import type { Metadata } from "next";
import "../globals.css";
import TopBar from "../../components/navbar/TopBar";
import MainNav from "../../components/navbar/MainNav";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales } from "../../i18n/config";
import { getMessages } from "next-intl/server";
import LocaleHtmlUpdater from "../../components/i18n/LocaleHtmlUpdater";
import Footer from "../../components/footer/Footer";

// Fonts are applied in root layout's body; no need to include here

export const metadata: Metadata = {
  title: {
    default: "Origen Travel | Corporate, Study, Culture & Wellness Programs",
    template: "%s | Origen Travel",
  },
  description:
    "Origen Travel — ผู้เชี่ยวชาญทริปดูงาน, การศึกษา, แลกเปลี่ยนวัฒนธรรม และทริปเพื่อสุขภาพสำหรับองค์กร หน่วยงานรัฐ และสถาบันการศึกษา",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as any)) notFound();

  // Load messages via next-intl helper (plugin reads i18n/request.ts)
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleHtmlUpdater locale={locale} />
      <TopBar />
      <MainNav />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
