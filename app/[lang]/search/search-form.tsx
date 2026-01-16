"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";

interface SearchFormProps {
  initialQuery: string;
  placeholder: string;
  language: string;
}

export function SearchForm({ initialQuery, placeholder, language }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      router.push(`/${language}/search?q=${encodeURIComponent(trimmedQuery)}`);
    } else {
      router.push(`/${language}/search`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1"
      />
      <Button type="submit">
        <HugeiconsIcon icon={Search01Icon} size={20} />
      </Button>
    </form>
  );
}
