import { site } from "./config/site";
import { notFoundMeta, pages, type PageMeta } from "./data/pages";
import { services } from "./data/services";

export const routes = Object.values(pages).map((p) => p.path);

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Structured data uses only verified business information.
 * No ratings, reviews, opening hours or street address are included.
 */
function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    image: new URL("/og/wrench-tools.jpg", site.url).toString(),
    logo: new URL("/logo.png", site.url).toString(),
    telephone: ["+27829708280", "+27213749188"],
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: `${site.location.area}, ${site.location.city}`,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    areaServed: { "@type": "City", name: site.location.city },
    contactPoint: [
      { "@type": "ContactPoint", telephone: "+27829708280", contactType: "customer service", name: site.contactPerson },
      { "@type": "ContactPoint", telephone: "+27213749188", contactType: "customer service" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plumbing services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/services#${s.id}` },
      })),
    },
  };
}

export function headTags(path: string) {
  const meta: PageMeta = Object.values(pages).find((p) => p.path === path) ?? notFoundMeta;
  const url = new URL(meta.path, site.url).toString();
  const image = new URL(`/og/${meta.ogImage}.jpg`, site.url).toString();

  const tags = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    meta === notFoundMeta ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(site.name)}" />`,
    `<meta property="og:locale" content="en_ZA" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(meta.title)}" />`,
    `<meta name="twitter:description" content="${escape(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ];

  if (path === "/") {
    tags.push(`<script type="application/ld+json">${JSON.stringify(localBusinessSchema())}</script>`);
  }
  return tags.join("\n    ");
}

export function sitemapXml() {
  const urls = routes
    .map((path) => `  <url><loc>${new URL(path, site.url).toString()}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
