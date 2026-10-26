# Cummings Plumbing CC — Website

React 19 · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) · React Router · Lenis. Pages are prerendered to static HTML at build time.

```bash
npm install
npm run dev       # local development
npm run build     # type-check, build, prerender every page + sitemap.xml + robots.txt into dist/
npm run preview   # serve dist/ locally
npm run images    # re-download / re-generate responsive images (scripts/build-images.mjs)
```

Deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages). Each route is a real HTML file (`/services/index.html`, …).

## Before going live

All business details live in [`src/config/site.ts`](src/config/site.ts).

1. **Domain** — set the live URL (`url`, or `VITE_SITE_URL`). It feeds canonical tags, Open Graph, the sitemap and structured data. The current value is a placeholder.
2. **WhatsApp** — the floating button and "Send via WhatsApp" use the mobile number (082 970 8280). Confirm the number is on WhatsApp, or set `whatsapp.enabled: false`.
3. **Contact form delivery** — by default the form opens the visitor's WhatsApp or email app with the message written out (nothing is sent until they press Send). For direct delivery, set `VITE_FORM_ENDPOINT` (e.g. a Formspree form URL, plus `VITE_FORM_ACCESS_KEY` for Web3Forms-style services). The form only reports success after a real 2xx response.
4. **Photography** — every photo is illustrative stock. To use real project photos, put a JPG at `scripts/.image-cache/<key>.jpg`, run `npm run images`, and set `illustrative: false` on that item in `src/data/gallery.ts`.

See [DESIGN.md](DESIGN.md) for the design system.
