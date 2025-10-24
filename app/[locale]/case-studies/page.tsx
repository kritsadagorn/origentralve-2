import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import PageBackground from "@/components/decor/PageBackground";
import CaseStudyCard, { type CaseStudyItem } from "@/components/case-studies/CaseStudyCard";
import ResultsPanel from "@/components/case-studies/ResultsPanel";

export default function CaseStudiesPage() {
  const t = useTranslations("caseStudies");
  const items = t.raw("items") as Array<CaseStudyItem & { results: string[] }>;

  return (
    <PageBackground variant="caseStudies">
      <section className="mx-auto max-w-7xl px-3 sm:px-4 py-10 sm:py-14">
        <header className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">{t("heading")}</h1>
          <p className="mt-2 text-gray-700">{t("intro")}</p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((it, idx) => (
            <div key={idx} className="grid grid-cols-1 gap-4">
              <CaseStudyCard item={it} index={idx} />
              <ResultsPanel results={it.results} />
            </div>
          ))}
        </div>
      </section>
    </PageBackground>
  );
}

export const metadata: Metadata = {
  title: "ประสบการณ์จากลูกค้า | ผลลัพธ์ทริปองค์กร & Study Tour",
  description:
    "เจาะลึกเคสจริงจากองค์กรและสถาบันที่ร่วมเดินทางกับ Origen Travel เห็นผลลัพธ์ที่จับต้องได้ ทั้งการเรียนรู้และความร่วมมือ",
  keywords: [
    "Case Studies",
    "ทริปองค์กร",
    "Study Tour",
    "ผลลัพธ์",
    "ญี่ปุ่น",
    "เอเชีย",
  ],
  openGraph: {
    title: "Case Studies | Origen Travel",
    description:
      "สรุปผลลัพธ์จากทริปและมูลค่าที่องค์กรได้รับ จากการเดินทางเชิงการเรียนรู้",
    images: [{ url: "https://img5.pic.in.th/file/secure-sv1/origenmetadata.png" }],
  },
  twitter: { card: "summary_large_image", images: ["https://img5.pic.in.th/file/secure-sv1/origenmetadata.png"] },
};
