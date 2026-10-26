import { CtaSection } from "../components/CtaSection";
import { PageMeta } from "../components/PageMeta";
import { pages } from "../data/pages";
import { AboutPreview } from "../sections/home/AboutPreview";
import { Hero } from "../sections/home/Hero";
import { Process } from "../sections/home/Process";
import { ServicesPreview } from "../sections/home/ServicesPreview";

export default function Home() {
  return (
    <>
      <PageMeta meta={pages.home} />
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <Process />
      <CtaSection />
    </>
  );
}
