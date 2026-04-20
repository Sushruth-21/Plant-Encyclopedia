import { ShoppingCart, ExternalLink, Tag } from "lucide-react";
import fertilizersData from "@/data/fertilizers.json";

interface Props {
  plant: {
    type: string;
    flowers: boolean;
    fruits: boolean;
    indoor: boolean;
    soil: string[];
  };
}

export default function MarketSection({ plant }: Props) {
  // Filter fertilizers based on plant type, indoor/outdoor, and soil
  const recommendedFertilizers = fertilizersData
    .filter((f) => {
      // Basic matching logic
      const isFlowerFert = f.bestFor.includes("flowering plants") || f.plantTypes.includes("flower");
      const isFruitFert = f.bestFor.includes("fruiting plants") || f.plantTypes.includes("fruit");
      const isIndoorFert = f.plantTypes.includes("houseplant");

      if (plant.indoor && isIndoorFert) return true;
      if (plant.flowers && isFlowerFert) return true;
      if (plant.fruits && isFruitFert) return true;
      if (f.plantTypes.includes("all")) return true;

      // Type match (tree, vegetable, etc.)
      return f.plantTypes.some((t) => plant.type?.toLowerCase().includes(t));
    })
    .slice(0, 3); // Take top 3

  if (recommendedFertilizers.length === 0) return null;

  return (
    <div className="glass-card p-6">
      <h2
        className="text-xl font-semibold mb-4 flex items-center gap-2"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        <ShoppingCart className="w-5 h-5 text-orange-400" />
        Recommended Fertilizers
      </h2>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        Products specifically selected based on this plant&apos;s soil and nutrient requirements.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recommendedFertilizers.map((fert) => (
          <div
            key={fert.id}
            className="flex flex-col rounded-xl border border-[var(--border-subtle)] bg-white/3 overflow-hidden group hover:border-[var(--accent-gold)] transition-colors"
          >
            {/* Image Placeholder */}
            <div className="h-32 bg-[var(--bg-tertiary)] flex items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')]" />
              <div className="relative z-10 w-16 h-20 rounded bg-white/10 border border-white/20 flex flex-col items-center justify-center shadow-lg">
                <span className="text-[0.6rem] font-bold text-white/50 tracking-widest">{fert.type.toUpperCase()}</span>
                <span className="text-sm font-bold text-[var(--accent-gold)] mt-1">{fert.npk}</span>
              </div>
              <div className="absolute top-2 right-2">
                <span className="badge badge-gold !text-[0.6rem] !py-0.5">{fert.type}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1 line-clamp-1" title={fert.name}>
                {fert.name}
              </h3>
              <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2">
                {fert.description}
              </p>

              {/* Best For Tags */}
              <div className="flex flex-wrap gap-1 mb-4 mt-auto">
                {fert.bestFor.slice(0, 2).map((tag) => (
                  <span key={tag} className="flex items-center gap-1 text-[0.65rem] text-[var(--text-secondary)] bg-green-500/10 px-1.5 py-0.5 rounded">
                    <Tag className="w-2 h-2" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price & Links */}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  {fert.priceRange}
                </span>
                <a
                  href={fert.amazonUrl} // Using Amazon as primary
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[var(--accent-gold)] text-black flex items-center justify-center hover:scale-110 transition-transform"
                  title="Buy on Amazon"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
