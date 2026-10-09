// Generates a manifest of each route's real last-edited date, keyed by route
// pattern (e.g. "/the-house/about" or "/services/[slug]"), from git history.
//
// Why: sitemap.ts previously stamped every static/templated route with the
// build time (new Date()), so 307 URLs shared one identical lastmod. Google
// reads that as "nothing ever changes here". This manifest records each page
// file's last commit date at build time (where the git history IS available),
// so the sitemap can report honest per-page dates. Template-driven routes
// (every /services/[slug], etc.) share their template file's date, which is
// genuinely their last-edited date (Search Console audit, Part 3.4).
//
// Runs as `prebuild` (and can be run by hand). Output is committed so the app
// still builds if the prebuild step is skipped.
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const appDir = join(root, "src", "app");
const outFile = join(root, "src", "lib", "sitemap-lastmod.generated.json");

const PAGE_FILES = new Set(["page.tsx", "page.ts", "page.jsx", "page.js"]);
const ROUTE_FILES = new Set(["route.ts", "route.tsx", "route.js"]);

/** @param {string} dir @returns {string[]} absolute page/route file paths */
function walk(dir) {
  /** @type {string[]} */
  const out = [];
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    const st = statSync(abs);
    if (st.isDirectory()) {
      out.push(...walk(abs));
    } else if (PAGE_FILES.has(entry) || ROUTE_FILES.has(entry)) {
      out.push(abs);
    }
  }
  return out;
}

/** Turn an absolute page-file path into its route key, keeping [params] and
 *  dropping (route-group) segments. src/app/page.tsx -> "/". */
function routeKey(abs) {
  const rel = relative(appDir, abs).split(sep).join("/");
  const segments = rel
    .replace(/(^|\/)(page|route)\.(tsx|ts|jsx|js)$/, "")
    .split("/")
    .filter((s) => s && !/^\(.*\)$/.test(s)); // drop route groups like (marketing)
  return "/" + segments.join("/");
}

/** Last commit date (ISO) for a file, or its mtime if not committed yet. */
function lastEdited(abs) {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${abs}"`, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (iso) return iso;
  } catch {
    // fall through to mtime
  }
  return statSync(abs).mtime.toISOString();
}

const files = walk(appDir);
/** @type {Record<string, string>} */
const manifest = {};
for (const abs of files) {
  const key = routeKey(abs);
  // Keep the most recent date if two files ever collide on a key.
  const iso = lastEdited(abs);
  if (!manifest[key] || iso > manifest[key]) manifest[key] = iso;
}

const sorted = Object.fromEntries(
  Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
);
writeFileSync(outFile, JSON.stringify(sorted, null, 0) + "\n");
console.log(
  `[gen-sitemap-lastmod] wrote ${Object.keys(sorted).length} route dates to ${relative(root, outFile)}`,
);
