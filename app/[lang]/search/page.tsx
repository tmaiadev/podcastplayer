import { PodcastIndex } from "@/lib/podcast-index";
import { isValidLanguage } from "@/lib/i18n/locale";
import { getTranslations } from "@/lib/i18n/translations";
import { notFound } from "next/navigation";
import { PodcastCard } from "@/components/podcast/podcast-card";
import { SearchForm } from "./search-form";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const { q } = await searchParams;
  const t = getTranslations(lang as 'en');

  return {
    title: q ? `${q} - ${t['search.title']}` : t['search.title'],
  };
}

export default async function SearchPage({ params, searchParams }: PageProps) {
  const { lang } = await params;
  const { q } = await searchParams;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  const t = getTranslations(lang);
  const query = q?.trim() || "";

  let results = null;
  if (query) {
    const api = new PodcastIndex();
    const response = await api.search(query, { max: 50 });
    results = response.feeds;
  }

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-6">{t["search.title"]}</h1>
          <SearchForm
            initialQuery={query}
            placeholder={t["search.placeholder"]}
            language={lang}
          />
        </header>

        {/* Results section */}
        <div>
          {query ? (
            results && results.length > 0 ? (
              <>
                <p className="text-muted-foreground mb-6">
                  {results.length} {t["search.results"]}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {results.map((podcast) => (
                    <PodcastCard
                      key={podcast.id}
                      podcast={podcast}
                      language={lang}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-muted-foreground text-center py-12">
                {t["search.noResults"]}
              </p>
            )
          ) : (
            <p className="text-muted-foreground text-center py-12">
              {t["search.empty"]}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
