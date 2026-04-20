"use client";

import { useState } from "react";
import { Calculator, Calendar, MapPin, TrendingUp, Loader2 } from "lucide-react";
import regions from "@/data/regions.json";

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

  const handleCalculate = async () => {
    if (!plantingDate || !selectedRegion) return;

    setIsCalculating(true);
    const region = regions.find((r) => r.name === selectedRegion);
    if (!region) return;

    try {
      // Fetch weather for the region
      const weatherRes = await fetch(
        `/api/weather?lat=${region.lat}&lon=${region.lon}`
      );

      let weatherData = null;
      if (weatherRes.ok) {
        weatherData = await weatherRes.json();
      }

      // Calculate based on plant data
      const date = new Date(plantingDate);
      const month = date.getMonth();

      // Determine season
      const isNorthern = region.lat >= 0;
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

      // Success rate
      let successRate = 50;
      const weatherMatch = weatherData ? weatherData.temp >= 10 && weatherData.temp <= 35 : false;
      if (weatherMatch) successRate += 15;
      if (season === "Spring" || season === "Summer") successRate += 15;
      if (plant.hardiness) {
        const zoneMin = parseInt(plant.hardiness.min);
        if (zoneMin <= 10) successRate += 10;
      }
      successRate = Math.min(successRate, 95);

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
    } catch (err) {
      console.error("Calculation error:", err);
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
        Growth Prediction Calculator
      </h2>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-[var(--text-muted)] mb-1.5">
            <Calendar className="w-3.5 h-3.5 inline mr-1" />
            Planting Date
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
            Region
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="input-field"
            id="planting-region"
          >
            <option value="">Select a region</option>
            {regions.map((r) => (
              <option key={r.name} value={r.name}>
                {r.name}, {r.country}
              </option>
            ))}
          </select>
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
        {isCalculating ? "Calculating..." : "Predict Growth"}
      </button>

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
              <div className="text-xs text-[var(--text-muted)]">Success Rate</div>
            </div>

            {/* Duration */}
            <div className="text-center flex flex-col justify-center">
              <div className="text-3xl font-bold text-[var(--accent-gold)] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                {result.harvestDays}
              </div>
              <div className="text-xs text-[var(--text-muted)]">Days to Harvest</div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Season</span>
              <span className="text-[var(--text-primary)]">{result.season}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Est. Harvest</span>
              <span className="text-[var(--text-primary)]">{result.harvestDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Weather Match</span>
              <span className={result.weatherMatch ? "text-green-400" : "text-yellow-400"}>
                {result.weatherMatch ? "✓ Favorable" : "⚠ Marginal"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
