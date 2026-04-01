import { MetadataRoute } from 'next';
import { loadTowns } from '@/lib/towns/loadTowns';
import { getWikiSlugs } from '@/data/wiki';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  const towns = loadTowns();
  const today = '2026-04-01';
  const baseUrl = 'https://solmiraguides.com';
  
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/explorer`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sitemap.html`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // Wiki section
    {
      url: `${baseUrl}/wiki`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];
  
  const townUrls: MetadataRoute.Sitemap = towns.map((town) => ({
    url: `${baseUrl}/town/${town.slug}`,
    lastModified: town.metadata?.lastReviewed || today,
    changeFrequency: 'monthly' as const,
    priority: town.summary.bestFor.includes('premium') ? 0.8 : 0.7,
  }));
  
  // Wiki pages
  const wikiSlugs = getWikiSlugs();
  const wikiUrls: MetadataRoute.Sitemap = wikiSlugs.map((slug) => ({
    url: `${baseUrl}/wiki/${slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: slug === 'costa-de-almeria' ? 0.8 : 0.7,
  }));
  
  return [...staticUrls, ...townUrls, ...wikiUrls];
}
