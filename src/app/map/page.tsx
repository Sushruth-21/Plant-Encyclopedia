"use client";

import { useState } from "react";
import { MapPin, Info } from "lucide-react";
import dynamic from "next/dynamic";
import regions from "@/data/regions.json";
import type { Region } from "@/types/plant";

// Dynamically import the map to avoid SSR issues
const PlantMap = dynamic(() => import("@/components/map/PlantMap"), { ssr: false });

export default function GlobalMapPage() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  // We feed all regions to the map, but PlantMap expects string names to geocode.
  // Actually, wait, our MapWrapper/PlantMap component expects `origins`. 
  // Let's adapt this specifically for the Map Explorer view by feeding region names.
  const allOrigins = regions.map((r) => r.name);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Global <span className="text-blue-400">Growth Map</span>
          </h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
            Explore native plant regions and look up local viability across the globe.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar / Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass-card p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                <Info className="w-4 h-4 text-blue-400" />
                How to use
              </h3>
              <ul className="text-sm text-[var(--text-muted)] space-y-2">
                <li>• Search for your city in the map to verify local climate data.</li>
                <li>• Markers indicate primary botanical hubs and native plant origins.</li>
                <li>• Cross-reference local climate with plant hardiness zones for outdoor planting.</li>
              </ul>
            </div>

            <div className="glass-card p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                <MapPin className="w-4 h-4 text-green-400" />
                Key Regions
              </h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {regions.map((region) => (
                  <button
                    key={region.name}
                    onClick={() => setSelectedRegion(region)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedRegion?.name === region.name
                        ? "bg-blue-500/10 text-blue-400"
                        : "hover:bg-white/5 text-[var(--text-secondary)]"
                    }`}
                  >
                    <div>{region.name}</div>
                    <div className="text-xs opacity-70">{region.country} • {region.climate}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <div className="glass-card p-2">
               {/* We pass a subset of regions to avoid overloading Nominatim limits during demo */}
               <PlantMap 
                  origins={selectedRegion ? [selectedRegion.name] : allOrigins.slice(0, 5)} 
                  plantName="Local Flora"
               />
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
