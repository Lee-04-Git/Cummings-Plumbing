// Downloads the illustrative stock photography (Unsplash License) and generates
// responsive WebP variants + tiny blur placeholders into public/images.
// Run: node scripts/build-images.mjs
//
// To swap in real project photos later: drop a JPG into scripts/.image-cache/<key>.jpg
// (or add a new entry with `local: true`) and re-run — no component changes required.

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const CACHE = path.join(ROOT, "scripts", ".image-cache");
const OUT = path.join(ROOT, "public", "images");
const MANIFEST = path.join(ROOT, "src", "data", "image-manifest.json");
const WIDTHS = [480, 800, 1200, 1800];

// [key, Unsplash photo id, Unsplash page id, photographer] — all Unsplash License, illustrative only.
const SOURCES = [
  ["brass-fitting", "photo-1760571327612-8ab776dcd462", "9Y3YGj7f9e8", "Unsplash"],
  ["leaking-valve", "photo-1596394723269-b2cbca4e6313", "n2ZufifTbSo", "Unsplash"],
  ["dripping-tap", "photo-1560673429-b9b9338a360a", "erU5Nk7W7Ek", "Mukesh Sharma"],
  ["outdoor-tap", "photo-1669920282671-e2f03e99513f", "AdA6DeV659Q", "Unsplash"],
  ["geyser-cupboard", "photo-1722604831786-656f0bac1502", "g2Qx3XCiIUo", "Unsplash"],
  ["geyser-wrench", "photo-1620653713380-7a34b773fef8", "C-oYJoIfgCs", "Marian Florinel Condruz"],
  ["solar-geyser", "photo-1723407653103-7a9c6b579acf", "yFHVzQpzm2g", "Unsplash"],
  ["wrench-tools", "photo-1673870861507-d72aa6855d89", "Cx5Lk7Rv-vE", "Unsplash"],
  ["wall-rough-in", "photo-1768321913920-d3ac011e0683", "gd8HUp22NgM", "Olek Buzunov"],
  ["kitchen-renovation", "photo-1618832515490-e181c4794a45", "UqNEbyRQ660", "Unsplash"],
  ["kitchen-sink", "photo-1723902499498-dfd905f25cce", "kgkHwyZImdc", "Unsplash"],
  ["tool-belt", "photo-1765518440022-10242cc86895", "bzVQ_fceXJk", "Unsplash"],
  ["bo-kaap-mountain", "photo-1733886870851-82f45e3fad3c", "rwFKviLlYJ8", "Unsplash"],
  ["plumber-under-basin", "photo-1676210134188-4c05dd172f89", "c314Gh8dXAo", "Timur Shakerzianov"],
  ["copper-pipes-dark-wall", "photo-1578697413954-043f88933241", "ZqC8zRr4JoI", "Unsplash"],
  ["pipe-manifold-brick", "photo-1607472586893-edb57bdc0e39", "4CNNH2KEjhc", "Compagnons"],
  ["wrench-under-basin", "photo-1676210134190-3f2c0d5cf58d", "kxuz4YrLxSc", "Timur Shakerzianov"],
  ["wall-tap", "photo-1681249537103-9e0c7316d91e", "w2bzXCx7Y3g", "Unsplash"],
  ["copper-junction", "photo-1769376695235-d3253548a5d7", "h5If_bg7898", "Zach M"],
  ["water-ripples", "photo-1511198922712-e31c72f8fcd4", "kKpTHqM2K-c", "Unsplash"],
  ["pool-caustics", "photo-1505236732171-72a5b19c4981", "3Ik7xWYJv3U", "Unsplash"],
  ["water-drop-ripple", "photo-1527066236128-2ff79f7b9705", "rrfdqjJWwmU", "Unsplash"],
  ["tap-running", "photo-1521207418485-99c705420785", "vDQ-e3RtaoE", "Unsplash"],
  ["toolbag-floor", "photo-1783587354869-de09cfffaf9a", "4kgJW92pVTk", "Unsplash"],
];

await fs.mkdir(CACHE, { recursive: true });
await fs.mkdir(OUT, { recursive: true });

const manifest = {};

for (const [key, photoId, unsplashId, author] of SOURCES) {
  const cached = path.join(CACHE, `${key}.jpg`);
  try {
    await fs.access(cached);
  } catch {
    const url = `https://images.unsplash.com/${photoId}?w=2400&q=85&fm=jpg`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed ${key}: ${res.status}`);
    await fs.writeFile(cached, Buffer.from(await res.arrayBuffer()));
    console.log(`downloaded ${key}`);
  }

  const img = sharp(cached).rotate();
  const { width, height } = await img.metadata();
  const widths = WIDTHS.filter((w) => w <= width);

  for (const w of widths) {
    await img
      .clone()
      .resize({ width: w })
      .webp({ quality: w <= 800 ? 72 : 68, effort: 5 })
      .toFile(path.join(OUT, `${key}-${w}.webp`));
  }

  const lqip = await img.clone().resize({ width: 20 }).blur(1.2).webp({ quality: 40 }).toBuffer();

  manifest[key] = {
    width,
    height,
    widths,
    lqip: `data:image/webp;base64,${lqip.toString("base64")}`,
    credit: { author, url: `https://unsplash.com/photos/${unsplashId}`, source: "Unsplash" },
  };
}

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`wrote ${Object.keys(manifest).length} images`);

// Open Graph images (1200×630 JPEG) for the images referenced in src/data/pages.ts.
const OG = path.join(ROOT, "public", "og");
await fs.mkdir(OG, { recursive: true });
for (const key of ["wrench-tools", "tap-running", "pipe-manifold-brick", "plumber-under-basin"]) {
  await sharp(path.join(CACHE, `${key}.jpg`))
    .rotate()
    .resize(1200, 630, { fit: "cover", position: sharp.strategy.attention })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(path.join(OG, `${key}.jpg`));
}

console.log("wrote og images (icons come from scripts/build-logo.mjs)");
