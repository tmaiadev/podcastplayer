import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import "../globals.css";
import { isValidLanguage } from "@/lib/i18n/constants";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { PodcastIcon } from "@hugeicons/core-free-icons";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { MobileNavbar } from "@/components/navigation/mobile-navbar";
import { PlayerProviderWithSync, MobilePlayer } from "@/components/player";
import { ClerkThemeProvider } from "@/components/clerk/clerk-theme-provider";
import { UserAvatar } from "@/components/clerk/user-avatar";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

const nunitoSans = Nunito_Sans({ variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps) {
  const { lang } = await params;

  // Validate language parameter
  if (!isValidLanguage(lang)) {
    notFound();
  }

  return (
    <ClerkThemeProvider>
      <html lang={lang} className={`${nunitoSans.variable} overflow-x-hidden`}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <PlayerProviderWithSync>
            {/* Desktop Sidebar - fixed position, hidden on mobile */}
            <AppSidebar language={lang} />

            {/* Main wrapper with left margin on desktop for sidebar */}
            <div className="md:ml-64">
              {/* Mobile Header - only visible on mobile */}
              <header className="border-b md:hidden">
                <div className="container mx-auto px-4 py-2 md:p-4 flex items-center justify-between">
                  <Link href={`/${lang}`} className="text-xl font-bold hover:text-primary transition-colors flex items-center gap-2">
                    <HugeiconsIcon icon={PodcastIcon} size={24} />
                    Podcast Player
                  </Link>
                  <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                    <UserAvatar />
                  </div>
                </div>
              </header>

              {/* Main Content - add bottom padding on mobile for navbar and player */}
              <div className="pb-36 md:pb-0">
                <main className="md:min-h-screen py-8">
                  {children}
                </main>
              </div>
            </div>

            <div className="p-2 fixed left-0 bottom-0 right-0 md:hidden">
              <div className="flex flex-col gap-2 w-full">
                <MobilePlayer language={lang} />
                <MobileNavbar language={lang} />
              </div>
            </div>
          </PlayerProviderWithSync>
          <GoogleAnalytics />
        </body>
      </html>
    </ClerkThemeProvider>
  );
}
