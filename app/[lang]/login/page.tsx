import { isValidLanguage } from "@/lib/i18n/locale";
import { getTranslations } from "@/lib/i18n/translations";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = getTranslations(lang as 'en');

  return {
    title: t['login.title'],
  };
}

export default async function LoginPage({ params }: PageProps) {
  const { lang } = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  const t = getTranslations(lang);

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{t["login.title"]}</h1>
        </header>

        <div className="text-center py-12">
          <p className="text-muted-foreground">{t["login.suspended"]}</p>
        </div>
      </div>
    </main>
  );
}
