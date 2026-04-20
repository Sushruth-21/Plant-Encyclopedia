"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Droplets,
  Sun,
  Scissors,
  Thermometer,
  Leaf,
  Sprout,
  Heart,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MapPin,
  ShoppingCart,
  Bug,
  Loader2,
  Globe,
  Layers,
  Clock,
  Activity,
} from "lucide-react";
import GrowthCalculator from "@/components/plant/GrowthCalculator";
import MarketSection from "@/components/plant/MarketSection";
import MapWrapper from "@/components/map/MapWrapper";
import ImageCarousel from "@/components/plant/ImageCarousel";

interface PlantData {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[] | null;
  family: string | null;
  origin: string[] | null;
  type: string;
  cycle: string;
  watering: string;
  watering_general_benchmark?: { value: string; unit: string };
  sunlight: string[];
  soil: string[];
  pruning_month: string[];
  growth_rate: string;
  maintenance: string;
  care_level: string;
  hardiness: { min: string; max: string };
  flowers: boolean;
  flowering_season: string | null;
  fruits: boolean;
  edible_fruit: boolean;
  harvest_season: string | null;
  indoor: boolean;
  medicinal: boolean;
  poisonous_to_humans: boolean;
  poisonous_to_pets: boolean;
  drought_tolerant: boolean;
  invasive: boolean;
  tropical: boolean;
  pest_susceptibility: string[] | null;
  description: string;
  default_image: { original_url: string; regular_url: string; medium_url: string } | null;
  care_guide: Array<{ type: string; description: string }>;
  attracts: string[];
  propagation: string[];
  images?: string[]; // Multiple images for carousel
}

