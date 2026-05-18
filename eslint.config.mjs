import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Sanity Studio's pre-built bundle. ~500KB+ per file, deoptimises Babel
    // and OOMs Node when linted. These are vendor artefacts, not our source.
    "dist/**",
  ]),
  {
    // Editorial copy in JSX uses real apostrophes (don't, we're, it's) — the
    // brand voice is written, not template-engine-escaped. Disable the rule
    // rather than pepper hundreds of files with &apos; entities.
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
