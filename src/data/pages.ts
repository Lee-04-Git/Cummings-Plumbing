import type { ImageKey } from "../components/Img";

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  ogImage: ImageKey;
};

export const pages = {
  home: {
    path: "/",
    title: "Cummings Plumbing CC | Plumbing Services in Cape Town",
    description:
      "Plumbing repairs, installations, water leak detection and geyser services for homes and businesses. Cummings Plumbing CC is based in Westgate, Cape Town. Call 082 970 8280.",
    ogImage: "wrench-tools",
  },
  services: {
    path: "/services",
    title: "Plumbing Services | Leak Detection, Geysers, Repairs & Installations | Cummings Plumbing CC",
    description:
      "Water leak detection, geyser services, plumbing repairs & replacements and plumbing installations from Cummings Plumbing CC in Westgate, Cape Town.",
    ogImage: "tap-running",
  },
  about: {
    path: "/about",
    title: "About | Cummings Plumbing CC, Westgate, Cape Town",
    description:
      "Cummings Plumbing CC is a local plumbing business based in Westgate, Cape Town, offering repairs, installations, leak detection and geyser-related services.",
    ogImage: "pipe-manifold-brick",
  },
  contact: {
    path: "/contact",
    title: "Contact | Cummings Plumbing CC | 082 970 8280",
    description:
      "Contact Cummings Plumbing CC in Westgate, Cape Town. Mobile 082 970 8280, landline 021 374 9188, email nizaam@mweb.co.za, or send an enquiry online.",
    ogImage: "plumber-under-basin",
  },
} satisfies Record<string, PageMeta>;

export const notFoundMeta: PageMeta = {
  path: "/404",
  title: "Page not found | Cummings Plumbing CC",
  description: "The page you were looking for could not be found.",
  ogImage: "plumber-under-basin",
};
