// Builds logo variants and icons from the client's logo artwork (src/logo.png).
// Run: node scripts/build-logo.mjs
//
// Outputs (public/brand/):
//   logo-full.webp / logo-full-light.webp   full lockup incl. tagline (light = for dark backgrounds)
//   logo-nav.webp  / logo-nav-light.webp    lockup without the tagline (legible at navbar size)
//   mark.webp                               the drop mark on its own
// plus public/favicon-32.png, public/favicon-48.png, public/apple-touch-icon.png, public/logo.png

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "src", "logo.png");
const OUT = path.join(ROOT, "public", "brand");

// Measured from the artwork (866×288): the drop mark ends at x≈250; the tagline starts at y≈224
// in the wordmark area. Pixels darker than this luminance in the wordmark are the navy lettering.
const MARK_RIGHT = 250;
const TAGLINE_TOP = 224;
const NAVY_LUMINANCE = 0.2;

await fs.mkdir(OUT, { recursive: true });

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

const lin = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);

function variant({ light = false, tagline = true }) {
  const buf = Buffer.from(data);
  for (let y = 0; y < height; y++) {
    for (let x = MARK_RIGHT; x < width; x++) {
      const i = (y * width + x) * 4;
      if (!tagline && y >= TAGLINE_TOP) {
        buf[i + 3] = 0;
        continue;
      }
      if (light && buf[i + 3] > 0 && luminance(buf[i], buf[i + 1], buf[i + 2]) < NAVY_LUMINANCE) {
        buf[i] = buf[i + 1] = buf[i + 2] = 255;
      }
    }
  }
  return sharp(buf, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

const trim = (buf) => sharp(buf).trim({ threshold: 1 }).png().toBuffer();

const variants = {
  "logo-full": await trim(await variant({})),
  "logo-full-light": await trim(await variant({ light: true })),
  "logo-nav": await trim(await variant({ tagline: false })),
  "logo-nav-light": await trim(await variant({ light: true, tagline: false })),
};

for (const [name, buf] of Object.entries(variants)) {
  const resized = name.startsWith("logo-nav") ? sharp(buf).resize({ height: 112 }) : sharp(buf).resize({ width: 560 });
  await resized.clone().webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(OUT, `${name}.webp`));
}

// Mark only (left part of the artwork), squared with transparent padding.
const markCrop = await sharp(SRC).extract({ left: 0, top: 0, width: MARK_RIGHT, height }).png().toBuffer();
const markBuf = await trim(markCrop);
const square = async (size, pad, background) =>
  sharp(markBuf)
    .resize({ width: size - pad * 2, height: size - pad * 2, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background })
    .png({ compressionLevel: 9 });

const clear = { r: 0, g: 0, b: 0, alpha: 0 };
await (await square(128, 4, clear)).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(OUT, "mark.webp"));
await (await square(32, 1, clear)).toFile(path.join(ROOT, "public", "favicon-32.png"));
await (await square(48, 2, clear)).toFile(path.join(ROOT, "public", "favicon-48.png"));
await (await square(180, 22, { r: 255, g: 255, b: 255, alpha: 1 })).toFile(path.join(ROOT, "public", "apple-touch-icon.png"));
await sharp(variants["logo-full"]).resize({ width: 600 }).png({ compressionLevel: 9 }).toFile(path.join(ROOT, "public", "logo.png"));

for (const f of await fs.readdir(OUT)) {
  const m = await sharp(path.join(OUT, f)).metadata();
  console.log(f, `${m.width}x${m.height}`);
}
