import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import PageBackground from "@/components/decor/PageBackground";
import ProgramsHero from "@/components/programs/ProgramsHero";
import ProgramsGrid from "@/components/programs/ProgramsGrid";

export default function ProgramsPage() {
  const t = useTranslations("programsPage");
  const items = t.raw("items") as Array<{ key: string; title: string; desc: string }>;
  return (
    <PageBackground variant="programs">
      <section className="mx-auto max-w-7xl px-3 sm:px-4 py-10 sm:py-14">
        <ProgramsHero heading={t("heading")} intro={t("intro")} />
        <div className="mt-8">
          <ProgramsGrid items={items} />
        </div>
      </section>
    </PageBackground>
  );
}

export const metadata: Metadata = {
  title: "โปรแกรมทริปสำหรับองค์กร & สถาบัน | Study • Culture • Wellness",
  description:
    "สำรวจโปรแกรมทริปยอดนิยมของ Origen Travel สำหรับองค์กรและสถาบัน ทั้ง Study Tour, แลกเปลี่ยนวัฒนธรรม และทริปเพื่อสุขภาพ ในเอเชียและญี่ปุ่น",
  keywords: [
    "โปรแกรมทริปองค์กร",
    "Study Tour",
    "Culture Exchange",
    "Wellness Travel",
    "ญี่ปุ่น",
    "เอเชีย",
  ],
  openGraph: {
    title: "โปรแกรมทริป Origen Travel",
    description:
      "คัดสรรหัวข้อและปลายทางที่ใช่ ให้ได้ผลลัพธ์การเรียนรู้และความร่วมมือ",
    images: [{ url: "https://img5.pic.in.th/file/secure-sv1/origenmetadata.png" }],
  },
  twitter: { card: "summary_large_image", images: ["https://img5.pic.in.th/file/secure-sv1/origenmetadata.png"] },
};
