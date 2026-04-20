"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

interface SearchResult {
  id: number;
  common_name: string;
  scientific_name: string[];
  default_image: { thumbnail: string } | null;
  cycle: string;
}

export default function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { language } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const searchPlants = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/plants/search?q=${encodeURIComponent(q)}&lang=${language}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.data?.slice(0, 6) || []);
        setIsOpen(true);
      }
    } catch {
      console.error("Search error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchPlants(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, searchPlants]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}&lang=${language}`);
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <button
            type="button"
            onClick={() => handleSubmit()}
            className={`absolute left-0 top-0 bottom-0 px-4 text-[var(--text-dim)] hover:text-green-400 transition-colors z-10 ${
              large ? "w-14" : "w-10"
            }`}
          >
            <Search className={large ? "w-5 h-5" : "w-4 h-4"} />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            placeholder={translations[language]?.searchPlaceholder || "Search plants..."}
            id="search-input"
            className={`input-field w-full ${large ? "pl-14 pr-12 py-4 text-lg" : "pl-11 pr-10 py-3"}`}
            autoComplete="off"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setResults([]);
                setIsOpen(false);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-dim)] hover:text-[var(--text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {isLoading && (
            <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400 animate-spin" />
          )}
        </div>
      </form>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-2 w-full glass-card overflow-hidden z-50 animate-scale-in"
        >
          <div className="p-2">
            {results.map((plant) => (
              <button
                key={plant.id}
                onClick={() => {
                  setIsOpen(false);
                  router.push(`/plant/${plant.id}`);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-[var(--bg-tertiary)] flex-shrink-0">
                  {plant.default_image?.thumbnail ? (
                    <Image
                      src={plant.default_image.thumbnail}
                      alt={plant.common_name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--text-dim)]">
                      🌿
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[var(--text-primary)] truncate">
                    {plant.common_name}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] truncate italic">
                    {plant.scientific_name?.[0]}
                  </div>
                </div>
                <span className="badge badge-sage text-[0.65rem]">
                  {plant.cycle || "—"}
                </span>
              </button>
            ))}
          </div>
          <div className="border-t border-[var(--border-subtle)] p-2">
            <button
              onClick={handleSubmit}
              className="w-full text-center text-sm text-green-400 hover:text-green-300 py-2 transition-colors"
            >
              View all results for &ldquo;{query}&rdquo;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
