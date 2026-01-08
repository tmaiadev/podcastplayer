import Image from "next/image";
import type { Podcast } from "@/lib/podcast-index";
import Link from "next/link";

interface PodcastCardProps {
  podcast: Podcast;
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  const imageUrl = podcast.image || podcast.artwork;
  const author = podcast.author || podcast.ownerName;
  const link = `/podcast/${podcast.id}`;

  return (
    <Link
      href={link}
      className="w-60 shrink-0 cursor-pointer scroll-snap-align-start flex flex-col gap-2"
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={podcast.title}
          width={240}
          height={240}
          className="w-full aspect-square object-cover rounded-lg border-2"
          loading="lazy"
        />
      )}
      <div className="flex flex-col gap-1">
        <div className="line-clamp-2 text-sm font-bold">{podcast.title}</div>
        <div className="line-clamp-1 text-xs">
          <span className="sr-only">by</span>
          {author}
        </div>
      </div>
    </Link>
  );
}
