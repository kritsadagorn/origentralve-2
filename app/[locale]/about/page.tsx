import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import PageBackground from "@/components/decor/PageBackground";
import VisionMission from "@/components/about/VisionMission";
import CompanyStory from "@/components/about/CompanyStory";
import TeamCerts from "@/components/about/TeamCerts";

export default function AboutPage() {
  const t = useTranslations("aboutPage");
  return (
    <PageBackground variant="about">
      <section className="mx-auto max-w-7xl px-3 sm:px-4 pt-10">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">{t("h1")}</h1>
          <p className="mt-2 text-gray-700">{t("intro")}</p>
        </header>
      </section>
      <VisionMission />
      <CompanyStory />
      <TeamCerts />
    </PageBackground>
  );
}

export const metadata: Metadata = {
  title: "เกี่ยวกับ Origen Travel | ผู้เชี่ยวชาญทริปองค์กร การศึกษา และวัฒนธรรม",
  description:
    "รู้จักทีม Origen Travel ที่มุ่งเน้นคุณภาพ ความปลอดภัย และผลลัพธ์ของทริปดูงาน การศึกษา วัฒนธรรม และเพื่อสุขภาพสำหรับองค์กรและสถาบัน",
  keywords: [
    "เกี่ยวกับ Origen Travel",
    "ทริปองค์กร",
    "Study Tour",
    "แลกเปลี่ยนวัฒนธรรม",
    "Wellness Travel",
  ],
  openGraph: {
    title: "เกี่ยวกับ Origen Travel",
    description:
      "ทีมงานมืออาชีพ ประสบการณ์สูง ออกแบบทริปเพื่อผลลัพธ์ที่วัดได้",
    images: [{ url: "https://img5.pic.in.th/file/secure-sv1/origenmetadata.png" }],
  },
  twitter: { card: "summary_large_image", images: ["https://img5.pic.in.th/file/secure-sv1/origenmetadata.png"] },
};
