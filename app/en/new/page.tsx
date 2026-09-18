import type { Metadata } from "next";
import { NewProjectClient } from "@/components/new-project-client";

export const metadata: Metadata = {
  title: "Create a New Project | Easy PMS",
  description: "Create a new SI project checklist from the built-in template.",
};

export default function NewProjectPageEn() {
  return <NewProjectClient lang="en" />;
}
