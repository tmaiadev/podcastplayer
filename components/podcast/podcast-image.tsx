'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getPodcastInitials, getPodcastColor } from '@/lib/podcast-utils';

interface PodcastImageProps {
  src?: string;
  alt: string;
  title: string;
  podcastId: number;
  size: 240 | 300;
  priority?: boolean;
  className?: string;
}

export function PodcastImage({
  src,
  alt,
  title,
  podcastId,
  size,
  priority = false,
  className,
}: PodcastImageProps) {
  const [hasError, setHasError] = useState(false);

  // Show fallback if no src or image failed to load
  const showFallback = !src || hasError;

  if (showFallback) {
    const initials = getPodcastInitials(title);
    const colors = getPodcastColor(podcastId);

    return (
      <div
        className={cn(
          "flex items-center justify-center text-white font-bold",
          "aspect-square",
          size === 240 ? "text-6xl" : "text-7xl",
          className
        )}
        style={{
          backgroundImage: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
        }}
        role="img"
        aria-label={alt}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      onError={() => setHasError(true)}
    />
  );
}
