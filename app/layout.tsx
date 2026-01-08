import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast Player App",
  description: "Your personal podcast player for discovering and listening to your favorite podcasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
