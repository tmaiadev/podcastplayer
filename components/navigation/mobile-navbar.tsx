"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { SupportedLanguage } from "@/lib/i18n/constants";
import { getTranslations } from "@/lib/i18n/translations";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  Search01Icon,
  FavouriteIcon,
  UserIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MobileNavbarProps {
  language: SupportedLanguage;
}

interface NavLinkProps {
  href: string;
  icon: typeof Home01Icon;
  label: string;
  isActive: boolean;
}

function NavLink({ href, icon, label, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <HugeiconsIcon icon={icon} size={22} />
      <span className="text-xs">{label}</span>
    </Link>
  );
}

export function MobileNavbar({ language }: MobileNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const t = getTranslations(language);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${language}/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchExpanded(false);
      setSearchQuery("");
    }
  };

  const navItems = [
    {
      label: t["nav.discover"],
      href: `/${language}`,
      icon: Home01Icon,
    },
    {
      label: t["nav.subscriptions"],
      href: `/${language}/subscriptions`,
      icon: FavouriteIcon,
    },
    {
      label: t["nav.account"],
      href: `/${language}/account`,
      icon: UserIcon,
    },
  ];

  useEffect(() => {
    if (isSearchExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchExpanded]);

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="flex items-center gap-2">
        {isSearchExpanded ? (
          // Expanded search field
          <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2 bg-background/80 backdrop-blur-lg rounded-full border px-4 py-2 shadow-lg">
            <HugeiconsIcon
              icon={Search01Icon}
              size={20}
              className="text-muted-foreground shrink-0"
            />
            <Input
              ref={inputRef}
              type="search"
              placeholder={t["nav.search"]}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
              onBlur={() => {
                setIsSearchExpanded(false);
                setSearchQuery("");
              }}
            />
            <button
              type="button"
              onClick={() => {
                setIsSearchExpanded(false);
                setSearchQuery("");
              }}
              className="shrink-0 p-1 hover:bg-accent rounded-full"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={18} />
            </button>
          </form>
        ) : (
          <>
            {/* Main nav segment */}
            <div className="flex-1 flex justify-around bg-background/80 backdrop-blur-lg rounded-full border px-2 py-2 shadow-lg">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  isActive={pathname === item.href}
                />
              ))}
            </div>

            {/* Search button */}
            <button
              onClick={() => setIsSearchExpanded(true)}
              className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
            >
              <HugeiconsIcon icon={Search01Icon} size={24} />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
