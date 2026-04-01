/**
 * Tests for Wiki SEO and Data Module
 */

import { getWikiEntry, getWikiSlugs, getRelatedEntries } from '@/data/wiki';
import { 
  generateWikiMetadata, 
  generateBreadcrumbs, 
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generatePlaceSchema
} from '@/lib/wiki-seo';

describe('Wiki Data Module', () => {
  describe('getWikiSlugs', () => {
    it('should return all wiki slugs', () => {
      const slugs = getWikiSlugs();
      expect(slugs).toContain('costa-de-almeria');
      expect(slugs.length).toBeGreaterThan(0);
    });
  });

  describe('getWikiEntry', () => {
    it('should return the Costa de Almería region entry', () => {
      const entry = getWikiEntry('costa-de-almeria');
      expect(entry).not.toBeNull();
      expect(entry?.type).toBe('region');
      expect(entry?.title).toBe('Costa de Almería');
    });

    it('should return a town entry', () => {
      const entry = getWikiEntry('almeria');
      expect(entry).not.toBeNull();
      expect(entry?.type).toBe('town');
    });

    it('should return undefined for invalid slug', () => {
      const entry = getWikiEntry('invalid-slug');
      expect(entry).toBeUndefined();
    });
  });

  describe('getRelatedEntries', () => {
    it('should return related entries for a town', () => {
      const entry = getWikiEntry('almeria');
      expect(entry).not.toBeNull();
      if (entry) {
        const related = getRelatedEntries(entry.slug);
        expect(Array.isArray(related)).toBe(true);
      }
    });

    it('should return related entries for Costa de Almería', () => {
      const entry = getWikiEntry('costa-de-almeria');
      expect(entry).not.toBeNull();
      if (entry) {
        const related = getRelatedEntries(entry.slug);
        // Regions don't have related entries in the same way - they link to towns differently
        expect(Array.isArray(related)).toBe(true);
      }
    });
  });
});

describe('Wiki SEO Module', () => {
  describe('generateWikiMetadata', () => {
    it('should generate metadata for a region entry', () => {
      const entry = getWikiEntry('costa-de-almeria');
      expect(entry).not.toBeNull();
      if (entry) {
        const metadata = generateWikiMetadata(entry);
        
        expect(metadata.title).toBe(entry.metaTitle);
        expect(metadata.description).toBe(entry.metaDescription);
        expect(metadata.openGraph).toBeDefined();
        expect(metadata.twitter).toBeDefined();
        expect(metadata.robots).toEqual({
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        });
      }
    });

    it('should generate metadata for a town entry', () => {
      const entry = getWikiEntry('almeria');
      expect(entry).not.toBeNull();
      if (entry) {
        const metadata = generateWikiMetadata(entry);
        
        expect(metadata.title).toBeDefined();
        expect(metadata.description).toBeDefined();
        expect(metadata.canonical).toContain('/wiki/almeria');
      }
    });
  });

  describe('generateBreadcrumbs', () => {
    it('should generate breadcrumbs for Costa de Almería', () => {
      const entry = getWikiEntry('costa-de-almeria');
      expect(entry).not.toBeNull();
      if (entry) {
        const breadcrumbs = generateBreadcrumbs(entry);
        
        expect(breadcrumbs.length).toBeGreaterThanOrEqual(2);
        expect(breadcrumbs[0].name).toBe('Home');
        expect(breadcrumbs[1].name).toBe('Wiki');
        expect(breadcrumbs[breadcrumbs.length - 1].name).toBe(entry.title);
      }
    });

    it('should generate breadcrumbs for a town with parent region', () => {
      const entry = getWikiEntry('almeria');
      expect(entry).not.toBeNull();
      if (entry) {
        const breadcrumbs = generateBreadcrumbs(entry);
        
        // Should have: Home > Wiki > Costa de Almería > [Town]
        expect(breadcrumbs.length).toBeGreaterThanOrEqual(3);
        const regionBreadcrumb = breadcrumbs.find(b => b.name === 'Costa de Almería');
        expect(regionBreadcrumb).toBeDefined();
      }
    });
  });

  describe('generateBreadcrumbSchema', () => {
    it('should generate valid BreadcrumbList schema', () => {
      const entry = getWikiEntry('almeria');
      expect(entry).not.toBeNull();
      if (entry) {
        const schema = generateBreadcrumbSchema(entry);
        
        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('BreadcrumbList');
        expect(schema.itemListElement).toBeDefined();
        expect(Array.isArray(schema.itemListElement)).toBe(true);
      }
    });
  });

  describe('generateWebPageSchema', () => {
    it('should generate WebPage schema', () => {
      const entry = getWikiEntry('almeria');
      expect(entry).not.toBeNull();
      if (entry) {
        const schema = generateWebPageSchema(entry);
        
        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('WebPage');
        expect(schema.headline).toBe(entry.title);
        expect(schema.url).toContain('/wiki/almeria');
      }
    });
  });

  describe('generatePlaceSchema', () => {
    it('should generate Place schema for town entries', () => {
      const entry = getWikiEntry('almeria');
      expect(entry).not.toBeNull();
      if (entry) {
        const schema = generatePlaceSchema(entry);
        
        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('Place');
        expect(schema.name).toBe(entry.title);
        expect(schema.address).toBeDefined();
      }
    });

    it('should not include address for region entries', () => {
      const entry = getWikiEntry('costa-de-almeria');
      expect(entry).not.toBeNull();
      if (entry) {
        const schema = generatePlaceSchema(entry);
        
        expect(schema.address).toBeUndefined();
      }
    });
  });
});