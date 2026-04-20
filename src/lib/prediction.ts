import { PlantListItem, WeatherData } from '@/types/plant';

/**
 * Determine the season based on date and hemisphere.
 * Northern hemisphere assumed unless latitude < 0.
 */
export function getSeason(date: Date, lat: number): string {
  const month = date.getMonth(); // 0-indexed
  const isNorthern = lat >= 0;

  if (isNorthern) {
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  } else {
    if (month >= 2 && month <= 4) return 'autumn';
    if (month >= 5 && month <= 7) return 'winter';
    if (month >= 8 && month <= 10) return 'spring';
    return 'summer';
  }
}

/**
 * Get USDA hardiness zone from average minimum temperature (Celsius).
 */
export function getHardinessZone(minTemp: number): number {
  if (minTemp < -45.6) return 1;
  if (minTemp < -40) return 2;
  if (minTemp < -34.4) return 3;
  if (minTemp < -28.9) return 4;
  if (minTemp < -23.3) return 5;
  if (minTemp < -17.8) return 6;
  if (minTemp < -12.2) return 7;
  if (minTemp < -6.7) return 8;
  if (minTemp < -1.1) return 9;
  if (minTemp < 4.4) return 10;
  if (minTemp < 10) return 11;
  return 12;
}

/**
 * Score a plant for recommendation based on weather and user preferences.
 */
export function scorePlant(
  plant: PlantListItem,
  weather: WeatherData,
  season: string,
  environment: 'indoor' | 'outdoor'
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // Indoor/outdoor match
  if (environment === 'indoor') {
    // Prefer plants that can grow indoors
    // We infer from sunlight and watering requirements
    const hasShadeTolerance = plant.sunlight?.some(
      (s) =>
        s.toLowerCase().includes('shade') ||
        s.toLowerCase().includes('part') ||
        s.toLowerCase().includes('filtered')
    );
    if (hasShadeTolerance) {
      score += 25;
      reasons.push('Tolerates indoor light conditions');
    }
  } else {
    // Outdoor: full sun plants score higher
    const needsFullSun = plant.sunlight?.some((s) =>
      s.toLowerCase().includes('full sun')
    );
    if (needsFullSun && weather.clouds < 50) {
      score += 20;
      reasons.push('Thrives in current sunny conditions');
    }
  }

  // Temperature compatibility (estimate from hardiness)
  const temp = weather.temp;
  if (temp >= 15 && temp <= 30) {
    score += 20;
    reasons.push(`Current ${temp}°C is in ideal growing range`);
  } else if (temp >= 10 && temp <= 35) {
    score += 10;
    reasons.push(`Current ${temp}°C is acceptable for growth`);
  }

  // Watering vs rainfall
  const isRainy = weather.humidity > 70 || (weather.rain && weather.rain > 0);
  if (plant.watering === 'Frequent' && isRainy) {
    score += 15;
    reasons.push('High moisture matches frequent watering needs');
  } else if (plant.watering === 'Minimum' && !isRainy) {
    score += 15;
    reasons.push('Low moisture suits minimal watering needs');
  } else if (plant.watering === 'Average') {
    score += 10;
    reasons.push('Moderate watering needs are easy to manage');
  }

  // Seasonal alignment
  if (plant.cycle === 'Annual') {
    if (season === 'spring') {
      score += 15;
      reasons.push('Spring is ideal for planting annuals');
    } else if (season === 'summer') {
      score += 10;
      reasons.push('Summer planting possible for fast-growing annuals');
    }
  } else if (plant.cycle === 'Perennial') {
    score += 10;
    reasons.push('Perennials grow year-round with proper care');
  }

  // Bonus for popular/common plants
  if (plant.common_name) {
    score += 5;
  }

  return { score: Math.min(score, 100), reasons };
}

/**
 * Estimate harvest duration in days based on plant cycle and growth rate.
 */
export function estimateHarvestDays(
  cycle: string,
  growthRate: string,
  _harvestSeason: string | null
): number {
  let baseDays = 120; // default

  // Adjust by growth rate
  if (growthRate === 'High') baseDays = 60;
  else if (growthRate === 'Moderate' || growthRate === 'Medium') baseDays = 90;
  else if (growthRate === 'Low') baseDays = 180;

  // Adjust by cycle
  if (cycle === 'Annual') baseDays = Math.min(baseDays, 120);
  if (cycle === 'Biennial') baseDays = Math.max(baseDays, 365);
  if (cycle === 'Perennial') baseDays = Math.max(baseDays, 180);

  return baseDays;
}

/**
 * Calculate harvest success percentage based on conditions.
 */
export function calculateHarvestSuccess(
  hardinessMatch: boolean,
  weatherMatch: boolean,
  seasonMatch: boolean,
  environment: 'indoor' | 'outdoor'
): number {
  let successRate = 50; // base

  if (hardinessMatch) successRate += 20;
  if (weatherMatch) successRate += 15;
  if (seasonMatch) successRate += 10;
  if (environment === 'indoor') successRate += 5; // controlled environment bonus

  return Math.min(successRate, 95);
}
