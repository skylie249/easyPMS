import type { Metadata } from "next";
import { ChecklistClient } from "@/components/checklist-client";

export const metadata: Metadata = {
  title: "Project Checklist | Easy PMS",
};

export default async function ProjectPageEn({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return <ChecklistClient shareCode={code.toUpperCase()} lang="en" />;
}
