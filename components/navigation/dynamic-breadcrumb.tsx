import Link from 'next/link';
import type { BreadcrumbItem } from '@/lib/breadcrumb';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem as BreadcrumbItemUI,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface DynamicBreadcrumbProps {
  trail: BreadcrumbItem[];
  className?: string;
}

export function DynamicBreadcrumb({ trail, className }: DynamicBreadcrumbProps) {
  if (trail.length === 0) {
    return null;
  }

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;

          return (
            <span key={index} className="contents">
              <BreadcrumbItemUI>
                {item.href && !isLast ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItemUI>
              {!isLast && <BreadcrumbSeparator />}
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
