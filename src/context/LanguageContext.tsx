"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type SupportedLanguage = 
  | "English" 
  | "Hindi" 
  | "Kannada" 
  | "Telugu" 
  | "Tamil" 
  | "Malayalam" 
  | "Gujarati";

export const languageCodeMap: Record<SupportedLanguage, string> = {
  English: "en-IN",
  Hindi: "hi-IN",
  Kannada: "kn-IN",
  Telugu: "te-IN",
  Tamil: "ta-IN",
  Malayalam: "ml-IN",
  Gujarati: "gu-IN",
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  languageCode: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("English");

  useEffect(() => {
    // Load preference from localStorage on mount
    const savedLang = localStorage.getItem("florabase-lang") as SupportedLanguage;
    if (savedLang && Object.keys(languageCodeMap).includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem("florabase-lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languageCode: languageCodeMap[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
