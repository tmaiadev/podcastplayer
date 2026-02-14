"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SupportedLanguage } from "@/lib/i18n/constants";
import { getTranslations } from "@/lib/i18n/translations";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PodcastIcon,
  Home01Icon,
  Search01Icon,
  FavouriteIcon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { UserAvatar } from "@/components/clerk/user-avatar";
import { SidebarPlayer } from "@/components/player";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
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
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <HugeiconsIcon icon={icon} size={20} />
      <span>{label}</span>
    </Link>
  );
}

export function AppSidebar({ language }: AppSidebarProps) {
  const pathname = usePathname();
  const t = getTranslations(language);

  const navItems = [
    {
      label: t["nav.discover"],
      href: `/${language}`,
      icon: Home01Icon,
    },
    {
      label: t["nav.search"],
      href: `/${language}/search`,
      icon: Search01Icon,
    },
    {
      label: t["nav.subscriptions"],
      href: `/${language}/subscriptions`,
      icon: FavouriteIcon,
    },
    {
      label: t["nav.history"],
      href: `/${language}/history`,
      icon: Clock01Icon,
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-background border-r hidden md:flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <Link
          href={`/${language}`}
          className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors"
          prefetch
        >
          <HugeiconsIcon icon={PodcastIcon} size={24} />
          Podcast Player
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1 grow">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={pathname === item.href}
          />
        ))}
      </nav>

      {/* Player */}
      <div className="flex-1 grow-0 flex flex-col h-min justify-end border-t">
        <SidebarPlayer language={language} />
      </div>

      {/* Footer */}
      <div className="p-4 border-t flex items-center justify-between">
        <LanguageSwitcher />
        <UserAvatar />
      </div>
    </aside>
  );
}
