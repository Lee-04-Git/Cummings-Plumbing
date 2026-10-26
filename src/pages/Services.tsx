import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Phone, Plus } from "lucide-react";
import { Button } from "../components/Button";
import { CtaSection } from "../components/CtaSection";
import { Img } from "../components/Img";
import { Accent, HeroBanner } from "../components/HeroBanner";
import { PageMeta } from "../components/PageMeta";
import { EASE, Reveal, SectionLabel } from "../components/motion";
import { site } from "../config/site";
import { pages } from "../data/pages";
import { scrollToTarget } from "../lib/smoothScroll";
import { services, type Service } from "../data/services";
import { PipeSchematic } from "../components/PipeSchematic";

export default function Services() {
  return (
    <>
      <PageMeta meta={pages.services} />
      <HeroBanner
        label={`Services · ${site.location.area}, Cape Town`}
        lines={[
          "From a small drip",
          <>
            to a full <Accent>install.</Accent>
          </>,
        ]}
        subheading="Leak detection, geysers, repairs and installations."
        intro={
          <p>
            {site.name} offers four main categories of plumbing service for homes and businesses in Cape Town. Choose one
            below to see what it covers — or get in touch to discuss your requirements.
          </p>
        }
        actions={[
          { to: site.phone.mobile.href, label: `Call ${site.phone.mobile.display}`, icon: Phone },
          { to: "/contact", label: "Send an enquiry" },
        ]}
        facts={[
          { label: "Services", value: "4 core service areas" },
          { label: "For", value: "Homes & businesses" },
          { label: "Based in", value: `${site.location.area}, ${site.location.city}` },
        ]}
        image="tap-running"
        imageAlt="Water pouring from a kitchen tap against a dark background"
        position="58% 50%"
        mobilePosition="62% 50%"
      />

      <SymptomFinder />
      <ServiceGuide />
      <section className="bg-cloud pb-14" aria-label="About these descriptions">
        <p className="shell max-w-3xl text-sm text-muted lg:pl-[calc(25%+1.5rem)]">
          These are general explanations of each service category. The specific work required, availability and any
          costs are discussed directly with {site.name}.
        </p>
      </section>
      <GoodToKnow />
      <CtaSection />
    </>
  );
}

/** Everyday signs (two per service) the finder offers as starting points. */
const symptoms = services.flatMap((s) => s.whenToEnquire.slice(0, 2).map((text) => ({ text, serviceId: s.id })));

/**
 * "What's happening at your place?" — pick what you're noticing; a card shows the matching
 * service with a link straight to it. Helps people who don't know the trade terms.
 */
