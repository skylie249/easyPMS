import { HtmlLangSync } from "@/components/html-lang-sync";

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HtmlLangSync lang="en" />
      {children}
    </>
  );
}
