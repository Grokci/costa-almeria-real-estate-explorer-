import { Town } from '@/types/town';
import townsData from '@/data/towns.json';
import { validateTowns } from '@/lib/schemas/town';

// Cache for towns data to avoid repeated parsing/validation
let townsCache: Town[] | null = null;

export function loadTowns(): Town[] {
  if (townsCache) {
    return townsCache;
  }
  
  const { valid, errors } = validateTowns(townsData as unknown[]);
  
  if (errors.length > 0) {
    console.error('Town data validation errors:', errors);
    throw new Error(`Invalid town data: ${errors.length} validation error(s) found`);
  }
  
  townsCache = valid;
  return valid;
}

export function getTownBySlug(slug: string): Town | undefined {
  const towns = loadTowns();
  return towns.find(t => t.slug === slug);
}

export function filterTowns(
  towns: Town[],
  filters: {
    search?: string;
    budget?: { min: number; max: number };
    bestFor?: string[];
    beachAccess?: string;
    airportAccess?: string;
    liveliness?: string;
  }
): Town[] {
  return towns.filter(town => {
    // Search filter
    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase().trim();
      const searchFields = [
        town.name.toLowerCase(),
        town.region,
        town.summary.oneLiner.toLowerCase(),
        town.summary.shortDescription.toLowerCase(),
        town.editorial.vibe.toLowerCase(),
        ...town.summary.bestFor.map(b => b.toLowerCase()),
      ];
      
      const matchesSearch = searchFields.some(field => field.includes(searchTerm));
      if (!matchesSearch) return false;
    }
    
    // Budget filter
    if (filters.budget) {
      const price = town.pricing.avgPricePerSqm;
      // Exclude towns without price data - can't filter accurately
      if (price === undefined) return false;
      if (price < filters.budget.min || price > filters.budget.max) {
        return false;
      }
    }
    
    // Best for filter
    if (filters.bestFor && filters.bestFor.length > 0) {
      const hasMatch = filters.bestFor.some(best => 
        town.summary.bestFor.includes(best)
      );
      if (!hasMatch) return false;
    }
    
    // Beach access filter
    if (filters.beachAccess) {
      if (town.lifestyle.beachAccess !== filters.beachAccess) return false;
    }
    
    // Airport access filter
    if (filters.airportAccess) {
      const airportDist = town.access.driveToAirportMins;
      
      // If no airport data, exclude from filtered results
      if (airportDist === undefined) return false;
      
      if (filters.airportAccess === 'close' && airportDist > 30) return false;
      if (filters.airportAccess === 'medium' && (airportDist <= 30 || airportDist > 60)) return false;
    }
    
    // Liveliness filter
    if (filters.liveliness) {
      if (town.lifestyle.yearRoundLiveliness !== filters.liveliness) return false;
    }
    
    return true;
  });
}
