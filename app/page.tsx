import PageBackground from "../components/decor/PageBackground";
import Hero from "../components/home/Hero";
import ValueProps from "../components/home/ValueProps";

export default function Home() {
  return (
    <PageBackground variant="home">
      <Hero />
      <ValueProps />
    </PageBackground>
  );
}
