'use client';

import { useTranslations } from '@/lib/i18n/use-translations';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <h1 className="text-2xl font-bold mb-4">{t['error.title']}</h1>
        <p className="text-muted-foreground mb-6">
          {error.message || t['error.message']}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          {t['error.tryAgain']}
        </button>
      </div>
    </main>
  );
}