function SymptomFinder() {
  const [picked, setPicked] = useState(0);
  const match = services.find((s) => s.id === symptoms[picked].serviceId)!;

  return (
    <section className="bg-paper pt-14 pb-20 sm:pt-16 sm:pb-24" aria-labelledby="finder-title">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-6">
          <Reveal>
            <SectionLabel>Start here</SectionLabel>
            <h2 id="finder-title" className="display-lg mt-4">
              What's happening at your place?
            </h2>
            <p className="mt-4 max-w-lg text-muted">Pick what you're noticing and see which service it points to.</p>
          </Reveal>

          <Reveal className="mt-8" delay={0.08}>
            <div role="group" aria-label="Things you might be noticing" className="flex flex-wrap gap-2.5">
              {symptoms.map((sym, i) => {
                const on = i === picked;
                return (
                  <button
                    key={sym.text}
                    type="button"
                    aria-pressed={on}
                    aria-controls="finder-result"
                    onClick={() => {
                      setPicked(i);
                      // Phones: the result sits below the list, so bring it into view.
                      if (window.innerWidth < 1024) {
                        const el = document.getElementById("finder-result");
                        if (el) requestAnimationFrame(() => scrollToTarget(el));
                      }
                    }}
                    className={`min-h-11 rounded-full px-4 py-2 text-left text-[0.92rem] font-medium transition-all duration-300 ${
                      on
                        ? "bg-ink text-white shadow-[0_10px_24px_-14px_rgb(43_58_78/0.8)]"
                        : "bg-white text-ink ring-1 ring-ink/10 hover:ring-ink/30"
                    }`}
                  >
                    {sym.text}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="scroll-mt-24 lg:col-span-6" id="finder-result" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={match.id}
              className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_30px_60px_-40px_rgb(43_58_78/0.5)] ring-1 ring-ink/5"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone">
                <motion.div className="h-full w-full" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1, ease: EASE }}>
                  <Img name={match.image} alt={match.imageAlt} sizes="(min-width: 1024px) 44vw, 100vw" className="h-full w-full" />
                </motion.div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-sm text-muted">That points to</p>
                <h3 className="display-md mt-1">{match.title}</h3>
                <p className="mt-3 text-muted">{match.summary}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={`#${match.id}`}
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 font-semibold text-white transition-colors hover:bg-ink-3"
                  >
                    Read about {match.shortTitle.toLowerCase()}
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">
                      ↓
                    </span>
                  </a>
                  <a href={site.phone.mobile.href} className="inline-flex min-h-12 items-center justify-center gap-2 font-semibold text-tide-deep">
                    <Phone aria-hidden="true" className="h-4 w-4" />
                    Or call {site.phone.mobile.display}
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/**
 * Editorial service guide: a sticky index (desktop) that tracks the chapter in view, and one
 * chapter per service — photo mosaic, explanation beside a checklist of signs, and actions.
 */
function ServiceGuide() {
  const [active, setActive] = useState(services[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.2, 0.5] },
    );
    services.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative isolate bg-cloud py-20 sm:py-28" aria-labelledby="guide-title">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <SectionLabel>The services</SectionLabel>
          <h2 id="guide-title" className="display-lg mt-4">
            A closer look at each service.
          </h2>
        </Reveal>

        <div className="mt-14 lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Sticky index */}
          <nav aria-label="Services on this page" className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="text-sm font-semibold text-muted">In this guide</p>
              <ol className="mt-4 border-l-2 border-ink/10">
                {services.map((s) => {
                  const on = active === s.id;
                  return (
                    <li key={s.id} className="relative">
                      {on && (
                        <motion.span
                          layoutId="guide-marker"
                          className="absolute top-0 bottom-0 -left-[2px] w-[2px] bg-signal-deep"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                      <a
                        href={`#${s.id}`}
                        aria-current={on ? "location" : undefined}
                        className={`block py-3 pl-5 font-display text-[1.15rem] leading-snug font-semibold transition-colors [font-variation-settings:'SOFT'_100] ${
                          on ? "text-ink" : "text-ink/45 hover:text-ink/75"
                        }`}
                      >
                        {s.title}
                      </a>
                    </li>
                  );
                })}
              </ol>
              <div className="mt-8 rounded-2xl bg-white p-5 ring-1 ring-ink/5">
                <p className="font-semibold">Prefer to talk it through?</p>
                <a href={site.phone.mobile.href} className="mt-2 inline-flex items-center gap-2 font-semibold text-tide-deep">
                  <Phone aria-hidden="true" className="h-4 w-4" />
                  {site.phone.mobile.display}
                </a>
              </div>
            </div>
          </nav>

          {/* Chapters */}
          <div className="space-y-16 sm:space-y-24 lg:col-span-9">
            {services.map((s) => (
              <GuideChapter key={s.id} service={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GuideChapter({ service }: { service: Service }) {
  return (
    <article id={service.id} aria-labelledby={`${service.id}-title`} className="scroll-mt-28">
      {/* Photo mosaic: one large, two stacked. Fixed 16:9 frame on larger screens so portrait
          photos can't stretch it; each photo fills its cell. */}
      <Reveal y={36}>
        <div className="grid grid-cols-2 gap-3 sm:aspect-[16/9] sm:grid-cols-3 sm:grid-rows-2 sm:gap-4">
          <figure className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-stone sm:row-span-2 sm:aspect-auto">
            <Img name={service.image} alt={service.imageAlt} sizes="(min-width: 1024px) 46vw, 100vw" className="absolute inset-0 h-full w-full" />
          </figure>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem] bg-stone sm:aspect-auto">
            <Img name={service.detailImage} alt={service.detailImageAlt} sizes="(min-width: 1024px) 22vw, 50vw" className="absolute inset-0 h-full w-full" />
          </figure>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem] bg-stone sm:aspect-auto">
            <Img name={service.extraImage} alt="" sizes="(min-width: 1024px) 22vw, 50vw" className="absolute inset-0 h-full w-full" />
          </figure>
        </div>
      </Reveal>

      <Reveal className="mt-8" delay={0.05}>
        <h2 id={`${service.id}-title`} className="display-lg">
          {service.title}
        </h2>
        <p className="lede mt-4 max-w-3xl text-ink">{service.summary}</p>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
        <Reveal className="space-y-4 text-muted" delay={0.08}>
          {service.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>
        <Reveal className="rounded-[1.5rem] bg-white p-6 ring-1 ring-ink/5 sm:p-7" delay={0.12}>
          <h3 className="font-display text-xl font-semibold [font-variation-settings:'SOFT'_100]">Signs you may need this</h3>
          <ul className="mt-4 space-y-3">
            {service.whenToEnquire.map((sign) => (
              <li key={sign} className="flex gap-3">
                <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal-deep" />
                </span>
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal className="mt-8 flex flex-col items-stretch gap-x-6 gap-y-3 sm:flex-row sm:items-center" delay={0.15}>
        <Button to={site.phone.mobile.href} icon={Phone} arrow={false}>
          Call {site.phone.mobile.display}
        </Button>
        <Link to={`/contact?service=${service.id}`} className="group inline-flex min-h-11 items-center justify-center gap-2 font-semibold sm:justify-start">
          <span className="border-b-2 border-ink/15 pb-0.5 transition-colors group-hover:border-signal">
            Enquire about {service.shortTitle.toLowerCase()}
          </span>
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </article>
  );
}

/** Short, honest answers built only from verified details. */
const faqs = [
  {
    q: "Do you work on homes and businesses?",
    a: `Yes. ${site.name} provides plumbing services for homes and businesses in Cape Town.`,
  },
  {
    q: "Which areas do you cover?",
    a: `The business is based in ${site.location.area}, Cape Town. Contact the business to confirm service availability in your area.`,
  },
  {
    q: "How do I get started?",
    a: `Call ${site.phone.mobile.display} or ${site.phone.landline.display}, or send an enquiry with a few details. You'll speak directly with the business about your requirements and the next step.`,
  },
  {
    q: "I'm not sure which service I need. What should I do?",
    a: "Describe what you're noticing — where the problem is, what it's doing and when it started. That's enough to start the conversation.",
  },
];

function GoodToKnow() {
  return (
    <section className="relative isolate overflow-hidden bg-paper py-20 sm:py-24" aria-labelledby="faq-title">
      <PipeSchematic bg="var(--color-paper)" side="left" />
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <h2 id="faq-title" className="display-lg">
            Good to know.
          </h2>
          <p className="mt-4 max-w-sm text-muted">
            Quick answers before you get in touch. Anything else, just{" "}
            <Link to="/contact" className="font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4">
              ask the business
            </Link>
            .
          </p>
        </Reveal>

        <div className="space-y-3 lg:col-span-7 lg:col-start-6">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <details className="group rounded-2xl bg-white ring-1 ring-ink/5 open:shadow-[0_16px_36px_-28px_rgb(43_58_78/0.4)]">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold sm:px-6 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cloud text-tide-deep transition-transform duration-300 group-open:rotate-45"
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="px-5 pb-5 text-muted sm:px-6">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