export default function PlantPage() {
  const params = useParams();
  const id = params.id as string;
  const [plant, setPlant] = useState<PlantData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["watering", "sunlight"])
  );
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    async function fetchPlant() {
      try {
        const res = await fetch(`/api/plants/${id}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          if (res.status === 404) {
            throw new Error("This plant was not found in the database.");
          } else if (res.status === 429) {
            throw new Error("API rate limit reached. Please wait a moment and try again.");
          } else {
            throw new Error(errData.error || "Failed to load plant details.");
          }
        }
        const data = await res.json();
        setPlant(data);
      } catch (err: any) {
        setError(err.message || "Failed to load plant details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPlant();
  }, [id]);

  const toggleSection = (section: string) => {
    const next = new Set(expandedSections);
    if (next.has(section)) next.delete(section);
    else next.add(section);
    setExpandedSections(next);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-green-400 animate-spin" />
      </div>
    );
  }

  if (error || !plant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🥀</div>
          <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            {error || "Plant not found"}
          </h2>
          <Link href="/search" className="btn-secondary mt-4">
            <ArrowLeft className="w-4 h-4" /> Back to search
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = plant.default_image?.original_url || plant.default_image?.regular_url;
  const careGuideMap = new Map(
    (plant.care_guide || []).map((g) => [g.type, g.description])
  );

  const careItems = [
    {
      key: "watering",
      icon: Droplets,
      title: "Watering",
      color: "text-blue-400",
      summary: `${plant.watering}${plant.watering_general_benchmark ? ` — every ${plant.watering_general_benchmark.value} ${plant.watering_general_benchmark.unit}` : ""}`,
      detail: careGuideMap.get("watering"),
    },
    {
      key: "sunlight",
      icon: Sun,
      title: "Sunlight",
      color: "text-yellow-400",
      summary: plant.sunlight?.join(", ") || "Not specified",
      detail: careGuideMap.get("sunlight"),
    },
    {
      key: "soil",
      icon: Layers,
      title: "Soil",
      color: "text-amber-600",
      summary: plant.soil?.join(", ") || "Not specified",
    },
    {
      key: "pruning",
      icon: Scissors,
      title: "Pruning",
      color: "text-emerald-400",
      summary: plant.pruning_month?.length > 0
        ? `Best months: ${plant.pruning_month.join(", ")}`
        : "No specific pruning schedule",
      detail: careGuideMap.get("pruning"),
    },
    {
      key: "hardiness",
      icon: Thermometer,
      title: "Hardiness Zone",
      color: "text-red-400",
      summary: plant.hardiness
        ? `Zone ${plant.hardiness.min} — ${plant.hardiness.max}`
        : "Not specified",
    },
  ];

  const quickBadges = [
    { label: plant.care_level, show: !!plant.care_level, color: "badge-green" },
    { label: plant.growth_rate + " Growth", show: !!plant.growth_rate, color: "badge-sage" },
    { label: "Indoor", show: plant.indoor, color: "badge-green" },
    { label: "Medicinal", show: plant.medicinal, color: "badge-gold" },
    { label: "⚠️ Toxic to Pets", show: plant.poisonous_to_pets, color: "badge-gold" },
    { label: "Drought Tolerant", show: plant.drought_tolerant, color: "badge-sage" },
    { label: "Tropical", show: plant.tropical, color: "badge-green" },
  ].filter((b) => b.show);

  return (
    <div className="min-h-screen pt-16">
      {/* ============ HERO ============ */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        {(() => {
          // Build image list for carousel
          const imageList: string[] = [];
          if (plant.images && plant.images.length > 0) {
            imageList.push(...plant.images);
          } else if (imageUrl) {
            imageList.push(imageUrl);
          }
          
          return imageList.length > 0 ? (
            <ImageCarousel images={imageList} alt={plant.common_name} />
          ) : (
            <div className="w-full h-full bg-[var(--bg-tertiary)] flex items-center justify-center text-8xl">
              🌿
            </div>
          );
        })()}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 container-custom pb-8">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-green-400 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to search
          </Link>
          <h1
            className="text-3xl md:text-5xl font-bold mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {plant.common_name}
          </h1>
          <p className="text-lg text-[var(--text-muted)] italic mb-4">
            {plant.scientific_name?.join(", ")}
          </p>
          <div className="flex flex-wrap gap-2">
            {quickBadges.map((b) => (
              <span key={b.label} className={`badge ${b.color}`}>
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTENT ============ */}
      <div className="container-custom py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {plant.description && (
              <div className="glass-card p-6">
                <h2
                  className="text-xl font-semibold mb-3 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <Leaf className="w-5 h-5 text-green-400" />
                  About
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {plant.description}
                </p>
              </div>
            )}

            {/* Care Instructions */}
            <div className="glass-card p-6">
              <h2
                className="text-xl font-semibold mb-4 flex items-center gap-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <Heart className="w-5 h-5 text-pink-400" />
                Care Instructions
              </h2>
              <div className="space-y-3">
                {careItems.map((item) => {
                  const Icon = item.icon;
                  const isExpanded = expandedSections.has(item.key);
                  return (
                    <div
                      key={item.key}
                      className="rounded-xl border border-[var(--border-subtle)] overflow-hidden"
                    >
                      <button
                        onClick={() => item.detail && toggleSection(item.key)}
                        className="w-full flex items-center gap-3 p-4 hover:bg-white/3 transition-colors text-left"
                      >
                        <Icon className={`w-5 h-5 ${item.color} flex-shrink-0`} />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-[var(--text-primary)]">
                            {item.title}
                          </div>
                          <div className="text-xs text-[var(--text-muted)] mt-0.5">
                            {item.summary}
                          </div>
                        </div>
                        {item.detail && (
                          isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-[var(--text-dim)]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[var(--text-dim)]" />
                          )
                        )}
                      </button>
                      {isExpanded && item.detail && (
                        <div className="px-4 pb-4 pt-0">
                          <p className="text-sm text-[var(--text-muted)] leading-relaxed pl-8">
                            {item.detail}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Growth Calculator */}
            <GrowthCalculator plant={plant} />

            {/* Diseases */}
            {plant.pest_susceptibility && plant.pest_susceptibility.length > 0 && (
              <div className="glass-card p-6">
                <h2
                  className="text-xl font-semibold mb-4 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <Bug className="w-5 h-5 text-red-400" />
                  Health & Disease Susceptibility
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {plant.pest_susceptibility.map((pest) => (
                    <div
                      key={pest}
                      className="flex items-center gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10"
                    >
                      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span className="text-sm text-[var(--text-secondary)]">{pest}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            {plant.origin && plant.origin.length > 0 && (
              <div className="glass-card p-6">
                <h2
                  className="text-xl font-semibold mb-4 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Natural Growth Regions
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {plant.origin.map((o) => (
                    <span key={o} className="badge badge-sage">{o}</span>
                  ))}
                </div>
                <MapWrapper origins={plant.origin} plantName={plant.common_name} />
              </div>
            )}

            {/* Market Integration */}
            <MarketSection plant={plant} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Botanical Info */}
            <div className="glass-card p-6">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Botanical Data
              </h3>
              <dl className="space-y-3">
                {[
                  { label: "Family", value: plant.family },
                  { label: "Type", value: plant.type },
                  { label: "Cycle", value: plant.cycle },
                  { label: "Origin", value: plant.origin?.join(", ") },
                  { label: "Growth Rate", value: plant.growth_rate },
                  { label: "Maintenance", value: plant.maintenance },
                ].map(
                  (item) =>
                    item.value && (
                      <div key={item.label} className="flex justify-between">
                        <dt className="text-sm text-[var(--text-muted)]">{item.label}</dt>
                        <dd className="text-sm text-[var(--text-primary)] font-medium text-right max-w-[55%]">
                          {item.value}
                        </dd>
                      </div>
                    )
                )}
              </dl>
            </div>

            {/* Quick Facts */}
            <div className="glass-card p-6">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Quick Facts
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "🌸", label: "Flowers", value: plant.flowers ? "Yes" : "No" },
                  { icon: "🍎", label: "Fruits", value: plant.fruits ? "Yes" : "No" },
                  { icon: "🌡️", label: "Zones", value: plant.hardiness ? `${plant.hardiness.min}-${plant.hardiness.max}` : "—" },
                  { icon: "🏠", label: "Indoor", value: plant.indoor ? "Yes" : "No" },
                ].map((fact) => (
                  <div
                    key={fact.label}
                    className="text-center p-3 rounded-xl bg-white/3 border border-[var(--border-subtle)]"
                  >
                    <div className="text-xl mb-1">{fact.icon}</div>
                    <div className="text-xs text-[var(--text-muted)]">{fact.label}</div>
                    <div className="text-sm font-medium text-[var(--text-primary)]">
                      {fact.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Propagation */}
            {plant.propagation && plant.propagation.length > 0 && (
              <div className="glass-card p-6">
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Propagation
                </h3>
                <div className="flex flex-wrap gap-2">
                  {plant.propagation.map((p) => (
                    <span key={p} className="badge badge-green">{p}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Attracts */}
            {plant.attracts && plant.attracts.length > 0 && (
              <div className="glass-card p-6">
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Attracts
                </h3>
                <div className="flex flex-wrap gap-2">
                  {plant.attracts.map((a) => (
                    <span key={a} className="badge badge-gold">{a}</span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
