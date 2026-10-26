import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "../config/site";
import { LogoMark } from "./Logo";

/** The business's details laid out like a printed business card. */
export function BusinessCard({ className = "" }: { className?: string }) {
  const rows = [
    { icon: Phone, label: "Mobile", value: site.phone.mobile.display, href: site.phone.mobile.href },
    { icon: Phone, label: "Landline", value: site.phone.landline.display, href: site.phone.landline.href },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Based in", value: `${site.location.area}, ${site.location.city}` },
  ];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_2px_4px_rgb(43_58_78/0.04),0_24px_48px_-28px_rgb(43_58_78/0.35)] ring-1 ring-ink/5 sm:p-8 ${className}`}
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-signal" />
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <LogoMark className="h-9 w-9" />
          <span className="text-sm font-bold">{site.name}</span>
        </div>
        <span className="text-xs text-muted">Plumbing</span>
      </div>

      <p className="mt-6 font-display text-[1.75rem] leading-none font-semibold [font-variation-settings:'SOFT'_100]">
        {site.contactPerson}
      </p>

      <dl className="mt-6 space-y-3">
        {rows.map(({ icon: Icon, label, value, href }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-tide-deep" />
            <dt className="sr-only">{label}</dt>
            <dd className="min-w-0 break-words">
              {href ? (
                <a href={href} className="font-semibold underline-offset-4 hover:underline">
                  {value}
                </a>
              ) : (
                <span className="font-semibold">{value}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
