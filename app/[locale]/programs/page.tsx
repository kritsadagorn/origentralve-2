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
