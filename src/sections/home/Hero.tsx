import { Phone } from "lucide-react";
import { Accent, HeroBanner } from "../../components/HeroBanner";
import { site } from "../../config/site";

export function Hero() {
  return (
    <HeroBanner
      titleId="hero-title"
      label={`Plumbing in ${site.location.area}, Cape Town`}
      lines={[
        "Reliable plumbing solutions,",
        <>
          <Accent>close to home.</Accent>
        </>,
      ]}
      subheading="Professional plumbing services in Cape Town."
      intro={
        <p>
          From plumbing repairs and installations to leak detection and geyser services, {site.name} provides plumbing
          services for homes and businesses in Cape Town.
        </p>
      }
      actions={[
        { to: site.phone.mobile.href, label: `Call ${site.phone.mobile.display}`, icon: Phone },
        { to: "/services", label: "Explore our services" },
      ]}
      facts={[
        { label: "Services", value: "4 core service areas" },
        { label: "Based in", value: `${site.location.area}, ${site.location.city}` },
        { label: "Speak to", value: site.contactPerson },
      ]}
      image="wrench-tools"
      imageAlt="Hands holding a pipe wrench in front of a wall of plumbing tools"
      position="62% 45%"
      mobilePosition="72% 50%"
    />
  );
}
