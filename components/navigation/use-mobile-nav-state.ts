import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "mobile-nav-active-item";

interface NavItem {
  id: number;
  href: string;
}

function inferActiveFromPath(pathname: string, navItems: NavItem[]): number {
  // Try exact match first
  const exactMatch = navItems.find(item => pathname === item.href);
  if (exactMatch) return exactMatch.id;

  // Check for subscriptions-related pages
  if (pathname.includes('/subscriptions')) {
    const subsItem = navItems.find(item => item.href.includes('/subscriptions'));
    return subsItem?.id ?? -1;
  }

  // Check for history-related pages
  if (pathname.includes('/history')) {
    const historyItem = navItems.find(item => item.href.includes('/history'));
    return historyItem?.id ?? -1;
  }

  // For ambiguous routes (podcast, category, search), use sessionStorage
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored) {
    const storedId = parseInt(stored, 10);
    const validItem = navItems.find(item => item.id === storedId);
    if (validItem) return storedId;
  }

  // Default to first nav item (Discover)
  return navItems[0]?.id ?? -1;
}

export function useMobileNavState(navItems: NavItem[]) {
  const pathname = usePathname();
  const initializedRef = useRef(false);
  // Always use first nav item as initial value to avoid hydration mismatch
  const [activeNavItem, setActiveNavItem] = useState<number>(navItems[0]?.id ?? -1);

  // Set correct active item after mount (client-side only)
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      const inferred = inferActiveFromPath(pathname, navItems);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync state with URL pathname after hydration
      setActiveNavItem(inferred);
      return;
    }

    // On subsequent pathname changes, only update for exact matches
    const exactMatch = navItems.find(item => pathname === item.href);
    if (exactMatch) {
      sessionStorage.setItem(STORAGE_KEY, String(exactMatch.id));
      setActiveNavItem(exactMatch.id);
    }
    // Don't update for non-exact matches - preserves highlight on sub-pages
  }, [pathname, navItems]);

  // Handle explicit nav clicks
  const handleNavItemClick = (itemId: number) => {
    sessionStorage.setItem(STORAGE_KEY, String(itemId));
    setActiveNavItem(itemId);
  };

  return {
    activeNavItem,
    handleNavItemClick,
  };
}
