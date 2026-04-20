"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, LayoutGrid, List } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";
import PlantCard from "@/components/search/PlantCard";
import type { PlantListItem } from "@/types/plant";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const lang = searchParams.get("lang") || "English";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<PlantListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const lastLoadedQuery = useRef("");

  const fetchPlants = useCallback(async (q: string, p: number, isInitial = false) => {
    if (!q) return;
    
    if (isInitial) {
      setIsInitialLoading(true);
      setResults([]); // Clear results for a fresh search
    } else {
      setIsLoading(true);
    }
    
    try {
      const res = await fetch(
        `/api/plants/search?q=${encodeURIComponent(q)}&page=${p}&lang=${lang}`
      );
      if (res.ok) {
        const data = await res.json();
        const newItems = data.data || [];
        
        if (isInitial) {
          setResults(newItems);
          lastLoadedQuery.current = q;
        } else {
          setResults(prev => [...prev, ...newItems]);
        }
        
        setHasMore(p < (data.last_page || 1));
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsInitialLoading(false);
      setIsLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    // Only fetch if the query has actually changed from what we last loaded initially
    if (initialQuery && initialQuery !== lastLoadedQuery.current) {
      setQuery(initialQuery);
      setPage(1);
      fetchPlants(initialQuery, 1, true);
    }
  }, [initialQuery, fetchPlants]);

  // Load more function
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore && query) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPlants(query, nextPage);
    }
  }, [isLoading, hasMore, query, page, fetchPlants]);

  // Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const observerTarget = document.getElementById("scroll-sentinel");
    if (observerTarget) {
      observer.observe(observerTarget);
    }

    return () => {
      if (observerTarget) observer.unobserve(observerTarget);
    };
  }, [loadMore, hasMore, isLoading]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Explore Plants
          </h1>
          <p className="text-[var(--text-muted)] mb-6">
            Search through our database of 10,000+ plant species
          </p>
          <SearchBar />
        </div>

        {/* Controls */}
        {results.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[var(--text-muted)]">
              Showing results for &ldquo;{query}&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-green-400/10 text-green-400"
                    : "text-[var(--text-dim)] hover:text-[var(--text-primary)]"
                }`}
                id="view-grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-green-400/10 text-green-400"
                    : "text-[var(--text-dim)] hover:text-[var(--text-primary)]"
                }`}
                id="view-list"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Initial Loading */}
        {isInitialLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
          </div>
        )}

        {/* Results Grid */}
        {!isInitialLoading && results.length > 0 && (
          <>
            <div
              className={`stagger-children ${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                  : "flex flex-col gap-3"
              }`}
            >
              {results.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>

            {/* Scroll Sentinel */}
            <div id="scroll-sentinel" className="h-20 w-full flex items-center justify-center mt-6">
              {hasMore && isLoading && (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-6 h-6 text-green-400 animate-spin" />
                  <span className="text-xs text-[var(--text-muted)] animate-pulse">Loading more plants...</span>
                </div>
              )}
              {!hasMore && results.length > 0 && (
                <p className="text-sm text-[var(--text-dim)] italic">
                  — You&apos;ve reached the end of the garden —
                </p>
              )}
            </div>
          </>
        )}

        {/* Empty state */}
        {!isInitialLoading && results.length === 0 && query && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌱</div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              No plants found
            </h3>
            <p className="text-[var(--text-muted)]">
              Try a different search term or browse categories on the home page.
            </p>
          </div>
        )}

        {/* Initial state */}
        {!isInitialLoading && !query && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Start exploring
            </h3>
            <p className="text-[var(--text-muted)]">
              Search for any plant by common name, scientific name, or family.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 pb-16 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-green-500" /></div>}>
      <SearchContent />
    </Suspense>
  );
}
