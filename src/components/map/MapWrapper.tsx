import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import the map component with SSR disabled
const PlantMap = dynamic(() => import("./PlantMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-[var(--bg-tertiary)] rounded-2xl flex flex-col items-center justify-center border border-[var(--border-subtle)]">
      <Loader2 className="w-8 h-8 text-green-400 animate-spin mb-4" />
      <span className="text-[var(--text-muted)] text-sm font-medium">Loading Map...</span>
    </div>
  ),
});

interface Props {
  origins: string[];
  plantName?: string;
}

export default function MapWrapper({ origins, plantName }: Props) {
  return <PlantMap origins={origins} plantName={plantName} />;
}
