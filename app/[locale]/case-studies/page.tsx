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
