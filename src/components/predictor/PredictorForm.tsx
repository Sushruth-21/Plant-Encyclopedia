import { useState, useEffect } from "react";
import { Sparkles, MapPin, Calendar, LayoutGrid, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

interface PredictorFormProps {
  onSubmit: (data: { date: string; lat: number; lon: number; environment: 'indoor' | 'outdoor' }) => void;
  isLoading: boolean;
}

export default function PredictorForm({ onSubmit, isLoading }: PredictorFormProps) {
  const { language } = useLanguage();
  const [date, setDate] = useState("");
  const [environment, setEnvironment] = useState<'indoor' | 'outdoor'>('outdoor');
  const [locationType, setLocationType] = useState<'auto' | 'manual'>('auto');
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [locationError, setLocationError] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  // Set default date to today
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDate(today);
  }, []);

  const handleGetLocation = () => {
    setIsLocating(true);
    setLocationError("");
    
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setLocationType('auto');
        setIsLocating(false);
      },
      (error) => {
        console.error("Geo error:", error);
        setLocationError("Unable to retrieve location. Please manually search for your city.");
        setLocationType('manual');
        setIsLocating(false);
      }
    );
  };

  const handleManualLocation = async () => {
    if (!city) return;
    
    setIsLocating(true);
    setLocationError("");
    
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`);
      const data = await res.json();
      
      if (data && data.length > 0) {
        setCoordinates({
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon)
        });
      } else {
        setLocationError("City not found. Try adding country name.");
      }
    } catch (_err) {
      setLocationError("Error finding city.");
    } finally {
      setIsLocating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !coordinates) return;
    
    onSubmit({
      date,
      lat: coordinates.lat,
      lon: coordinates.lon,
      environment
    });
  };

  return (
    <div className="glass-card p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
        <Sparkles className="w-6 h-6 text-green-400" />
        Plant Predictor
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Environment toggle */}
        <div>
          <label className="block text-sm font-medium mb-3 text-[var(--text-secondary)]">
            <LayoutGrid className="w-4 h-4 inline mr-2" />
            Where do you plan to grow?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setEnvironment('indoor')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                environment === 'indoor' 
                ? "bg-green-500/10 border-green-500/50 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.1)]" 
                : "border-[var(--border-subtle)] bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:border-green-500/30"
              }`}
            >
              <span className="text-2xl">🪴</span>
              <span className="font-medium text-sm">Indoor</span>
            </button>
            <button
              type="button"
              onClick={() => setEnvironment('outdoor')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                environment === 'outdoor' 
                ? "bg-amber-500/10 border-amber-500/50 text-[var(--accent-gold)] shadow-[0_0_15px_rgba(212,165,116,0.1)]" 
                : "border-[var(--border-subtle)] bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:border-amber-500/30"
              }`}
            >
              <span className="text-2xl">🌱</span>
              <span className="font-medium text-sm">Outdoor / Garden</span>
            </button>
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
            <Calendar className="w-4 h-4 inline mr-2" />
            Target Planting Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field w-full"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-3 text-[var(--text-secondary)]">
            <MapPin className="w-4 h-4 inline mr-2" />
            Your Location
          </label>
          
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => { setLocationType('auto'); handleGetLocation(); }}
              className={`flex-1 py-2 text-sm rounded-lg border transition-colors ${
                locationType === 'auto'
                ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                : "border-[var(--border-subtle)] text-[var(--text-muted)]"
              }`}
            >
              Use GPS
            </button>
            <button
              type="button"
              onClick={() => setLocationType('manual')}
              className={`flex-1 py-2 text-sm rounded-lg border transition-colors ${
                locationType === 'manual'
                ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                : "border-[var(--border-subtle)] text-[var(--text-muted)]"
              }`}
            >
              Enter City
            </button>
          </div>

          {locationType === 'manual' && (
            <div className="flex gap-2 animate-fade-in">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. London, UK"
                className="input-field flex-1"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleManualLocation())}
              />
              <button
                type="button"
                onClick={handleManualLocation}
                disabled={!city || isLocating}
                className="btn-secondary px-4 !py-2"
              >
                Find
              </button>
            </div>
          )}

          {/* Location Status area */}
          <div className="mt-3 text-sm">
            {isLocating && (
              <span className="text-[var(--text-muted)] flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Locating...
              </span>
            )}
            {locationError && (
              <span className="text-red-400">{locationError}</span>
            )}
            {!isLocating && !locationError && coordinates && (
              <span className="text-green-400 flex items-center gap-1">
                ✓ Location set ({coordinates.lat.toFixed(2)}, {coordinates.lon.toFixed(2)})
              </span>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary w-full justify-center !py-4 text-lg mt-4 disabled:opacity-50"
          disabled={isLoading || !coordinates || !date}
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          {isLoading ? "Analyzing..." : (translations[language]?.tryPredictor || "Generate Insights")}
        </button>
      </form>
    </div>
  );
}
