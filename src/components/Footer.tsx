import { Link } from "react-router";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { scrollToTarget } from "../lib/smoothScroll";
import { nav, site } from "../config/site";
import { services } from "../data/services";
import { Logo } from "./Logo";
import { FaintImage } from "./FaintImage";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-paper">
      <FaintImage name="pool-caustics" fade="left" opacity={0.08} blend="screen" position="60% 40%" />
      
      {/* Extra bottom padding on small screens keeps the WhatsApp button clear of the legal line. */}
      <div className="shell pt-20 pb-24 sm:pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo tone="light" variant="full" className="h-auto w-56 sm:w-64" />
            <p className="mt-6 max-w-sm text-mist">
              A local plumbing business based in {site.location.area}, {site.location.city}, offering plumbing repairs,
              installations, water leak detection and geyser services.
            </p>
            <a
              href={site.phone.mobile.href}
              className="group mt-8 inline-flex items-center gap-3 text-2xl font-bold tracking-[-0.03em] text-paper sm:text-3xl"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                <span className="sr-only">Call </span>
                {site.phone.mobile.display}
              </span>
              <ArrowUpRight aria-hidden="true" className="h-6 w-6 text-signal transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4">
            <FooterColumn title="Navigate">
              {nav.map((item) => (
                <li key={item.to}>
                  <FooterLink to={item.to}>{item.label}</FooterLink>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Services">
              {services.map((s) => (
                <li key={s.id}>
                  <FooterLink to={`/services#${s.id}`}>{s.title}</FooterLink>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Contact">
              <li>
                <span className="block text-sm text-mist">Mobile</span>
                <a className="font-semibold hover:text-tide" href={site.phone.mobile.href}>
                  {site.phone.mobile.display}
                </a>
              </li>
              <li>
                <span className="block text-sm text-mist">Landline</span>
                <a className="font-semibold hover:text-tide" href={site.phone.landline.href}>
                  {site.phone.landline.display}
                </a>
              </li>
              <li>
                <span className="block text-sm text-mist">Email</span>
                <a className="text-[0.95rem] font-semibold [overflow-wrap:anywhere] hover:text-tide sm:text-base" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
            </FooterColumn>

            <FooterColumn title="Location">
              <li>
                <address className="not-italic leading-relaxed">
                  {site.location.area}
                  <br />
                  {site.location.city}
                  <br />
                  {site.location.region}
                  <br />
                  {site.location.country}
                </address>
              </li>
              <li className="text-sm text-mist">Contact person: {site.contactPerson}</li>
            </FooterColumn>
          </nav>
        </div>

        <div className="relative flex flex-col gap-3 mt-16 border-t border-paper/10 pt-6 text-sm text-mist sm:flex-row sm:items-center sm:justify-between sm:pr-20">
          <p>
            © <span suppressHydrationWarning>{year}</span> {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p>Photography is illustrative.</p>
            <button
              type="button"
              onClick={() => scrollToTarget(0)}
              className="group inline-flex min-h-11 items-center gap-3 font-semibold text-paper"
            >
              Back to top
              <span className="flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-paper/25 transition-all duration-300 group-hover:bg-signal group-hover:text-ink group-hover:ring-signal">
                <ArrowUp aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="label text-signal">{title}</h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="inline-block py-0.5 text-paper/85 transition-colors hover:text-tide">
      {children}
    </Link>
  );
}
