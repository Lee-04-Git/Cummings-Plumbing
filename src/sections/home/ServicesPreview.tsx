import { Link } from "react-router";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "../../components/Button";
import { FaintImage } from "../../components/FaintImage";
import { ServiceBento } from "../../components/ServiceBento";
import { Reveal, SectionLabel } from "../../components/motion";
import { site } from "../../config/site";

/**
 * "What we do": a dark showcase section. Four photo tiles (hover reveals the common signs on
 * desktop; swipeable on phones), then a nudge for anyone unsure which service they need.
 */
export function ServicesPreview() {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-20 pb-24 text-white sm:pt-24 sm:pb-28" aria-labelledby="services-title">
      <FaintImage name="pool-caustics" fade="left" opacity={0.07} blend="screen" position="50% 40%" />

      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionLabel tone="light">What we do</SectionLabel>
            <h2 id="services-title" className="display-lg mt-4">
              Plumbing services, <span className="text-signal">made simple.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="text-white/70">
              Four areas of work for homes and businesses — from a small drip to a full install. Hover a service to see
              the common signs.
            </p>
            <Link to="/services" className="group mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-white">
              <span className="border-b-2 border-signal pb-0.5">All services</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 sm:mt-14">
          <ServiceBento href={(s) => `/services#${s.id}`} revealSigns />
          <p className="mt-3 text-sm text-white/60 sm:hidden" aria-hidden="true">
            Swipe to see all four →
          </p>
        </div>

        <Reveal className="mt-8 flex flex-col items-start gap-4 rounded-[1.5rem] bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-sm sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <p className="font-display text-xl font-semibold [font-variation-settings:'SOFT'_100]">Not sure which one you need?</p>
            <p className="mt-1 text-white/70">Describe what you're noticing — the business can help from there.</p>
          </div>
          <Button to={site.phone.mobile.href} icon={Phone} arrow={false} className="w-full shrink-0 sm:w-auto">
            Call {site.phone.mobile.display}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
