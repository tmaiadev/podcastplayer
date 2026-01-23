import { renderHook, act } from '@testing-library/react';

// We need to mock next/navigation before importing the hook
const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

// Import after mocking
import { useMobileNavState } from '../use-mobile-nav-state';

const mockNavItems = [
  { id: 1, href: '/en' },
  { id: 2, href: '/en/search' },
  { id: 3, href: '/en/subscriptions' },
];

describe('useMobileNavState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
    mockUsePathname.mockReturnValue('/en');
  });

  describe('inferActiveFromPath', () => {
    it('returns matching item for exact path match', () => {
      mockUsePathname.mockReturnValue('/en/search');
      const { result } = renderHook(() => useMobileNavState(mockNavItems));

      // Wait for the useEffect to run
      expect(result.current.activeNavItem).toBe(2);
    });

    it('matches subscriptions-related pages', () => {
      mockUsePathname.mockReturnValue('/en/subscriptions/settings');
      const { result } = renderHook(() => useMobileNavState(mockNavItems));

      expect(result.current.activeNavItem).toBe(3);
    });

    it('falls back to sessionStorage for ambiguous routes', () => {
      sessionStorage.setItem('mobile-nav-active-item', '2');
      mockUsePathname.mockReturnValue('/en/podcast/123');
      const { result } = renderHook(() => useMobileNavState(mockNavItems));

      expect(result.current.activeNavItem).toBe(2);
    });

    it('defaults to first nav item when no match and no storage', () => {
      mockUsePathname.mockReturnValue('/en/unknown-page');
      const { result } = renderHook(() => useMobileNavState(mockNavItems));

      expect(result.current.activeNavItem).toBe(1);
    });
  });

  describe('handleNavItemClick', () => {
    it('updates activeNavItem on click', () => {
      mockUsePathname.mockReturnValue('/en');
      const { result } = renderHook(() => useMobileNavState(mockNavItems));

      act(() => {
        result.current.handleNavItemClick(2);
      });

      expect(result.current.activeNavItem).toBe(2);
    });

    it('persists selection to sessionStorage', () => {
      mockUsePathname.mockReturnValue('/en');
      const { result } = renderHook(() => useMobileNavState(mockNavItems));

      act(() => {
        result.current.handleNavItemClick(3);
      });

      expect(sessionStorage.getItem('mobile-nav-active-item')).toBe('3');
    });
  });

  describe('pathname changes', () => {
    it('updates active item on exact path match', () => {
      mockUsePathname.mockReturnValue('/en');
      const { result, rerender } = renderHook(() => useMobileNavState(mockNavItems));

      expect(result.current.activeNavItem).toBe(1);

      // Simulate navigation to search
      mockUsePathname.mockReturnValue('/en/search');
      rerender();

      expect(result.current.activeNavItem).toBe(2);
    });

    it('preserves active item on non-exact match (sub-pages)', () => {
      mockUsePathname.mockReturnValue('/en');
      const { result, rerender } = renderHook(() => useMobileNavState(mockNavItems));

      // Click on search
      act(() => {
        result.current.handleNavItemClick(2);
      });
      expect(result.current.activeNavItem).toBe(2);

      // Navigate to a podcast page (not an exact nav match)
      mockUsePathname.mockReturnValue('/en/podcast/123');
      rerender();

      // Should preserve the search selection
      expect(result.current.activeNavItem).toBe(2);
    });
  });

  describe('edge cases', () => {
    it('handles empty nav items array', () => {
      mockUsePathname.mockReturnValue('/en');
      const { result } = renderHook(() => useMobileNavState([]));

      expect(result.current.activeNavItem).toBe(-1);
    });

    it('handles invalid stored ID', () => {
      sessionStorage.setItem('mobile-nav-active-item', '999');
      mockUsePathname.mockReturnValue('/en/podcast/123');
      const { result } = renderHook(() => useMobileNavState(mockNavItems));

      // Should fall back to first item since stored ID doesn't match any nav item
      expect(result.current.activeNavItem).toBe(1);
    });

    it('handles non-numeric stored value', () => {
      sessionStorage.setItem('mobile-nav-active-item', 'invalid');
      mockUsePathname.mockReturnValue('/en/podcast/123');
      const { result } = renderHook(() => useMobileNavState(mockNavItems));

      // Should fall back to first item
      expect(result.current.activeNavItem).toBe(1);
    });
  });
});
