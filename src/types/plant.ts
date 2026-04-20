// ========================================
// Perenual API Response Types
// ========================================

export interface PlantImage {
  image_id: number;
  license: number;
  license_name: string;
  license_url: string;
  original_url: string;
  regular_url: string;
  medium_url: string;
  small_url: string;
  thumbnail: string;
}

export interface PlantListItem {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[] | null;
  family: string | null;
  genus: string;
  default_image: PlantImage | null;
  cycle: string;
  watering: string;
  sunlight: string[];
}

export interface PlantListResponse {
  data: PlantListItem[];
  to: number;
  per_page: number;
  current_page: number;
  from: number;
  last_page: number;
  total: number;
}

export interface WateringBenchmark {
  value: string;
  unit: string;
}

export interface PlantDimensions {
  type: string | null;
  min_value: number;
  max_value: number;
  unit: string;
}

export interface PlantAnatomy {
  part: string;
  color: string[];
}

export interface PruningCount {
  amount: number;
  interval: string;
}

export interface HardinessZone {
  min: string;
  max: string;
}

export interface PlantDetails {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[] | null;
  family: string | null;
  origin: string[] | null;
  type: string;
  dimensions: PlantDimensions;
  cycle: string;
  watering: string;
  watering_general_benchmark: WateringBenchmark;
  plant_anatomy: PlantAnatomy[];
  sunlight: string[];
  pruning_month: string[];
  pruning_count: PruningCount;
  seeds: number;
  attracts: string[];
  propagation: string[];
  hardiness: HardinessZone;
  flowers: boolean;
  flowering_season: string | null;
  soil: string[];
  pest_susceptibility: string[] | null;
  cones: boolean;
  fruits: boolean;
  edible_fruit: boolean;
  fruiting_season: string | null;
  harvest_season: string | null;
  harvest_method: string | null;
  leaf: boolean;
  edible_leaf: boolean;
  growth_rate: string;
  maintenance: string;
  medicinal: boolean;
  poisonous_to_humans: boolean;
  poisonous_to_pets: boolean;
  drought_tolerant: boolean;
  salt_tolerant: boolean;
  thorny: boolean;
  invasive: boolean;
  rare: boolean;
  tropical: boolean;
  cuisine: boolean;
  indoor: boolean;
  care_level: string;
  description: string;
  default_image: PlantImage | null;
}

// ========================================
// Care Guide Types
// ========================================

export interface CareGuideSection {
  id: number;
  type: string;
  description: string;
}

export interface CareGuideItem {
  id: number;
  species_id: number;
  common_name: string;
  scientific_name: string[];
  section: CareGuideSection[];
}

export interface CareGuideResponse {
  data: CareGuideItem[];
  to: number;
  per_page: number;
  current_page: number;
  from: number;
  last_page: number;
  total: number;
}

// ========================================
// Pest & Disease Types
// ========================================

export interface PestDiseaseImage {
  license: number;
  license_name: string;
  license_url: string;
  original_url: string;
  regular_url: string;
  medium_url: string;
  small_url: string;
  thumbnail: string;
}

export interface PestDisease {
  id: number;
  common_name: string;
  scientific_name: string;
  other_name: string[] | null;
  family: string | null;
  description: string | null;
  solution: string | null;
  host: string[];
  images: PestDiseaseImage[];
}

export interface PestDiseaseResponse {
  data: PestDisease[];
  to: number;
  per_page: number;
  current_page: number;
  from: number;
  last_page: number;
  total: number;
}

// ========================================
// Weather Types (OpenWeatherMap)
// ========================================

export interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  description: string;
  icon: string;
  wind_speed: number;
  city: string;
  country: string;
  rain?: number;
  clouds: number;
}

export interface WeatherAPIResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    '1h'?: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

// ========================================
// Predictor Types
// ========================================

export interface PredictorInput {
  date: string;
  region: string;
  lat: number;
  lon: number;
  environment: 'indoor' | 'outdoor';
}

export interface PredictorResult {
  plant: PlantListItem;
  score: number;
  reasons: string[];
  estimatedHarvestDays?: number;
}

// ========================================
// Fertilizer Types
// ========================================

export interface Fertilizer {
  id: string;
  name: string;
  description: string;
  npk: string;
  type: 'organic' | 'chemical' | 'bio';
  bestFor: string[];
  plantTypes: string[];
  soilTypes: string[];
  image: string;
  amazonUrl: string;
  flipkartUrl: string;
  priceRange: string;
}

// ========================================
// Region Types
// ========================================

export interface Region {
  name: string;
  country: string;
  lat: number;
  lon: number;
  climate: string;
}
