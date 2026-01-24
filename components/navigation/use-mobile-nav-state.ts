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
  const [activeNavItem, setActiveNavItem] = useState<number>(() => {
    if (typeof window === "undefined") return navItems[0]?.id ?? -1;
    return inferActiveFromPath(pathname, navItems);
  });

  // Update on pathname changes (only for exact matches)
  useEffect(() => {
    // Skip the first effect run since we initialized in useState
    if (!initializedRef.current) {
      initializedRef.current = true;
      return;
    }

    const exactMatch = navItems.find(item => pathname === item.href);
    if (exactMatch) {
      sessionStorage.setItem(STORAGE_KEY, String(exactMatch.id));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync state with URL pathname
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
