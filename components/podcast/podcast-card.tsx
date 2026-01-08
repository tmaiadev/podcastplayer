import Image from "next/image";
import type { Podcast } from "@/lib/podcast-index";
import type { SupportedLanguage } from "@/lib/i18n/constants";
import Link from "next/link";
import { getTranslations } from "@/lib/i18n/translations";

interface PodcastCardProps {
  podcast: Podcast;
  language: SupportedLanguage;
}

export function PodcastCard({ podcast, language }: PodcastCardProps) {
  const imageUrl = podcast.image || podcast.artwork;
  const author = podcast.author || podcast.ownerName;
  const link = `/podcast/${podcast.id}`;
  const t = getTranslations(language);

  return (
    <Link
      href={link}
      className="group w-60 shrink-0 scroll-snap-align-start flex flex-col gap-2 focus-visible:outline-none"
    >
      {/* Image container with overflow hidden for zoom effect */}
      <div className="overflow-hidden rounded-lg border-2 transition-shadow duration-300 group-hover:shadow-lg group-focus-visible:shadow-lg">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={podcast.title}
            width={240}
            height={240}
            className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110"
            loading="lazy"
          />
        )}
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-1">
        <div className="line-clamp-2 text-sm font-bold transition-colors duration-200 group-hover:text-primary group-focus-visible:text-primary">
          {podcast.title}
        </div>
        <div className="line-clamp-1 text-xs text-muted-foreground">
          <span className="sr-only">{t['podcast.by']}</span>
          {author}
        </div>
      </div>
    </Link>
  );
}
