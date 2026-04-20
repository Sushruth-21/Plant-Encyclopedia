"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Search, Loader2, MapPin } from "lucide-react";

interface Props {
  origins: string[];
  plantName?: string;
}

interface Location {
  lat: number;
  lon: number;
  name: string;
}

// Helper to center map
function MapController({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 4, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

export default function PlantMap({ origins, plantName }: Props) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedLocation, setSearchedLocation] = useState<Location | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef(null);

  // Initial geocoding of origin regions (max 3 to avoid rate limits on free Nominatim)
  useEffect(() => {
    let cancelled = false;
    
    async function geocodeOrigins() {
      const topOrigins = origins.slice(0, 3);
      const newLocations: Location[] = [];

      for (const origin of topOrigins) {
        if (cancelled) break;
        try {
          // Add delay to respect Nominatim usage policy (1 request per second)
          await new Promise((resolve) => setTimeout(resolve, 1200));
          
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 5000);
          
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              origin
            )}&format=json&limit=1`,
            {
              signal: controller.signal,
              headers: {
                'User-Agent': 'FloraBase-PlantEncyclopedia/1.0',
                'Accept': 'application/json',
              },
            }
          );
          
          clearTimeout(timeout);
          if (!res.ok) continue;
          
          const data = await res.json();
          if (data && data.length > 0) {
            newLocations.push({
              lat: parseFloat(data[0].lat),
              lon: parseFloat(data[0].lon),
              name: origin,
            });
          }
        } catch (error: any) {
          if (error.name !== 'AbortError') {
            console.warn("Geocoding skipped for:", origin);
          }
        }
      }
      
      if (!cancelled && newLocations.length > 0) {
        setLocations(newLocations);
      }
    }

    if (origins && origins.length > 0) {
      geocodeOrigins();
    }
    
    return () => { cancelled = true; };
  }, [origins]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json&limit=1`,
        {
          signal: controller.signal,
          headers: {
            'User-Agent': 'FloraBase-PlantEncyclopedia/1.0',
            'Accept': 'application/json',
          },
        }
      );
      
      clearTimeout(timeout);
      const data = await res.json();
      if (data && data.length > 0) {
        setSearchedLocation({
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
          name: searchQuery,
        });
      }
    } catch (error) {
      console.warn("Search geocoding failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Determine initial center
  const center: [number, number] = locations.length > 0 
    ? [locations[0].lat, locations[0].lon] 
    : [20, 0]; // Default to equitable global view

  return (
    <div className="flex flex-col gap-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search a location to see viability..."
          className="input-field pl-10 pr-10"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-green-400/20 text-green-400 hover:bg-green-400/30 transition-colors"
          disabled={isSearching || !searchQuery.trim()}
        >
          {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </button>
      </form>

      {/* Map */}
      <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-[var(--border-subtle)] relative z-0">
        <MapContainer
          center={center}
          zoom={3}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          {searchedLocation && <MapController center={[searchedLocation.lat, searchedLocation.lon]} />}
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="map-tiles"
          />

          {/* Origin Markers */}
          {locations.map((loc, idx) => (
            <Marker key={idx} position={[loc.lat, loc.lon]}>
              <Popup>
                <div className="font-semibold" style={{ fontFamily: "var(--font-heading)" }}>Native Region: {loc.name}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">
                  Ideal conditions for {plantName || "this plant"}.
                </div>
              </Popup>
            </Marker>
          ))}

          {/* User Search Marker */}
          {searchedLocation && (
            <Marker position={[searchedLocation.lat, searchedLocation.lon]}>
              <Popup>
                <div className="font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{searchedLocation.name}</div>
                <div className="p-2 mt-2 rounded bg-amber-500/10 border border-amber-500/20">
                  <div className="text-xs font-bold text-amber-500 mb-1">⚠️ Environment Check needed</div>
                  <div className="text-[0.65rem] text-[var(--text-muted)]">
                    Local climate data must be compared against hardiness zones for outdoor planting.
                  </div>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      <style jsx global>{`
        /* Make standard light tiles fit a bit better with dark theme via CSS filter */
        .leaflet-layer,
        .leaflet-control-zoom-in,
        .leaflet-control-zoom-out,
        .leaflet-control-attribution {
          filter: invert(1) hue-rotate(180deg) brightness(95%) contrast(90%);
        }
      `}</style>
    </div>
  );
}
