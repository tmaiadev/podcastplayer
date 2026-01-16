import type { Podcast } from "@/lib/podcast-index";
import type { SupportedLanguage } from "@/lib/i18n/constants";
import Link from "next/link";
import { getTranslations } from "@/lib/i18n/translations";
import { PodcastImage } from './podcast-image';
import { cn } from "@/lib/utils";

interface PodcastCardProps {
  podcast: Podcast;
  language: SupportedLanguage;
  className?: string;
}

export function PodcastCard({ podcast, language, className }: PodcastCardProps) {
  const imageUrl = podcast.image || podcast.artwork;
  const author = podcast.author || podcast.ownerName;
  const link = `/${language}/podcast/${podcast.id}`;
  const t = getTranslations(language);

  return (
    <Link
      href={link}
      className={cn(
        "group w-60 shrink-0 flex flex-col gap-2 focus-visible:outline-none",
        className
      )}
    >
      {/* Image container with overflow hidden for zoom effect */}
      <div className="overflow-hidden rounded-lg border-2 transition-shadow duration-300 group-hover:shadow-lg group-focus-visible:shadow-lg">
        <PodcastImage
          src={imageUrl}
          alt={podcast.title}
          title={podcast.title}
          podcastId={podcast.id}
          size={240}
          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-1">
        <div className="line-clamp-2 text-sm font-bold transition-colors duration-200 group-hover:text-primary group-focus-visible:text-primary">
          {podcast.title}
        </div>
        <div className="line-clamp-1 text-xs text-muted-foreground">
          {t['podcast.by']} {author}
        </div>
      </div>
    </Link>
  );
}
