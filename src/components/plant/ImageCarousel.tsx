"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorIndices, setErrorIndices] = useState<Set<number>>(new Set());

  // Filter out images that failed to load
  const validImages = images.filter((_, i) => !errorIndices.has(i));
  
  // Ensure currentIndex is within bounds after filtering
  const safeIndex = Math.min(currentIndex, Math.max(validImages.length - 1, 0));
  const currentImage = validImages[safeIndex];

  const handleError = (originalIndex: number) => {
    setErrorIndices(prev => new Set(prev).add(originalIndex));
    // Move to next valid image if current failed
    if (originalIndex === images.indexOf(currentImage)) {
      setCurrentIndex(0);
    }
  };

  const goNext = () => {
    if (validImages.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const goPrev = () => {
    if (validImages.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  if (validImages.length === 0) {
    return (
      <div className="w-full h-full bg-[var(--bg-tertiary)] flex items-center justify-center text-8xl">
        🌿
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group">
      {/* Current Image */}
      <Image
        src={currentImage}
        alt={`${alt} - view ${safeIndex + 1}`}
        fill
        className="object-cover transition-opacity duration-500"
        priority={safeIndex === 0}
        unoptimized
        onError={() => handleError(images.indexOf(currentImage))}
      />

      {/* Navigation Arrows (only if multiple images) */}
      {validImages.length > 1 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); goPrev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); goNext(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
            {validImages.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(idx); }}
                className={`rounded-full transition-all duration-300 ${
                  idx === safeIndex
                    ? "w-6 h-2 bg-green-400"
                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
            {safeIndex + 1} / {validImages.length}
          </div>
        </>
      )}
    </div>
  );
}
