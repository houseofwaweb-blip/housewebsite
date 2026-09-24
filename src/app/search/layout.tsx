export const metadata = {
  // Just "Search" — the root layout's title template appends
  // "| House of Willow Alexander" (avoids the duplicated site name).
  title: "Search",
  robots: { index: false, follow: true },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
