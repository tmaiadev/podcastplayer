'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Episode } from '@/lib/podcast-index';
import { cn } from '@/lib/utils';
import { getPodcastColor } from '@/lib/podcast-utils';

interface EpisodeImageProps {
  src?: string;
  alt: string;
  episode: Episode;
  size?: number;
  className?: string;
  podcastImage?: string;
  podcastTitle: string;
}

function getEpisodeDisplayText(episode: Episode): string {
  // Priority 1: Use episode number if available
  if (episode.episode !== undefined && episode.episode !== null) {
    return `E${episode.episode}`;
  }

  // Priority 2: Extract initials from title
  const title = episode.title || '';
  const cleaned = title.replace(/[^\w\s]/g, '').trim();

  if (!cleaned) return 'EP';

  const words = cleaned.split(/\s+/);

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (words[0][0] + words[1][0]).toUpperCase();
}

export function EpisodeImage({
  src,
  alt,
  episode,
  size = 80,
  className,
  podcastImage,
  podcastTitle,
}: EpisodeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [podcastImageError, setPodcastImageError] = useState(false);

  // Priority 1: Try episode image
  // Priority 2: Try podcast image
  // Priority 3: Show gradient fallback
  const showPodcastImage = (!src || hasError) && podcastImage && !podcastImageError;
  const showGradientFallback = (!src || hasError) && (!podcastImage || podcastImageError);

  if (showGradientFallback) {
    const displayText = getEpisodeDisplayText(episode);
    const colors = getPodcastColor(episode.id);

    return (
      <div
        className={cn(
          "flex items-center justify-center text-white font-bold rounded-md",
          "text-2xl",
          className
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundImage: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
        }}
        role="img"
        aria-label={alt}
      >
        {displayText}
      </div>
    );
  }

  // Determine which image to show
  const imageSrc = showPodcastImage ? podcastImage : src;
  const imageAlt = showPodcastImage ? podcastTitle : alt;

  return (
    <Image
      src={imageSrc!}
      alt={imageAlt}
      width={size}
      height={size}
      className={cn("aspect-square object-cover rounded-md", className)}
      loading="lazy"
      onError={() => {
        if (showPodcastImage) {
          setPodcastImageError(true);
        } else {
          setHasError(true);
        }
      }}
    />
  );
}
