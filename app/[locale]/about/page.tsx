import PageBackground from "@/components/decor/PageBackground";
import VisionMission from "@/components/about/VisionMission";
import CompanyStory from "@/components/about/CompanyStory";
import TeamCerts from "@/components/about/TeamCerts";

export default function AboutPage() {
  return (
    <PageBackground variant="about">
      <VisionMission />
      <CompanyStory />
      <TeamCerts />
    </PageBackground>
  );
}
