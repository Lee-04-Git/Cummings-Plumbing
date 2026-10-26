import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { BusinessCard } from "../components/BusinessCard";
import { Button } from "../components/Button";
import { Accent, HeroBanner } from "../components/HeroBanner";
import { Img } from "../components/Img";
import { LogoMark } from "../components/Logo";
import { PageMeta } from "../components/PageMeta";
import { PipeSchematic } from "../components/PipeSchematic";
import { EASE, Reveal, SectionLabel } from "../components/motion";
import { site } from "../config/site";
import { pages } from "../data/pages";
import { services } from "../data/services";

export default function About() {
  return (
    <>
      <PageMeta meta={pages.about} />
      <HeroBanner
        label="About the business"
        lines={[
          "Local plumbing,",
          <>
            straight from <Accent>Westgate.</Accent>
          </>,
        ]}
        subheading="A Cape Town plumbing business you can speak to directly."
        intro={
          <p>
            {site.name} offers repairs, installations, water leak detection and geyser services — with a simple, direct
            way to get in touch.
          </p>
        }
        actions={[
          { to: site.phone.mobile.href, label: `Call ${site.phone.mobile.display}`, icon: Phone },
          { to: "/services", label: "Explore our services" },
        ]}
        facts={[
          { label: "Services", value: "4 core service areas" },
          { label: "For", value: "Homes & businesses" },
          { label: "Based in", value: `${site.location.area}, ${site.location.city}` },
        ]}
        image="pipe-manifold-brick"
        imageAlt="Water pipes, valves and a meter mounted on a red brick wall"
        position="68% 50%"
        mobilePosition="62% 50%"
      />

      <Story />
      <WhatWeDo />
      <GetInTouch />
    </>
  );
}

/** The business in a few honest lines, beside a large photograph. */
function Story() {
  return (
    <section className="bg-paper pt-14 pb-24 sm:pt-20 sm:pb-28" aria-labelledby="story-title">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6">
          <motion.figure
            className="overflow-hidden rounded-[2rem] bg-stone shadow-[0_40px_80px_-48px_rgb(43_58_78/0.6)]"
            initial={{ opacity: 0, y: 30, clipPath: "inset(8% 0% 0% 0% round 2rem)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 2rem)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <Img
              name="toolbag-floor"
              alt="A tool bag, drill and fittings on a tiled floor during plumbing work"
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="aspect-[4/3] w-full lg:aspect-[4/5]"
            />
          </motion.figure>
          <Reveal
            className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_20px_40px_-20px_rgb(43_58_78/0.5)] ring-1 ring-ink/5 sm:left-auto sm:-right-6"
            delay={0.3}
          >
            <LogoMark className="h-9 w-9" />
            <span>
              <span className="block text-xs text-muted">Based in</span>
              <span className="block font-semibold">
                {site.location.area}, {site.location.city}
              </span>
            </span>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal>
            <SectionLabel>The business</SectionLabel>
            <h2 id="story-title" className="display-lg mt-4">
              Plumbing for Cape Town homes and businesses.
            </h2>
          </Reveal>
          <Reveal className="lede mt-6 space-y-4 text-muted" delay={0.05}>
            <p>
              <span className="font-semibold text-ink">
                {site.name} is a local plumbing business based in {site.location.area}, {site.location.city}.
              </span>{" "}
              It offers four main areas of work: water leak detection, geyser services, plumbing repairs and replacements,
              and plumbing installations.
            </p>
            <p>Service availability for your area can be confirmed when you get in touch.</p>
          </Reveal>
          <Reveal className="mt-8 border-l-4 border-signal pl-5" delay={0.1}>
            <p className="font-display text-[1.45rem] leading-snug font-semibold [font-variation-settings:'SOFT'_100] sm:text-[1.65rem]">
              Speak directly with the business, explain what's happening, and discuss the right next step together.
            </p>
            <p className="mt-2 text-sm text-muted">Contact person: {site.contactPerson}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** The four services as compact photo cards. */
function WhatWeDo() {
  return (
    <section className="bg-cloud py-20 sm:py-24" aria-labelledby="what-title">
      <div className="shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionLabel>What the business does</SectionLabel>
            <h2 id="what-title" className="display-lg mt-4">
              Four areas of work.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Link to="/services" className="group inline-flex min-h-11 items-center gap-2 font-semibold">
              <span className="border-b-2 border-signal pb-0.5">See all services</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, ease: EASE, delay: i * 0.07 }}
            >
              <Link
                to={`/services#${s.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-white ring-1 ring-ink/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-30px_rgb(43_58_78/0.45)] sm:rounded-[1.5rem]"
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-stone">
                  <Img
                    name={s.image}
                    alt=""
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    className="absolute inset-0 h-full w-full transition-transform duration-[1.1s] ease-[var(--ease-out-quart)] group-hover:scale-[1.05]"
                  />
                </span>
                <span className="flex flex-1 flex-col p-4 sm:p-5">
                  <span className="font-display text-[1.05rem] leading-tight font-semibold [font-variation-settings:'SOFT'_100] sm:text-[1.25rem]">
                    {s.title}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-tide-deep">
                    Learn more
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Getting in touch: a short prompt beside the business card. */
function GetInTouch() {
  return (
    <section className="relative isolate overflow-hidden bg-paper py-20 sm:py-28" aria-labelledby="touch-title">
      <PipeSchematic bg="var(--color-paper)" side="right" />
      <div className="shell grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <SectionLabel>Get in touch</SectionLabel>
            <h2 id="touch-title" className="display-lg mt-4">
              The easiest way to start is a quick call.
            </h2>
            <p className="lede mt-5 max-w-lg text-muted">
              Call the mobile or landline, send an email, or use the enquiry form — whichever suits you.
            </p>
          </Reveal>
          <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row" delay={0.08}>
            <Button to={site.phone.mobile.href} icon={Phone} arrow={false} size="lg">
              Call {site.phone.mobile.display}
            </Button>
            <Button to="/contact" icon={Mail} variant="outline-dark" arrow={false} size="lg">
              Send an enquiry
            </Button>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.12}>
          <BusinessCard />
        </Reveal>
      </div>
    </section>
  );
}
