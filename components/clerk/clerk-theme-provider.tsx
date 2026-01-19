"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useEffect, useState } from "react";

interface ClerkThemeProviderProps {
  children: React.ReactNode;
}

export function ClerkThemeProvider({ children }: ClerkThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ClerkProvider
      appearance={{
        baseTheme: isDarkMode ? dark : undefined,
      }}
    >
      {children}
    </ClerkProvider>
  );
}
