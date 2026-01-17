import { isValidLanguage } from "@/lib/i18n/locale";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function AccountPage({ params }: PageProps) {
  const { lang } = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  redirect(`/${lang}/login`);
}
