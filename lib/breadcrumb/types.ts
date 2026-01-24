export type BreadcrumbOrigin = 'home' | 'category' | 'search' | 'subscriptions' | 'history';

export interface BreadcrumbParams {
  from?: BreadcrumbOrigin;
  catId?: number;
  q?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
