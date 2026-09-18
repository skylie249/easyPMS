import { ChecklistClient } from "@/components/checklist-client";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return <ChecklistClient shareCode={code.toUpperCase()} lang="ko" />;
}
