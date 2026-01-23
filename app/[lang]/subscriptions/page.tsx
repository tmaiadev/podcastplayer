import { isValidLanguage } from "@/lib/i18n/constants";
import { getTranslations } from "@/lib/i18n/translations";
import { notFound } from "next/navigation";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import type { Metadata } from "next";
import { SubscriptionsList } from "@/components/subscription/subscriptions-list";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = getTranslations(lang as 'en');

  return {
    title: t['subscriptions.title'],
  };
}

export default async function SubscriptionsPage({ params }: PageProps) {
  const { lang } = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  const t = getTranslations(lang);

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{t["subscriptions.title"]}</h1>
          <p className="text-muted-foreground">{t["subscriptions.description"]}</p>
        </header>

        <SignedOut>
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">{t["subscriptions.notSignedIn"]}</p>
            <SignInButton mode="modal">
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                {t["subscriptions.signIn"]}
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <SubscriptionsList language={lang} translations={t} />
        </SignedIn>
      </div>
    </main>
  );
}
