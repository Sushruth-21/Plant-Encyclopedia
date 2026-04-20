"use client";

import Link from "next/link";
import { Leaf, Code, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/context/translations";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="relative z-[1] border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-[#060d06]" />
              </div>
              <span
                className="text-lg font-bold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="text-green-400">Flora</span>
                <span className="text-[var(--accent-gold)]">Base</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {t(language, "footerDesc")}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4
              className="text-sm font-semibold text-[var(--text-secondary)] mb-4 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t(language, "explore")}
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/search", label: t(language, "searchPlants") },
                { href: "/predictor", label: t(language, "plantPredictor") },
                { href: "/map", label: t(language, "growthMap") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              className="text-sm font-semibold text-[var(--text-secondary)] mb-4 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t(language, "resources")}
            </h4>
            <ul className="space-y-2">
              {[
                { href: "#", label: t(language, "careGuides") },
                { href: "#", label: t(language, "diseaseLibrary") },
                { href: "#", label: t(language, "fertilizerGuide") },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* APIs */}
          <div>
            <h4
              className="text-sm font-semibold text-[var(--text-secondary)] mb-4 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t(language, "poweredBy")}
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>
                <a
                  href="https://perenual.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  Perenual API
                </a>
              </li>
              <li>
                <a
                  href="https://openweathermap.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  OpenWeatherMap
                </a>
              </li>
              <li>
                <a
                  href="https://ai.google.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  Google Gemini AI
                </a>
              </li>
              <li>
                <a
                  href="https://www.openstreetmap.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  OpenStreetMap
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-dim)] flex items-center gap-1">
            {t(language, "madeWith")} <Heart className="w-3 h-3 text-red-400 fill-red-400" />{" "}
            {t(language, "forPlantLovers")}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Code className="w-4 h-4" />
            </a>
            <span className="text-xs text-[var(--text-dim)]">
              © {new Date().getFullYear()} FloraBase
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
