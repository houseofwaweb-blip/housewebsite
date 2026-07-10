import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PersonaPage } from "@/components/household/PersonaPage";
import { PERSONAS } from "@/components/household/personaData";

/**
 * /household/[role] — a free Household door (persona "room" page). One template
 * (PersonaPage) driven by one data file (personaData) renders all five, per
 * PERSONA-ROOM-PAGES-HANDOVER.md. The two paid seniors (Housekeeper, Steward)
 * live at /howa/housekeeper and /howa/steward.
 */

export function generateStaticParams() {
  return Object.keys(PERSONAS).map((role) => ({ role }));
}

export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const { role } = await params;
  const persona = PERSONAS[role];
  if (!persona) return { title: "Household role not found" };
  return {
    title: persona.metaTitle,
    description: persona.metaDescription,
  };
}

export default async function RolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const persona = PERSONAS[role];
  if (!persona) notFound();
  return <PersonaPage persona={persona} />;
}
