// Runs before `vite dev` and `vite build`; writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { allChapters } from "../src/data/bookContent";

const BASE_URL = "https://mostperfect.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/course", changefreq: "weekly", priority: "0.9" },
  { path: "/concepts", changefreq: "monthly", priority: "0.8" },
  { path: "/authors-note", changefreq: "yearly", priority: "0.6" },
  { path: "/workbooks", changefreq: "monthly", priority: "0.7" },
  { path: "/progress", changefreq: "monthly", priority: "0.4" },
];

const chapterEntries: SitemapEntry[] = allChapters.map((c) => ({
  path: `/read/${c.id}`,
  changefreq: "monthly",
  priority: "0.8",
}));

const entries = [...staticEntries, ...chapterEntries];

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n")
  ),
  `</urlset>`,
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${entries.length} entries)`);
