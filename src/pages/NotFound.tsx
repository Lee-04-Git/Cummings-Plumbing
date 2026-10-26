import { Phone } from "lucide-react";
import { Accent, HeroBanner } from "../components/HeroBanner";
import { PageMeta } from "../components/PageMeta";
import { site } from "../config/site";
import { notFoundMeta } from "../data/pages";

export default function NotFound() {
  return (
    <>
      <PageMeta meta={notFoundMeta} />
      <HeroBanner
        label="Error 404"
        lines={[
          "This pipe leads",
          <>
            <Accent>nowhere.</Accent>
          </>,
        ]}
        subheading="The page you're looking for doesn't exist or has moved."
        actions={[
          { to: "/", label: "Back to home" },
          { to: site.phone.mobile.href, label: `Call ${site.phone.mobile.display}`, icon: Phone },
        ]}
        image="wall-tap"
        imageAlt="A brass outdoor tap mounted on a wall"
        position="60% 50%"
        mobilePosition="55% 50%"
      />
    </>
  );
}
