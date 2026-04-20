"use client";

import Link from "next/link";
import {
  Leaf,
  Sparkles,
  MapPin,
  Droplets,
  Sprout,
  TreePine,
  Flower2,
  Apple,
  Search,
  ArrowRight,
  Database,
  Bot,
} from "lucide-react";
import SearchBar from "@/components/search/SearchBar";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/context/translations";

export default function HomePage() {
  const { language } = useLanguage();

  const categories = [
    { icon: TreePine, label: t(language, "trees"), query: "tree", color: "text-emerald-400" },
    { icon: Flower2, label: t(language, "flowers"), query: "flower", color: "text-pink-400" },
    { icon: Sprout, label: t(language, "herbs"), query: "herb", color: "text-lime-400" },
    { icon: Apple, label: t(language, "fruits"), query: "fruit", color: "text-orange-400" },
    { icon: Leaf, label: t(language, "ferns"), query: "fern", color: "text-green-400" },
    { icon: Droplets, label: t(language, "aquatic"), query: "aquatic", color: "text-cyan-400" },
  ];

  const features = [
    {
      icon: Search,
      title: t(language, "smartSearch"),
      description: t(language, "smartSearchDesc"),
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/20",
    },
    {
      icon: Sparkles,
      title: t(language, "aiPredictor"),
      description: t(language, "aiPredictorDesc"),
      color: "from-amber-500/20 to-yellow-500/20",
      borderColor: "border-amber-500/20",
    },
    {
      icon: MapPin,
      title: t(language, "growthMaps"),
      description: t(language, "growthMapsDesc"),
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/20",
    },
    {
      icon: Bot,
      title: t(language, "aiAssistant"),
      description: t(language, "aiAssistantDesc"),
      color: "from-purple-500/20 to-violet-500/20",
      borderColor: "border-purple-500/20",
    },
  ];

  const stats = [
    { value: "10,000+", label: t(language, "plantSpecies") },
    { value: "200+", label: t(language, "diseaseRecords") },
    { value: "30+", label: t(language, "regionsCovered") },
    { value: "24/7", label: t(language, "aiAssistance") },
  ];

  return (
    <div className="relative">
      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-gold)]/3 rounded-full blur-[120px] opacity-[0.03]" />
        </div>

        <div className="container-custom relative z-10 text-center py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-400/10 border border-green-400/20 mb-8 animate-fade-in">
            <Leaf className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">
              {t(language, "aiBadge")}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 animate-slide-up"
            style={{
              fontFamily: "var(--font-heading)",
              animationDelay: "0.1s",
              animationFillMode: "backwards",
            }}
          >
            <span className="text-[var(--text-primary)]">{t(language, "heroTitle1")}</span>
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
              {t(language, "heroTitle2")}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
          >
            {t(language, "heroSubtitle")}
          </p>

          {/* Search Bar */}
          <div
            className="max-w-2xl mx-auto mb-8 animate-slide-up"
            style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
          >
            <SearchBar large />
          </div>

          {/* Quick action buttons */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 animate-slide-up"
            style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}
          >
            <Link href="/predictor" className="btn-gold">
              <Sparkles className="w-4 h-4" />
              {t(language, "findBestPlant")}
            </Link>
            <Link href="/search" className="btn-secondary">
              <Database className="w-4 h-4" />
              {t(language, "browseAll")}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-[var(--border-accent)] flex items-start justify-center p-1">
            <div className="w-1.5 h-3 rounded-full bg-green-400 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ============ STATS BAR ============ */}
      <section className="relative z-10 -mt-8">
        <div className="container-custom">
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-2xl md:text-3xl font-bold text-green-400 mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">{t(language, "exploreByCategory")}</h2>
            <p className="section-subtitle mx-auto">
              {t(language, "categorySubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 stagger-children">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.query}
                  href={`/search?q=${cat.query}`}
                  className="glass-card p-6 text-center group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-6 h-6 ${cat.color}`} />
                  </div>
                  <span
                    className="text-sm font-medium text-[var(--text-secondary)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {cat.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="py-20 bg-[var(--bg-secondary)]/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">{t(language, "powerfulFeatures")}</h2>
            <p className="section-subtitle mx-auto">
              {t(language, "featuresSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 stagger-children">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className={`glass-card p-8 border ${feat.borderColor}`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-[var(--text-primary)]" />
                  </div>
                  <h3
                    className="text-xl font-semibold mb-2 text-[var(--text-primary)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20">
        <div className="container-custom">
          <div className="glass-card p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--accent-gold)]/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t(language, "notSure")}
              </h2>
              <p className="text-[var(--text-muted)] text-lg mb-8 max-w-xl mx-auto">
                {t(language, "notSureDesc")}
              </p>
              <Link href="/predictor" className="btn-primary text-lg px-8 py-4">
                <Sparkles className="w-5 h-5" />
                {t(language, "tryPredictor")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
