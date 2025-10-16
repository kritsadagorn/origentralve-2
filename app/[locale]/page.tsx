import PageBackground from "../../components/decor/PageBackground";
import Hero from "../../components/home/Hero";
import ValueProps from "../../components/home/ValueProps";
import Showcase from "../../components/home/Showcase";
import Testimonials from "../../components/home/Testimonials";
import ContactSection from "../../components/home/ContactSection";

export default function HomePage() {
  return (
    <PageBackground variant="home">
      <Hero />
      <ValueProps />
      <Showcase />
      <Testimonials />
      <ContactSection />
    </PageBackground>
  );
}
