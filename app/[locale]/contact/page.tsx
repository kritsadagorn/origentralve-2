import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import PageBackground from "@/components/decor/PageBackground";
import ContactForm from "../../../components/contact/ContactForm";
import MapSection from "../../../components/contact/MapSection";
import CompanyInfoQR from "../../../components/contact/CompanyInfoQR";

export default function ContactPage() {
  const t = useTranslations("contactPage");
  return (
    <PageBackground variant="contact">
      <section className="mx-auto max-w-7xl px-3 sm:px-4 pt-10">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">{t("h1", { default: "ติดต่อ Origen Travel" })}</h1>
          <p className="mt-2 text-gray-700">{t("intro")}</p>
        </header>
      </section>
      <CompanyInfoQR />
      <div aria-hidden className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-2 h-px w-full rounded-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
      <ContactForm />
      <div aria-hidden className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-2 h-px w-full rounded-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
      <MapSection lat={13.792385860426464} lng={100.50482447511854} placeLabel="Origen Travel (HQ)" />
    </PageBackground>
  );
}

export const metadata: Metadata = {
  title: "ติดต่อ Origen Travel | ปรึกษาออกแบบทริปองค์กร & Study Tour",
  description:
    "พูดคุยกับทีมผู้เชี่ยวชาญของ Origen Travel เพื่อออกแบบทริปดูงาน การศึกษา วัฒนธรรม และเพื่อสุขภาพ ให้ตรงเป้าหมายและงบประมาณของคุณ",
  keywords: [
    "ติดต่อ Origen Travel",
    "ขอใบเสนอราคา",
    "ทริปองค์กร",
    "Study Tour",
    "ญี่ปุ่น",
    "เอเชีย",
  ],
  openGraph: {
    title: "ติดต่อ Origen Travel",
    description:
      "ปรึกษาฟรี ออกแบบทริปครบวงจร โดยทีมงานมืออาชีพ",
    images: [{ url: "https://img5.pic.in.th/file/secure-sv1/origenmetadata.png" }],
  },
  twitter: { card: "summary_large_image", images: ["https://img5.pic.in.th/file/secure-sv1/origenmetadata.png"] },
};
