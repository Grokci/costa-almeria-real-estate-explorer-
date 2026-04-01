/**
 * SEO Helpers for Wiki Pages
 * 
 * This module provides functions to generate SEO metadata and structured data
 * for wiki pages.
 */

import { WikiEntry } from '@/data/wiki';

// Configuration
const BASE_URL = 'https://solmiraguides.com';

/**
 * Generate metadata for a wiki entry
 */
export function generateWikiMetadata(entry: WikiEntry) {
  return {
    title: entry.metaTitle,
    description: entry.metaDescription,
    canonical: `${BASE_URL}${entry.canonicalPath}`,
    openGraph: {
      title: entry.metaTitle,
      description: entry.metaDescription,
      type: entry.type === 'region' ? 'website' : 'article',
      url: `${BASE_URL}${entry.canonicalPath}`,
      siteName: 'Solmira Guides',
      locale: 'en_US',
      images: entry.heroImage ? [
        {
          url: `${BASE_URL}${entry.heroImage}`,
          alt: entry.imageAlt || entry.title,
          width: 1200,
          height: 630,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.metaTitle,
      description: entry.metaDescription,
      images: entry.heroImage ? [`${BASE_URL}${entry.heroImage}`] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${BASE_URL}${entry.canonicalPath}`,
      languages: {
        'en': entry.canonicalPath,
        'es': `${entry.canonicalPath}`,
      },
    },
  };
}

/**
 * Generate breadcrumbs for a wiki entry
 */
export function generateBreadcrumbs(entry: WikiEntry) {
  const items = [
    {
      name: 'Home',
      url: BASE_URL,
    },
    {
      name: 'Wiki',
      url: `${BASE_URL}/wiki`,
    },
  ];

  // Add region breadcrumb for towns
  if (entry.type === 'town' && entry.parentRegion) {
    items.push({
      name: 'Costa de Almería',
      url: `${BASE_URL}/wiki/costa-de-almeria`,
    });
  }

  // Add current page
  items.push({
    name: entry.title,
    url: `${BASE_URL}${entry.canonicalPath}`,
  });

  return items;
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(entry: WikiEntry) {
  const items = generateBreadcrumbs(entry);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate WebPage structured data
 */
export function generateWebPageSchema(entry: WikiEntry) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    headline: entry.title,
    description: entry.shortDescription,
    url: `${BASE_URL}${entry.canonicalPath}`,
    mainEntity: {
      '@type': 'WebPage',
      name: entry.title,
      description: entry.shortDescription,
      ...(entry.coordinates && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: entry.coordinates.lat,
          longitude: entry.coordinates.lng,
        },
      }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Solmira Guides',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    dateModified: entry.lastReviewed,
  };
}

/**
 * Generate Place structured data for town pages
 */
export function generatePlaceSchema(entry: WikiEntry) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: entry.title,
    description: entry.shortDescription,
    url: `${BASE_URL}${entry.canonicalPath}`,
  };

  // Add image if available
  if (entry.heroImage) {
    schema.image = {
      '@type': 'ImageObject',
      url: `${BASE_URL}${entry.heroImage}`,
      caption: entry.imageCaption || entry.title,
    };
  }

  // Add geo coordinates if available
  if (entry.coordinates) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: entry.coordinates.lat,
      longitude: entry.coordinates.lng,
    };
  }

  // Add address for towns
  if (entry.type === 'town') {
    schema.address = {
      '@type': 'PostalAddress',
      addressLocality: entry.title,
      addressRegion: 'Almería',
      addressCountry: 'ES',
    };
  }

  return schema;
}

/**
 * Generate Article structured data for wiki content
 */
export function generateArticleSchema(entry: WikiEntry) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.title,
    description: entry.shortDescription,
    articleBody: entry.overview,
    url: `${BASE_URL}${entry.canonicalPath}`,
    image: entry.heroImage ? `${BASE_URL}${entry.heroImage}` : undefined,
    author: {
      '@type': 'Organization',
      name: 'Solmira Guides',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Solmira Guides',
    },
    dateModified: entry.lastReviewed,
  };
}

/**
 * Generate ImageObject structured data
 */
export function generateImageSchema(entry: WikiEntry) {
  if (!entry.heroImage) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: `${BASE_URL}${entry.heroImage}`,
    caption: entry.imageCaption || entry.imageAlt || entry.title,
    description: entry.imageAlt,
    width: 1200,
    height: 630,
    encoding: {
      '@type': 'ImageObject',
      contentUrl: `${BASE_URL}${entry.heroImage}`,
    },
  };
}

/**
 * Generate all structured data for a wiki entry
 */
export function generateAllStructuredData(entry: WikiEntry) {
  const schemas = [
    generateBreadcrumbSchema(entry),
    generateWebPageSchema(entry),
  ];

  // Add Place schema for towns
  if (entry.type === 'town') {
    schemas.push(generatePlaceSchema(entry));
  }

  // Add Article schema for region
  if (entry.type === 'region') {
    schemas.push(generateArticleSchema(entry));
  }

  // Add image schema if available
  const imageSchema = generateImageSchema(entry);
  if (imageSchema) {
    schemas.push(imageSchema);
  }

  return schemas;
}