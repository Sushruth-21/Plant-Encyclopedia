"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cloud, Droplets, Thermometer, Wind, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import PredictorForm from "@/components/predictor/PredictorForm";
import type { WeatherData, PredictorResult } from "@/types/plant";

export default function PredictorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{
    weather: WeatherData;
    season: string;
    region?: string;
    recommendations: PredictorResult[];
    aiInsight?: string;
  } | null>(null);

  const handlePredict = async (formData: { date: string; lat: number; lon: number; environment: string }) => {
    setIsLoading(true);
    setData(null);
    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Prediction failed");
      }
      const result = await res.json();
      setData(result);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById("predictor-results")?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message || "Failed to generate predictions. Please try again."}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Smart Plant <span className="text-[var(--accent-gold)]">Predictor</span>
          </h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
            Our algorithm analyzes real-time weather data, local climate, and your planting environment 
            to recommend the botanical species most likely to thrive.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Form */}
          <div className="md:col-span-12 lg:col-span-5">
            <PredictorForm onSubmit={handlePredict} isLoading={isLoading} />
          </div>

          {/* Results Area */}
          <div className="md:col-span-12 lg:col-span-7" id="predictor-results">
            {data ? (
              <div className="space-y-6 animate-fade-in">
                {/* Context Card (Weather/Season) */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4 border-b border-[var(--border-subtle)] pb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    Current Conditions in {data.weather.city || "your location"}
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                        <Thermometer className="w-3.5 h-3.5" /> Temp
                      </span>
                      <span className="text-xl font-bold text-red-400">{Math.round(data.weather.temp)}°C</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                        <Droplets className="w-3.5 h-3.5 text-blue-400" /> Humidity
                      </span>
                      <span className="text-xl font-bold text-blue-400">{data.weather.humidity}%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                        <Cloud className="w-3.5 h-3.5 text-gray-400" /> Clouds
                      </span>
                      <span className="text-xl font-bold text-gray-400">{data.weather.clouds}%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                        Season
                      </span>
                      <span className="text-xl font-bold text-[var(--accent-gold)] capitalize">{data.season}</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    Top Matches
                  </h3>
                  <div className="space-y-4">
                    {data.recommendations.map((rec, idx) => (
                      <div key={rec.plant.id} className="glass-card p-5 flex flex-col sm:flex-row gap-5 relative overflow-hidden group hover:border-green-400/50 transition-colors">
                        
                        {/* Rank Ribbon */}
                        <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                          <div className={`absolute top-2 -left-6 w-24 h-6 text-center text-xs font-bold -rotate-45 leading-6 shadow-md ${
                            idx === 0 ? "bg-[var(--accent-gold)] text-black" :
                            idx === 1 ? "bg-gray-300 text-black" : "bg-amber-700 text-white"
                          }`}>
                            #{idx + 1}
                          </div>
                        </div>

                        {/* Image */}
                        <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-[var(--bg-tertiary)] flex-shrink-0">
                          {rec.plant.default_image?.thumbnail ? (
                            <Image 
                              src={rec.plant.default_image.thumbnail} 
                              alt={rec.plant.common_name}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl">🌿</div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col min-w-0">
                          <div className="flex justify-between items-start pl-4 sm:pl-0">
                            <div>
                              <h4 className="text-lg font-bold text-[var(--text-primary)] truncate">
                                {rec.plant.common_name}
                              </h4>
                              <p className="text-sm text-[var(--text-muted)] italic">
                                {rec.plant.scientific_name?.[0]}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-2xl font-black text-green-400 block leading-none">{rec.score}</span>
                              <span className="text-[0.6rem] text-[var(--text-muted)] uppercase tracking-wider">Match Score</span>
                            </div>
                          </div>

                          {/* Reasons */}
                          <div className="mt-3 space-y-1 pl-4 sm:pl-0 flex-1">
                            {rec.reasons.slice(0, 2).map((reason, i) => (
                              <p key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-1">{reason}</span>
                              </p>
                            ))}
                          </div>

                          <div className="mt-3 text-right">
                            <Link href={`/plant/${rec.plant.id}`} className="inline-flex items-center gap-1 text-sm text-green-400 font-medium hover:text-green-300 transition-colors">
                              View full care guide <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}

                    {data.recommendations.length === 0 && (
                      <div className="glass-card p-10 text-center text-[var(--text-muted)]">
                        No strong matches found for these conditions. Try adjusting your parameters.
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Insight */}
                {data.aiInsight && (
                  <div className="mt-4 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex gap-2">
                      <Sparkles className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {data.aiInsight}
                    </p>
                  </div>
                )}

                {data.region && (
                  <div className="mt-3 text-xs text-[var(--text-muted)] flex items-center gap-1">
                    📍 Detected region: <span className="capitalize text-green-400 font-medium">{data.region}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="glass-card p-10 h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mb-2">
                  <Sparkles className="w-8 h-8 text-[var(--text-dim)]" />
                </div>
                <h3 className="text-xl font-medium text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-heading)" }}>Awaiting Input</h3>
                <p className="text-[var(--text-muted)] max-w-sm">
                  Fill out the form to generate a personalized list of plants that will thrive in your specific conditions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
