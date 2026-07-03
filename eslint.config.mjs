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
    // Ops/migration tooling and one-off scripts — Node CLIs, not part of the
    // app bundle. They legitimately use require()/Node APIs, so linting them
    // with the app's React/TS ruleset produces false errors.
    "scripts/**",
    "klaviyo/**",
    "shopify/**",
    "**/*.cjs",
    // Design/section handover code dumps kept in the repo root for reference.
    // Not imported by the app; not committed to CI. Ignore so they don't add
    // lint noise locally.
    "*-handover/**",
    "* Handover*/**",
    "* Handovers/**",
  ]),
  {
    // Editorial copy in JSX uses real apostrophes (don't, we're, it's) — the
    // brand voice is written, not template-engine-escaped. Disable the rule
    // rather than pepper hundreds of files with &apos; entities.
    rules: {
      "react/no-unescaped-entities": "off",
      // React Compiler lint rules (shipped as errors by eslint-config-next).
      // They flag patterns that work in production but aren't auto-memoisable
      // by the compiler (setState-in-effect, render-time reassignment, etc.).
      // Keep them visible as warnings — worth cleaning up over time — but they
      // must not block CI or fail the production build on a live site.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/incompatible-library": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/refs": "warn",
      // Allow underscore-prefixed unused vars (intentional ignore convention
      // for destructured fields we strip before persisting).
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
    },
  },
]);

export default eslintConfig;
