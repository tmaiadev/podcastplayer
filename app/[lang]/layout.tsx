import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import "../globals.css";
import { isValidLanguage } from "@/lib/i18n/locale";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import Link from "next/link";

const nunitoSans = Nunito_Sans({variable:'--font-sans'});

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
    <html lang={lang} className={`${nunitoSans.variable} overflow-x-hidden`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href={`/${lang}`} className="text-xl font-bold hover:text-primary transition-colors">
              Podcast Player
            </Link>
            <LanguageSwitcher />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
