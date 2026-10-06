// Generates a manifest of every file under public/services/ as web paths
// (e.g. "/services/photos/gardening/garden-clearance-hero.webp").
//
// Why: the service pages used `fs.existsSync(public/...)` at render time to
// decide whether to show a real hero or a placeholder. On Vercel, public/
// assets live on the CDN, NOT on the serverless function's filesystem, so that
// check returned false for EVERY image in production and every service page
// fell back to the "Coming Soon" card (and every sub-service to the handyman
// photo). This manifest is built here, where public/ IS on disk, and imported
// into the bundle so the existence check runs in memory at runtime instead.
//
// Runs as `prebuild` (and can be run by hand). Keep the output committed so the
// app still builds if the prebuild step is skipped.
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const servicesDir = join(root, "public", "services");
const outFile = join(root, "src", "lib", "services-data", "service-image-manifest.json");

/** @param {string} dir */
function walk(dir) {
  /** @type {string[]} */
  const out = [];
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    if (statSync(abs).isDirectory()) {
      out.push(...walk(abs));
    } else {
      // "/services/..." web path, forward slashes on every OS.
      out.push("/" + relative(join(root, "public"), abs).split(sep).join("/"));
    }
  }
  return out;
}

const files = walk(servicesDir).sort();
writeFileSync(outFile, JSON.stringify(files, null, 0) + "\n");
console.log(`[gen-service-image-manifest] wrote ${files.length} paths to ${relative(root, outFile)}`);
