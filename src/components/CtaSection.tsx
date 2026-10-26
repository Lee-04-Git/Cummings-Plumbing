import { Mail, Phone } from "lucide-react";
import { site } from "../config/site";
import { Button } from "./Button";
import { HandNote, Reveal } from "./motion";
import { FaintImage } from "./FaintImage";

/** Closing call to action, shared by every page: a plain navy band, nothing to decode. */
export function CtaSection() {
  return (
    <section className="relative isolate overflow-hidden bg-mint text-ink" aria-labelledby="cta-title">
      <FaintImage name="pool-caustics" fade="left" opacity={0.28} position="60% 50%" />
      <div className="shell grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-7">
          <h2 id="cta-title" className="display-lg">
            Need plumbing assistance?
          </h2>
          <p className="lede mt-4 max-w-xl text-muted">
            Speak directly with {site.name} about your plumbing requirements.
          </p>
        </Reveal>
        <Reveal className="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end" delay={0.1}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to={site.phone.mobile.href} icon={Phone} size="lg" arrow={false}>
              Call {site.phone.mobile.display}
            </Button>
            <Button to="/contact" variant="outline-dark" icon={Mail} size="lg" arrow={false}>
              Send an enquiry
            </Button>
          </div>
          {site.whatsapp.enabled && (
            <HandNote direction="up" className="text-tide-deep lg:mr-24">
              or WhatsApp the same number
            </HandNote>
          )}
        </Reveal>
      </div>
    </section>
  );
}
