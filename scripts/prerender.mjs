// Renders every route to static HTML after `vite build` + SSR build, then writes sitemap.xml and robots.txt.
// Gives crawlers and link previews real content and per-page <head> tags; the client hydrates on load.

import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST = path.join(ROOT, "dist");
const SERVER_ENTRY = path.join(ROOT, "dist-server", "entry-server.js");

const { render, headTags, routes, sitemapXml, siteUrl } = await import(pathToFileURL(SERVER_ENTRY).href);
const template = await fs.readFile(path.join(DIST, "index.html"), "utf-8");

// data-route lets the client hydrate only when the served HTML matches the URL (some hosts fall back to index.html).
const page = (url) =>
  template
    .replace("<!--head-tags-->", headTags(url))
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-route="${url}">${render(url)}</div>`);

for (const url of routes) {
  const file = url === "/" ? path.join(DIST, "index.html") : path.join(DIST, url.slice(1), "index.html");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, page(url));
  console.log(`prerendered ${url}`);
}

await fs.writeFile(path.join(DIST, "404.html"), page("/404"));
await fs.writeFile(path.join(DIST, "sitemap.xml"), sitemapXml());
await fs.writeFile(
  path.join(DIST, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", siteUrl).toString()}\n`,
);
await fs.rm(path.join(ROOT, "dist-server"), { recursive: true, force: true });
console.log("wrote 404.html, sitemap.xml, robots.txt");
