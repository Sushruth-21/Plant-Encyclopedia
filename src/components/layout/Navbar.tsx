"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Leaf,
  Search,
  Sparkles,
  Map,
  Menu,
  X,
  Languages,
} from "lucide-react";
import { useLanguage, SupportedLanguage, languageCodeMap } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

const getNavLinks = (lang: SupportedLanguage) => {
  const t = translations[lang] || translations.English;
  return [
    { href: "/", label: t.home, icon: Leaf },
    { href: "/search", label: t.explore, icon: Search },
    { href: "/predictor", label: t.predictor, icon: Sparkles },
    { href: "/map", label: t.map, icon: Map },
  ];
};

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          id="nav-logo"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
            <Leaf className="w-5 h-5 text-[#060d06]" />
          </div>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-green-400">Flora</span>
            <span className="text-[var(--accent-gold)]">Base</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {getNavLinks(language).map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-green-400/10 text-green-400"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-400" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Language Selector & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <div className="relative group hidden sm:block">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-400/10 text-green-400 text-xs font-medium cursor-pointer border border-green-400/20">
              <Languages className="w-3.5 h-3.5" />
              <span>{language}</span>
            </div>
            <div className="absolute right-0 top-full mt-2 w-32 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
              {(Object.keys(languageCodeMap) as SupportedLanguage[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-green-400/10 transition-colors ${
                    language === lang ? "text-green-400 bg-green-400/5" : "text-[var(--text-muted)]"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-xl hover:bg-white/5 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          id="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-green-400" />
          ) : (
            <Menu className="w-5 h-5 text-[var(--text-muted)]" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass border-t border-[var(--border-subtle)] animate-slide-down">
          <div className="container-custom py-4 flex flex-col gap-1">
            {getNavLinks(language).map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-green-400/10 text-green-400"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
            
            {/* Language Selection in Mobile Menu */}
            <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
              <div className="px-4 mb-2 text-[0.65rem] uppercase tracking-wider text-[var(--text-muted)] font-bold">
                Select Language
              </div>
              <div className="grid grid-cols-2 gap-2 px-2">
                {(Object.keys(languageCodeMap) as SupportedLanguage[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center justify-center py-2.5 rounded-xl text-xs font-medium transition-all ${
                      language === lang
                        ? "bg-green-400/20 text-green-400 border border-green-400/30"
                        : "text-[var(--text-muted)] hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
