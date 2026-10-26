# Cummings Plumbing CC — Design System

## Direction: "a real local business"

The site should feel made by a person for a local trade, not generated from a template:

- **Documentary photography** — natural light, real rooms, hands at work. No staged colour-lit shots, no glossy show-bathrooms.
- **Photos in white frames** — softly shadowed, straight (cards and photos are never tilted).
- **Hand marks, used sparingly** — a marker underline on one headline word, handwritten step numbers with hand-drawn arrows, one handwritten note per section at most.
- **Plain-spoken copy** — sentence case, short sentences, no slogans or decorative labels.
- **The business card** — contact details presented as Nizaam's business card, not a data table.
- **Aligned cards** — service cards use CSS subgrid so images, titles, text and links line up across a row.

Avoided on purpose (common "AI site" tells): mono uppercase eyebrows with numbers, two-tone giant headlines,
glassy badges, outline numerals, wave/grain/grid ornaments, oversized footer watermarks,
magnetic buttons and scroll-progress bars.

## Palette — "Soft Shore"

Soft, welcoming neutrals with one gentle dark (slate-navy) and a soft seafoam for actions, analogous to the blues so nothing clashes. Every text pair ≥ 4.5:1.

| Token        | Hex       | Role |
|--------------|-----------|------|
| `paper`      | `#FFFBF6` | Soft cream page background |
| `cloud`      | `#EEF4F8` | Powder blue sections |
| `mint`       | `#E6F4F1` | Soft mint sections (closing call to action, icon tiles) |
| `ink`        | `#2B3A4E` | Soft slate-navy — text, hero tint, footer (11:1 on cream) |
| `tide-deep`  | `#356A9F` | Dusty brand blue — labels, icons, links (5.5:1) |
| `sky`        | `#C6E2F7` | Labels on slate-navy |
| `signal`     | `#86CBC1` | Seafoam — buttons and the headline accent only (slate text on it 6.2:1) |
| `signal-deep`| `#287067` | Seafoam for small text and icons on light (5.3:1) |
| `muted`      | `#5B6878` | Secondary text |

## Typography

- **Fraunces** (soft axis 100) — headings, sentence case, weight 600.
- **Manrope** — body, 17px / 1.6.
- **Caveat** — handwritten notes only (2–3 per page at most).

## Page structure

Every page opens with `HeroBanner` (`src/components/HeroBanner.tsx`): full-height documentary photo under a navy wash,
headline with one amber accent word, Call button + secondary action, a facts row and a gentle curve into the page.
Change content per page; keep the component shared.

Home: Hero → Services (photo cards, text below) → How it works → About + business card → soft mint CTA band.

Mobile menu: "Menu" pill with a three-line icon (folds into an X) → light cream sheet with large serif links,
a seafoam active marker, full-width Call / WhatsApp buttons and the remaining contact details.

Services: Hero → "Not sure what you need?" symptom finder (cards jump to sections) → sticky service tabs →
four service chapters on alternating cream / powder-blue backgrounds (photo, summary, "Signs you may need this") → note → CTA.

## Motion

Gentle and purposeful: short fade-ups on scroll, a slow hero photo zoom and parallax, the marker underline drawing once,
page cross-fades and Lenis smooth scrolling. All of it is disabled or reduced under `prefers-reduced-motion`.

## Content rules

- Only verified details: name, contact person, Westgate location, phone numbers, email, four service categories.
- No invented history, qualifications, guarantees, response times, ratings or testimonials.
- All photography is illustrative stock (Unsplash License); the footer states this.
