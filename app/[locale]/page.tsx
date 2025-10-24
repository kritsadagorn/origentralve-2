import type { Metadata } from "next";
import PageBackground from "../../components/decor/PageBackground";
import Hero from "../../components/home/Hero";
import ValueProps from "../../components/home/ValueProps";
import Showcase from "../../components/home/Showcase";
import Testimonials from "../../components/home/Testimonials";
import ContactSection from "../../components/home/ContactSection";
import ProgramsHighlight from "../../components/home/ProgramsHighlight";
import AsiaPromote from "../../components/home/AsiaPromote";
import AsiaPromote2 from "../../components/home/AsiaPromote2";

export default function HomePage() {
  return (
    <PageBackground variant="home">
      <Hero />
      <ValueProps />
      <ProgramsHighlight />
      <AsiaPromote2/>
      <Showcase />
      <Testimonials />
      <ContactSection />
    </PageBackground>
  );
}

export const metadata: Metadata = {
  title: "ทัวร์ดูงานเอเชีย ญี่ปุ่น | ผู้เชี่ยวชาญ Corporate • Study • Culture • Wellness",
  description:
    "วางแผนทริปดูงานเอเชียและญี่ปุ่นกับ Origen Travel ผู้เชี่ยวชาญทริปองค์กร การศึกษา วัฒนธรรม และเพื่อสุขภาพ — ทีมมืออาชีพ ดูแลครบ จบในที่เดียว",
  keywords: [
    "ทัวร์ดูงาน",
    "ทัวร์ญี่ปุ่น",
    "Study Tour",
    "Corporate Travel",
    "วัฒนธรรม",
    "Wellness",
    "เอเชีย",
    "ญี่ปุ่น",
  ],
  openGraph: {
    title: "Origen Travel — ผู้เชี่ยวชาญทัวร์ดูงานเอเชียและญี่ปุ่น",
    description:
      "บริการทริปองค์กร การศึกษา วัฒนธรรม และเพื่อสุขภาพ ครบวงจร ดูแลตั้งแต่ดีไซน์ทริปจนถึง On-site",
    images: [{ url: "https://img5.pic.in.th/file/secure-sv1/origenmetadata.png" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://img5.pic.in.th/file/secure-sv1/origenmetadata.png"],
  },
};
