'use client';

import Image from 'next/image';
import type { Podcast } from '@/lib/podcast-index';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface PodcastCardProps {
  podcast: Podcast;
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  const imageUrl = podcast.image || podcast.artwork;
  const author = podcast.author || podcast.ownerName;

  return (
    <Card
      className="w-60 flex-shrink-0 cursor-pointer transition-all hover:scale-105 hover:shadow-lg scroll-snap-align-start"
      size="sm"
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={podcast.title}
          width={240}
          height={240}
          className="w-full aspect-square object-cover"
          loading="lazy"
        />
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2 text-sm">
          {podcast.title}
        </CardTitle>
        {author && (
          <CardDescription className="line-clamp-1 text-xs">
            {author}
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
}
