import { motion } from "motion/react";
import { BusinessCard } from "../../components/BusinessCard";
import { Button } from "../../components/Button";
import { Img } from "../../components/Img";
import { EASE, HandNote, Reveal, SectionLabel } from "../../components/motion";
import { site } from "../../config/site";

/** Who the business is, where it's based and how to reach it. */
export function AboutPreview() {
  return (
    <section className="bg-paper pt-14 pb-24 sm:pt-20 sm:pb-32" aria-labelledby="about-title">
      <div className="shell grid items-start gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="relative lg:col-span-6">
          <motion.figure
            className="rounded-[1.6rem] bg-white p-2.5 shadow-[0_2px_4px_rgb(43_58_78/0.05),0_30px_60px_-30px_rgb(43_58_78/0.45)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <div className="overflow-hidden rounded-[1.2rem]">
              <Img
                name="bo-kaap-mountain"
                alt="Colourful houses on a Cape Town street with Table Mountain behind"
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="aspect-[4/3] w-full"
              />
            </div>
          </motion.figure>
          <HandNote direction="up" className="mt-3 ml-6">
            home turf — Cape Town
          </HandNote>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <SectionLabel>About</SectionLabel>
            <h2 id="about-title" className="display-lg mt-4">
              Local plumbing services. Straightforward communication.
            </h2>
            <div className="lede mt-6 space-y-3 text-muted">
              <p>
                Based in {site.location.area}, Cape Town, {site.name} provides plumbing repairs, installations, leak
                detection, and geyser-related services.
              </p>
              <p>Get in touch to discuss your plumbing requirements and service availability.</p>
            </div>
          </Reveal>

          <Reveal className="mt-10" delay={0.1}>
            <BusinessCard />
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3" delay={0.15}>
            <Button to="/about" variant="outline-dark">
              More about the business
            </Button>
            <p className="text-sm text-muted">Contact the business to confirm availability in your area.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
