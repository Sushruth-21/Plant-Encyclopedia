"use client";

import { useState } from "react";
import { Calculator, Calendar, MapPin, TrendingUp, Loader2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/context/translations";

interface Props {
  plant: {
    common_name: string;
    cycle: string;
    growth_rate: string;
    harvest_season: string | null;
    hardiness: { min: string; max: string };
  };
}

export default function GrowthCalculator({ plant }: Props) {
  const { language } = useLanguage();
  const [plantingDate, setPlantingDate] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<{
    harvestDays: number;
    successRate: number;
    harvestDate: string;
    weatherMatch: boolean;
    season: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCalculate = async () => {
    if (!plantingDate || !selectedRegion) return;

    setIsCalculating(true);
    setErrorMsg(null);
    setResult(null);

    try {
      // Fetch weather for the free-text region
      const weatherRes = await fetch(
        `/api/weather?city=${encodeURIComponent(selectedRegion)}`
      );

      if (!weatherRes.ok) {
        throw new Error("Could not find weather data for this location.");
      }

      const weatherData = await weatherRes.json();
      
      if (!weatherData.lat && weatherData.lat !== 0) {
        throw new Error("Invalid location format.");
      }

      // Calculate based on plant data
      const date = new Date(plantingDate);
      const month = date.getMonth();

      // Determine season from weather coordinate
      const isNorthern = weatherData.lat >= 0;
      let season: string;
      if (isNorthern) {
        if (month >= 2 && month <= 4) season = "Spring";
        else if (month >= 5 && month <= 7) season = "Summer";
        else if (month >= 8 && month <= 10) season = "Autumn";
        else season = "Winter";
      } else {
        if (month >= 2 && month <= 4) season = "Autumn";
        else if (month >= 5 && month <= 7) season = "Winter";
        else if (month >= 8 && month <= 10) season = "Spring";
        else season = "Summer";
      }

      // Base harvest days from growth rate
      let harvestDays = 120;
      if (plant.growth_rate === "High") harvestDays = 60;
      else if (plant.growth_rate === "Moderate" || plant.growth_rate === "Medium") harvestDays = 90;
      else if (plant.growth_rate === "Low") harvestDays = 180;

      if (plant.cycle === "Annual") harvestDays = Math.min(harvestDays, 120);
      if (plant.cycle === "Biennial") harvestDays = Math.max(harvestDays, 365);
      if (plant.cycle === "Perennial") harvestDays = Math.max(harvestDays, 180);

      // Strict Success Rate Calculation
      let successRate = 20; // Base score
      let weatherMatch = false;

      // Judge by current temperature context
      if (weatherData.temp >= 15 && weatherData.temp <= 30) {
        successRate += 40; // Optimal temp
        weatherMatch = true;
      } else if (weatherData.temp >= 5 && weatherData.temp < 15) {
        successRate += 10; // Cool, but tolerable
      } else if (weatherData.temp > 30 && weatherData.temp <= 35) {
        successRate += 10; // Hot, but tolerable
      } else {
        successRate -= 20; // Extreme weather penalty (frost or heat wave)
      }

      // Season bonuses
      if (season === "Spring") successRate += 20;
      else if (season === "Summer" || season === "Autumn") successRate += 10;
      else if (season === "Winter") successRate -= 10; // Winter penalty

      // Optional hardiness bonus
      if (plant.hardiness && plant.hardiness.min) {
        const zoneMin = parseInt(plant.hardiness.min);
        if (!isNaN(zoneMin)) successRate += 10;
      }

      // Constrain score strictly between 0 and 100
      successRate = Math.max(0, Math.min(successRate, 100));

      // Calculate harvest date
      const harvestDate = new Date(date);
      harvestDate.setDate(harvestDate.getDate() + harvestDays);

      setResult({
        harvestDays,
        successRate,
        harvestDate: harvestDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        weatherMatch,
        season,
      });
    } catch (err: any) {
      console.error("Calculation error:", err);
      setErrorMsg(err.message || "Failed to calculate growth parameters.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="glass-card p-6">
      <h2
        className="text-xl font-semibold mb-4 flex items-center gap-2"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        <Calculator className="w-5 h-5 text-green-400" />
        {t(language, "growthPrediction")}
      </h2>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-[var(--text-muted)] mb-1.5">
            <Calendar className="w-3.5 h-3.5 inline mr-1" />
            {t(language, "plantingDate")}
          </label>
          <input
            type="date"
            value={plantingDate}
            onChange={(e) => setPlantingDate(e.target.value)}
            className="input-field"
            id="planting-date"
          />
        </div>
        <div>
          <label className="block text-sm text-[var(--text-muted)] mb-1.5">
            <MapPin className="w-3.5 h-3.5 inline mr-1" />
            {t(language, "region")}
          </label>
          <input
            type="text"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            placeholder="e.g. London, Mumbai, Tokyo"
            className="input-field"
            id="planting-region"
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!plantingDate || !selectedRegion || isCalculating}
        className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
        id="calculate-growth"
      >
        {isCalculating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <TrendingUp className="w-4 h-4" />
        )}
        {isCalculating ? t(language, "calculating") : t(language, "predictGrowth")}
      </button>

      {/* Error Message */}
      {errorMsg && (
        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2 text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{errorMsg}</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-6 p-5 rounded-xl bg-white/3 border border-[var(--border-accent)] animate-scale-in">
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Success Ring */}
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="rgba(74, 222, 128, 0.1)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${result.successRate * 2.51} 251`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-green-400">
                    {result.successRate}%
                  </span>
                </div>
              </div>
              <div className="text-xs text-[var(--text-muted)]">{t(language, "successRate")}</div>
            </div>

            {/* Duration */}
            <div className="text-center flex flex-col justify-center">
              <div className="text-3xl font-bold text-[var(--accent-gold)] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                {result.harvestDays}
              </div>
              <div className="text-xs text-[var(--text-muted)]">{t(language, "daysToHarvest")}</div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{t(language, "season")}</span>
              <span className="text-[var(--text-primary)]">{result.season}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{t(language, "estHarvest")}</span>
              <span className="text-[var(--text-primary)]">{result.harvestDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">{t(language, "weatherMatch")}</span>
              <span className={result.weatherMatch ? "text-green-400" : "text-yellow-400"}>
                {result.weatherMatch ? t(language, "favorable") : t(language, "marginal")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
