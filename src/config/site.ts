// Single source of truth for verified business details and feature toggles.
// Only add information here once it has been confirmed by the business.

export const site = {
  name: "Cummings Plumbing CC",
  shortName: "Cummings Plumbing",
  contactPerson: "Nizaam Cummings",
  location: {
    area: "Westgate",
    city: "Cape Town",
    region: "Western Cape",
    country: "South Africa",
    countryCode: "ZA",
  },
  phone: {
    mobile: { display: "082 970 8280", href: "tel:+27829708280" },
    landline: { display: "021 374 9188", href: "tel:+27213749188" },
  },
  email: "nizaam@mweb.co.za",

  // UNCONFIRMED: replace with the live domain before deploying (used for canonical URLs,
  // Open Graph, sitemap.xml and structured data). Can also be set via VITE_SITE_URL.
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://www.cummingsplumbing.co.za",

  // Floating WhatsApp button (bottom-right, every page). Uses the mobile number.
  // NOTE: confirm with the business that 082 970 8280 is active on WhatsApp before launch;
  // set enabled: false to hide the button site-wide.
  whatsapp: {
    enabled: true,
    number: "27829708280",
    message: "Hello Cummings Plumbing CC, I'd like to enquire about a plumbing service.",
  },

  // Contact form delivery. Set VITE_FORM_ENDPOINT to a JSON-accepting form service
  // (e.g. Formspree https://formspree.io/f/xxxx, or a Web3Forms-style endpoint) to enable
  // direct delivery. When unset, the form falls back to opening the visitor's email app.
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || null,
  formAccessKey: (import.meta.env.VITE_FORM_ACCESS_KEY as string | undefined) || null,
} as const;

export const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
] as const;
