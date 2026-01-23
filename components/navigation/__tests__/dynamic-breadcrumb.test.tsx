import { render, screen } from '@testing-library/react';
import { DynamicBreadcrumb } from '../dynamic-breadcrumb';
import type { BreadcrumbItem } from '@/lib/breadcrumb';

// Mock the UI breadcrumb components
jest.mock('@/components/ui/breadcrumb', () => ({
  Breadcrumb: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <nav data-testid="breadcrumb" className={className}>{children}</nav>
  ),
  BreadcrumbList: ({ children }: { children: React.ReactNode }) => (
    <ol data-testid="breadcrumb-list">{children}</ol>
  ),
  BreadcrumbItem: ({ children }: { children: React.ReactNode }) => (
    <li data-testid="breadcrumb-item">{children}</li>
  ),
  BreadcrumbLink: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="breadcrumb-link">{children}</span>
  ),
  BreadcrumbPage: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="breadcrumb-page">{children}</span>
  ),
  BreadcrumbSeparator: () => <span data-testid="breadcrumb-separator">/</span>,
}));

describe('DynamicBreadcrumb', () => {
  it('returns null for empty trail', () => {
    const { container } = render(<DynamicBreadcrumb trail={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders single item without separator', () => {
    const trail: BreadcrumbItem[] = [{ label: 'Home' }];
    render(<DynamicBreadcrumb trail={trail} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.queryByTestId('breadcrumb-separator')).not.toBeInTheDocument();
  });

  it('renders multiple items with separators', () => {
    const trail: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/cat/1' },
      { label: 'Podcast' },
    ];
    render(<DynamicBreadcrumb trail={trail} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Podcast')).toBeInTheDocument();

    const separators = screen.getAllByTestId('breadcrumb-separator');
    expect(separators).toHaveLength(2);
  });

  it('renders links for items with href (except last)', () => {
    const trail: BreadcrumbItem[] = [
      { label: 'Home', href: '/en' },
      { label: 'Search', href: '/en/search' },
      { label: 'Current Page' },
    ];
    render(<DynamicBreadcrumb trail={trail} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/en');
    expect(links[1]).toHaveAttribute('href', '/en/search');
  });

  it('renders last item as page (not link) even with href', () => {
    const trail: BreadcrumbItem[] = [
      { label: 'Home', href: '/en' },
      { label: 'Last Page', href: '/en/last' },
    ];
    render(<DynamicBreadcrumb trail={trail} />);

    // First item should be a link
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();

    // Last item should NOT be a link (rendered as BreadcrumbPage)
    const lastPage = screen.getByText('Last Page');
    expect(lastPage.closest('a')).toBeNull();
  });

  it('renders items without href as page', () => {
    const trail: BreadcrumbItem[] = [
      { label: 'Home', href: '/en' },
      { label: 'No Link Item' },
      { label: 'Current' },
    ];
    render(<DynamicBreadcrumb trail={trail} />);

    // Only Home should be a link
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent('Home');
  });

  it('applies custom className', () => {
    const trail: BreadcrumbItem[] = [{ label: 'Home' }];
    render(<DynamicBreadcrumb trail={trail} className="custom-class" />);

    const breadcrumb = screen.getByTestId('breadcrumb');
    expect(breadcrumb).toHaveClass('custom-class');
  });

  it('handles trail with all items having hrefs', () => {
    const trail: BreadcrumbItem[] = [
      { label: 'Home', href: '/en' },
      { label: 'Category', href: '/en/cat/1' },
      { label: 'Podcast', href: '/en/podcast/123' },
    ];
    render(<DynamicBreadcrumb trail={trail} />);

    // Only first two should be links (last is always a page)
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });

  it('handles trail with no items having hrefs', () => {
    const trail: BreadcrumbItem[] = [
      { label: 'Item 1' },
      { label: 'Item 2' },
      { label: 'Item 3' },
    ];
    render(<DynamicBreadcrumb trail={trail} />);

    expect(screen.queryAllByRole('link')).toHaveLength(0);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });
});
