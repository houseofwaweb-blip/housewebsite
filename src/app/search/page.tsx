import { SectionStub } from "@/components/primitives/SectionStub";

export const metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <SectionStub
      eyebrow="Search"
      title="Find something across the House."
      body="Unified search across Sanity content and Shopify products. In build."
    />
  );
}
