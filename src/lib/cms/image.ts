import imageUrlBuilder from "@sanity/image-url";
import { env } from "@/lib/env";

const builder = imageUrlBuilder({
  projectId: env.SANITY_PROJECT_ID ?? env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: env.SANITY_DATASET,
});

// Accept any Sanity image-ish value (document, asset ref, URL, etc).
// Using the public builder's loose signature avoids pulling the internal
// Sanity types that aren't exported from the package.
export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source).auto("format");
}
