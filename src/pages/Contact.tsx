import { useLocation } from "react-router";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { BusinessCard } from "../components/BusinessCard";
import { ContactForm } from "../components/ContactForm";
import { Accent, HeroBanner } from "../components/HeroBanner";
import { PageMeta } from "../components/PageMeta";
import { Reveal, SectionLabel } from "../components/motion";
import { site } from "../config/site";
import { pages } from "../data/pages";
import { FaintImage } from "../components/FaintImage";

export default function Contact() {
  const { search } = useLocation();
  const initialService = new URLSearchParams(search).get("service") ?? undefined;
  const whatsappHref = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`;

  return (
    <>
      <PageMeta meta={pages.contact} />
      <HeroBanner
        label={`Contact · ${site.location.area}, Cape Town`}
        lines={[
          "Got a plumbing problem?",
          <>
            <Accent>Let's talk.</Accent>
          </>,
        ]}
        subheading="Call, WhatsApp or send an enquiry."
        intro={<p>Speak directly with {site.name} about your plumbing requirements and service availability.</p>}
        actions={[
          { to: site.phone.mobile.href, label: `Call ${site.phone.mobile.display}`, icon: Phone },
          ...(site.whatsapp.enabled ? [{ to: whatsappHref, label: "Chat on WhatsApp", icon: MessageCircle, variant: "whatsapp" as const }] : []),
          { to: "#enquiry", label: "Send an enquiry" },
        ]}
        facts={[
          { label: "Mobile", value: <a href={site.phone.mobile.href} className="hover:text-sky">{site.phone.mobile.display}</a> },
          { label: "Landline", value: <a href={site.phone.landline.href} className="hover:text-sky">{site.phone.landline.display}</a> },
          { label: "Email", value: <a href={`mailto:${site.email}`} className="break-all hover:text-sky">{site.email}</a> },
        ]}
        image="plumber-under-basin"
        imageAlt="A smiling plumber working on the pipes beneath a basin"
        position="72% 50%"
        mobilePosition="78% 50%"
      />

      <section className="relative isolate overflow-hidden bg-paper pt-8 pb-24 sm:pb-32" aria-label="Contact details and enquiry form">
        <FaintImage name="water-drop-ripple" fade="bottom" opacity={0.16} position="50% 55%" />
        <div className="shell grid gap-16 pt-12 lg:grid-cols-12 lg:gap-12 lg:pt-16">
          {/* Details */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <SectionLabel>Direct lines</SectionLabel>
                <h2 className="display-md mt-4">Speak to the business directly.</h2>
              </Reveal>
              <Reveal className="mt-8" delay={0.05}>
                <BusinessCard />
              </Reveal>

              {site.whatsapp.enabled && (
                <Reveal className="mt-8 flex items-start gap-4 rounded-2xl bg-cloud p-5" delay={0.1}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                    <MessageCircle aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">Prefer WhatsApp?</p>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-1 inline-flex items-center gap-1.5 text-muted hover:text-ink"
                    >
                      Message {site.phone.mobile.display}
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </div>
                </Reveal>
              )}

              <Reveal className="mt-6 text-sm text-muted" delay={0.12}>
                <p>
                  {site.location.region}, {site.location.country}. Contact the business to confirm availability in your
                  area.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Form */}
          <Reveal className="lg:col-span-7" y={32}>
            <div
              id="enquiry"
              className="scroll-mt-28 rounded-[1.75rem] bg-white p-6 shadow-[0_2px_4px_rgb(43_58_78/0.04),0_36px_72px_-40px_rgb(43_58_78/0.35)] ring-1 ring-ink/5 sm:p-10 lg:p-12"
            >
              <SectionLabel>Send an enquiry</SectionLabel>
              <h2 className="display-md mt-4">Tell us what's happening.</h2>
              <p className="mt-3 mb-10 text-muted">Share a few details and {site.name} can discuss your requirements with you.</p>
              <ContactForm initialService={initialService} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
