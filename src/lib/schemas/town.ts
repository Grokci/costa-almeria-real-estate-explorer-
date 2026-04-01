import { z } from 'zod';
import { Town } from '@/types/town';

// Town Schema - validates all town data at runtime
export const TownSchema = z.object({
  id: z.string().min(1, 'Town must have an id'),
  slug: z.string().min(1, 'Town must have a slug'),
  name: z.string().min(1, 'Town must have a name'),
  region: z.enum(['west', 'central', 'cabo-de-gata', 'east'], {
    errorMap: () => ({ message: 'Invalid region value' }),
  }),
  type: z.enum(['city', 'town', 'village', 'beach resort'], {
    errorMap: () => ({ message: 'Invalid type value' }),
  }),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  hero: z.object({
    imageUrl: z.string().url(),
    alt: z.string().min(1, 'Hero image must have alt text'),
  }),
  summary: z.object({
    oneLiner: z.string().min(1).max(120, 'oneLiner must be concise'),
    shortDescription: z.string().min(1).max(300, 'shortDescription must be brief'),
    bestFor: z.array(z.string()).min(1, 'At least one bestFor tag required'),
    tradeoffs: z.array(z.string()).min(1, 'At least one tradeoff required'),
  }),
  pricing: z.object({
    priceBandLabel: z.string().min(1),
    avgPricePerSqm: z.number().optional(),
    marketPosition: z.enum(['value', 'mid', 'premium'], {
      errorMap: () => ({ message: 'Invalid marketPosition value' }),
    }),
    typicalPropertyTypes: z.array(z.string()).min(1, 'At least one property type required'),
    buyerNote: z.string().min(1),
  }),
  lifestyle: z.object({
    beachAccess: z.enum(['excellent', 'good', 'okay', 'limited'], {
      errorMap: () => ({ message: 'Invalid beachAccess value' }),
    }),
    yearRoundLiveliness: z.enum(['high', 'medium', 'low'], {
      errorMap: () => ({ message: 'Invalid yearRoundLiveliness value' }),
    }),
    internationalFeel: z.enum(['high', 'medium', 'low'], {
      errorMap: () => ({ message: 'Invalid internationalFeel value' }),
    }),
    walkability: z.enum(['high', 'medium', 'low'], {
      errorMap: () => ({ message: 'Invalid walkability value' }),
    }),
    familyFit: z.enum(['high', 'medium', 'low'], {
      errorMap: () => ({ message: 'Invalid familyFit value' }),
    }),
    remoteWorkFit: z.enum(['high', 'medium', 'low'], {
      errorMap: () => ({ message: 'Invalid remoteWorkFit value' }),
    }),
  }),
  access: z.object({
    driveToAlmeriaMins: z.number().optional(),
    driveToAirportMins: z.number().optional(),
    nearestHospitalMins: z.number().optional(),
    beachWalkMins: z.number().optional(),
  }),
  facts: z.object({
    population: z.number().optional(),
    climateSummary: z.string().optional(),
    internetQuality: z.enum(['good', 'okay', 'variable']).optional(),
    practicalNotes: z.array(z.string()).optional(),
    healthcareAccessNote: z.string().optional(),
  }),
  highlights: z.array(z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    type: z.enum(['beach', 'area', 'viewpoint', 'daytrip', 'food'], {
      errorMap: () => ({ message: 'Invalid highlight type' }),
    }),
  })).max(3, 'Maximum 3 highlights allowed'),
  editorial: z.object({
    vibe: z.string().min(1),
    whyChooseIt: z.string().min(1),
    whoShouldAvoidIt: z.string().optional(),
    diningNote: z.string().optional(),
    nearbyOutingNote: z.string().optional(),
    topAreaNote: z.string().optional(),
  }),
  metadata: z.object({
    lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'lastReviewed must be a valid date string'),
    confidence: z.enum(['high', 'medium', 'low'], {
      errorMap: () => ({ message: 'Invalid confidence value' }),
    }),
    sources: z.array(z.string()).min(1, 'At least one source required'),
  }),
});

// Filter Schema
export const ExplorerFiltersSchema = z.object({
  search: z.string().default(''),
  budget: z.enum(['all', 'value', 'mid', 'premium']).default('all'),
  bestFor: z.enum(['all', 'value-buyers', 'year-round-living', 'remote-work', 'families', 'beach-lifestyle']).default('all'),
  beachAccess: z.enum(['all', 'excellent', 'good', 'okay', 'limited']).default('all'),
  access: z.enum(['all', 'under-30', 'under-45', 'under-60']).default('all'),
  liveliness: z.enum(['all', 'high', 'medium', 'low']).default('all'),
});

// Type exports - types are defined in @/types/town.ts
// This file only exports validation functions

// Validation helper
export function validateTowns(towns: unknown[]): { valid: Town[]; errors: string[] } {
  const valid: Town[] = [];
  const errors: string[] = [];

  for (const town of towns) {
    const result = TownSchema.safeParse(town);
    if (result.success) {
      valid.push(result.data);
    } else {
      errors.push(`Validation failed for town: ${town && typeof town === 'object' && 'name' in town ? (town as { name: string }).name : 'unknown'}\n${result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('\n')}`);
    }
  }

  return { valid, errors };
}
