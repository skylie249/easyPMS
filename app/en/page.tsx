import type { Metadata } from "next";
import { HomeClient } from "@/components/home-client";

export const metadata: Metadata = {
  title: "Easy PMS Checklist",
  description:
    "Track SI project readiness and PMP checklist essentials on your phone.",
};

export default function HomePageEn() {
  return <HomeClient lang="en" />;
}
