// Mapbox configuration and utilities

// Get Mapbox token from environment - safely handles SSR
// In Next.js, process.env is available during build but runtime env vars need to be accessed carefully
export function getMapboxToken(): string {
  // Use typeof check to ensure we're in a client/server environment where process exists
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
  }
  return '';
}

// Map configuration constants
export const MAP_CONFIG = {
  // Default center coordinates (Almería coast)
  center: {
    lng: -2.4,
    lat: 36.8,
  },
  // Default zoom level
  defaultZoom: 9,
  // Min/max zoom levels
  minZoom: 7,
  maxZoom: 14,
  // Bounds for the Almería coast
  bounds: {
    north: 37.5,
    south: 36.6,
    east: -1.5,
    west: -3.2,
  },
  // Style URL
  style: 'mapbox://styles/mapbox/dark-v11',
};

// Tier-based marker colors
export const TIER_COLORS = {
  value: '#10b981',
  mid: '#38bdf8',
  premium: '#f43f5e',
} as const;

// Region-based colors
export const REGION_COLORS = {
  west: '#8b5cf6',
  central: '#0ea5e9',
  'cabo-de-gata': '#f59e0b',
  east: '#ec4899',
} as const;

// Get marker color based on market position
export function getMarkerColor(marketPosition: 'value' | 'mid' | 'premium'): string {
  return TIER_COLORS[marketPosition] || TIER_COLORS.mid;
}

// Get region display info
export function getRegionInfo(region: string) {
  const regions: Record<string, { label: string; color: string }> = {
    west: { label: 'West', color: REGION_COLORS.west },
    central: { label: 'Central', color: REGION_COLORS.central },
    'cabo-de-gata': { label: 'Cabo de Gata', color: REGION_COLORS['cabo-de-gata'] },
    east: { label: 'East', color: REGION_COLORS.east },
  };
  return regions[region] || { label: region, color: '#6b7280' };
}

// Get tier display info
export function getTierInfo(marketPosition: 'value' | 'mid' | 'premium') {
  const tiers: Record<string, { label: string; color: string; soft: string; border: string }> = {
    value: { label: 'Value', color: '#10b981', soft: 'rgba(16,185,129,0.14)', border: 'rgba(16,185,129,0.4)' },
    mid: { label: 'Mid-range', color: '#38bdf8', soft: 'rgba(56,189,248,0.14)', border: 'rgba(56,189,248,0.4)' },
    premium: { label: 'Premium', color: '#f43f5e', soft: 'rgba(244,63,94,0.14)', border: 'rgba(244,63,94,0.4)' },
  };
  return tiers[marketPosition] || tiers.mid;
}
