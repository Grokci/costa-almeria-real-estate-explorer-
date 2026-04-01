/**
 * Wiki Index Page
 * 
 * Lists all wiki entries for Costa de Almería and towns.
 * This page is accessible at /wiki but is not linked from main navigation.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ChevronRight } from 'lucide-react';
import { getWikiEntries, getRegionEntry, getTownEntries } from '@/data/wiki';
import { generateWikiMetadata } from '@/lib/wiki-seo';

const BASE_URL = 'https://costa-almeria.com';

// Generate metadata for the wiki index
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Wiki | Costa de Almería',
    description: 'Explore comprehensive guides to Costa de Almería\'s coastal towns, beaches, property markets, and lifestyle. Your complete reference for the sunniest coast in Europe.',
    canonical: `${BASE_URL}/wiki`,
    openGraph: {
      title: 'Wiki | Costa de Almería',
      description: 'Explore comprehensive guides to Costa de Almería\'s coastal towns, beaches, property markets, and lifestyle.',
      url: `${BASE_URL}/wiki`,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function WikiIndexPage() {
  const region = getRegionEntry();
  const towns = getTownEntries();

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Costa de Almería Wiki
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Comprehensive guides to the sunniest coast in Europe. Learn about property markets, 
          beaches, lifestyle, and everything you need to know about each coastal town.
        </p>
      </div>

      {/* Region Overview */}
      {region && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-600" />
            Region Overview
          </h2>
          <Link
            href={`/wiki/${region.slug}`}
            className="block group"
          >
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl p-8 text-white hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 group-hover:underline">
                {region.title}
              </h3>
              <p className="text-emerald-100 mb-4">
                {region.shortDescription}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-emerald-200 group-hover:text-white">
                Read the complete guide <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Towns List */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-emerald-600" />
          Coastal Towns
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {towns.map((town) => (
            <Link
              key={town.slug}
              href={`/wiki/${town.slug}`}
              className="group block bg-white border border-gray-200 rounded-lg p-6 hover:border-emerald-500 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2">
                {town.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {town.shortDescription}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                Learn more <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Note */}
      <div className="mt-12 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <p>
          These wiki pages provide comprehensive information about each town and the region. 
          All pages are fully indexable and include structured data for search engines.
        </p>
      </div>
    </main>
  );
}