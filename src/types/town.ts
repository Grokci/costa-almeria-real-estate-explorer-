// Canonical Town Type
export type Town = {
  id: string;
  slug: string;
  name: string;
  region: 'west' | 'central' | 'cabo-de-gata' | 'east';
  type: 'city' | 'town' | 'village' | 'beach resort';
  coordinates: {
    lat: number;
    lng: number;
  };
  hero: {
    imageUrl: string;
    alt: string;
  };
  summary: {
    oneLiner: string;
    shortDescription: string;
    bestFor: string[];
    tradeoffs: string[];
  };
  pricing: {
    priceBandLabel: string;
    avgPricePerSqm?: number;
    marketPosition: 'value' | 'mid' | 'premium';
    typicalPropertyTypes: string[];
    buyerNote: string;
  };
  lifestyle: {
    beachAccess: 'excellent' | 'good' | 'okay' | 'limited';
    yearRoundLiveliness: 'high' | 'medium' | 'low';
    internationalFeel: 'high' | 'medium' | 'low';
    walkability: 'high' | 'medium' | 'low';
    familyFit: 'high' | 'medium' | 'low';
    remoteWorkFit: 'high' | 'medium' | 'low';
  };
  access: {
    driveToAlmeriaMins?: number;
    driveToAirportMins?: number;
    nearestHospitalMins?: number;
    beachWalkMins?: number;
  };
  facts: {
    population?: number;
    climateSummary?: string;
    internetQuality?: 'good' | 'okay' | 'variable';
    practicalNotes?: string[];
    healthcareAccessNote?: string;
  };
  highlights: Array<{
    title: string;
    description: string;
    type: 'beach' | 'area' | 'viewpoint' | 'daytrip' | 'food';
  }>;
  editorial: {
    vibe: string;
    whyChooseIt: string;
    whoShouldAvoidIt?: string;
    diningNote?: string;
    nearbyOutingNote?: string;
    topAreaNote?: string;
  };
  metadata: {
    lastReviewed: string;
    confidence: 'high' | 'medium' | 'low';
    sources: string[];
  };
};

// Compare Snapshot Type
export type CompareSnapshot = {
  townId: string;
  slug: string;
  name: string;
  priceBandLabel: string;
  avgPricePerSqm?: number;
  bestFor: string[];
  tradeoffs: string[];
  beachAccess: 'excellent' | 'good' | 'okay' | 'limited';
  driveToAirportMins?: number;
  yearRoundLiveliness: 'high' | 'medium' | 'low';
  walkability: 'high' | 'medium' | 'low';
  internationalFeel: 'high' | 'medium' | 'low';
  remoteWorkFit: 'high' | 'medium' | 'low';
  marketPosition: 'value' | 'mid' | 'premium';
};

// Filter State Type
export type ExplorerFilters = {
  search: string;
  budget: 'all' | 'value' | 'mid' | 'premium';
  bestFor: 'all' | 'value-buyers' | 'year-round-living' | 'remote-work' | 'families' | 'beach-lifestyle';
  beachAccess: 'all' | 'excellent' | 'good' | 'okay' | 'limited';
  access: 'all' | 'under-30' | 'under-45' | 'under-60';
  liveliness: 'all' | 'high' | 'medium' | 'low';
};

// UI Store Type
export type UIState = {
  selectedTownSlug: string | null;
  isTownModalOpen: boolean;
  isShortlistOpen: boolean;
  hoveredTownSlug: string | null;
  isMobileFilterOpen: boolean;
};

// Shortlist Store Type
export type ShortlistState = {
  townSlugs: string[];
};

// Tier metadata for display
export type TierMeta = {
  label: string;
  color: string;
  soft: string;
  border: string;
};

// Region metadata for display
export type RegionMeta = {
  label: string;
  color: string;
};
