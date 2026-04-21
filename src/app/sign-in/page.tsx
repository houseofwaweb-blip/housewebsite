import { SectionStub } from "@/components/primitives/SectionStub";

export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <SectionStub
      eyebrow="Account"
      title="Sign in to HoWA."
      body="Auth handled by the HoWA Product app. This page redirects once HOWA_APP_LIVE is true."
      state="coming"
    />
  );
}
