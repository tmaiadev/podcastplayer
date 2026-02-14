import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CategorySectionSkeletonProps {
  showTitle?: boolean;
}

function PodcastCardSkeleton() {
  return (
    <div className="w-36 shrink-0 flex flex-col gap-2">
      {/* Image skeleton */}
      <Skeleton className="w-full aspect-square rounded-lg" />

      {/* Text content skeleton */}
      <div className="flex flex-col gap-1">
        {/* Title - 2 lines */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        {/* Author - 1 line */}
        <Skeleton className="h-3 w-1/2 mt-1" />
      </div>
    </div>
  );
}

export function CategorySectionSkeleton({ showTitle = true }: CategorySectionSkeletonProps) {
  return (
    <section>
      {showTitle && (
        <div className="flex items-center mb-2">
          <Skeleton className="h-5 w-36" />
        </div>
      )}

      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-2 px-1">
          {Array.from({ length: 12 }).map((_, index) => (
            <PodcastCardSkeleton key={index} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
