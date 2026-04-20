import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Droplets, Sun, ArrowRight } from "lucide-react";
import type { PlantListItem } from "@/types/plant";

export default function PlantCard({ plant }: { plant: PlantListItem }) {
  const [imgError, setImgError] = useState(false);

  // Derive image URL directly from prop (not useState — that only initializes once)
  const imgSrc = plant.default_image?.medium_url 
    || plant.default_image?.regular_url 
    || plant.default_image?.original_url
    || plant.default_image?.small_url
    || plant.default_image?.thumbnail
    || null;

  // Reset error state when the image URL changes
  useEffect(() => {
    setImgError(false);
  }, [imgSrc]);

  return (
    <Link href={`/plant/${plant.id}`} id={`plant-card-${plant.id}`}>
      <div className="glass-card group overflow-hidden cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {!imgError && imgSrc ? (
            <Image
              src={imgSrc}
              alt={plant.common_name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-[var(--bg-tertiary)] flex items-center justify-center text-4xl">
              🌿
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60" />

          {/* Cycle badge */}
          {plant.cycle && (
            <div className="absolute top-3 right-3">
              <span className="badge badge-green">{plant.cycle}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3
            className="text-lg font-semibold text-[var(--text-primary)] mb-1 group-hover:text-green-400 transition-colors line-clamp-1"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {plant.common_name}
          </h3>
          <p className="text-sm text-[var(--text-muted)] italic mb-3 line-clamp-1">
            {plant.scientific_name?.[0]}
          </p>

          {/* Quick info */}
          <div className="flex items-center gap-3 mt-auto">
            {plant.watering && (
              <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <Droplets className="w-3 h-3 text-blue-400" />
                <span>{plant.watering}</span>
              </div>
            )}
            {plant.sunlight?.[0] && (
              <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <Sun className="w-3 h-3 text-yellow-400" />
                <span className="truncate max-w-[80px]">
                  {plant.sunlight[0]}
                </span>
              </div>
            )}
            <ArrowRight className="w-3 h-3 text-green-400 ml-auto opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
