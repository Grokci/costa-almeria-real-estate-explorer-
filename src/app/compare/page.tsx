'use client';

import { useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useShortlistStore } from '@/lib/state/shortlistStore';
import { useUIStore } from '@/lib/state/uiStore';
import { EmptyState } from '@/components/ui/EmptyState';
import { ArrowLeft, Trash2, MapPin, TrendingUp, Waves, Users, Plane } from 'lucide-react';
import { getMarkerColor, getTierInfo } from '@/lib/map/mapbox';
import { loadTowns } from '@/lib/towns/loadTowns';
import { Town } from '@/types/town';

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50"><div className="max-w-7xl mx-auto px-4 py-8"><p>Loading...</p></div></div>}>
      <CompareContent />
    </Suspense>
  );
}

function CompareContent() {
  const searchParams = useSearchParams();
  const { shortlist, removeFromShortlist } = useShortlistStore();
  const { openTownModal } = useUIStore();
  
  // Get town slugs from URL query params (e.g., ?town=adra&town=mojacar)
  const urlTownSlugs = useMemo(() => {
    const slugs = searchParams.getAll('town');
    // Deduplicate, retain order, cap at 4
    const uniqueSlugs = [...new Set(slugs)].slice(0, 4);
    return uniqueSlugs;
  }, [searchParams]);
  
  // Load all towns once
  const allTowns = useMemo(() => loadTowns(), []);
  
  // Determine which towns to compare:
  // - If URL has town params, use those (shareable links)
  // - Otherwise use shortlist (backward compatibility)
  const compareTowns = useMemo(() => {
    const slugsToUse = urlTownSlugs.length > 0 
      ? urlTownSlugs 
      : shortlist.slice(0, 4).map(t => t.slug);
    return slugsToUse
      .map(slug => allTowns.find(t => t.slug === slug))
      .filter((t): t is Town => t !== undefined)
      .slice(0, 4);
  }, [urlTownSlugs, shortlist, allTowns]);
  
  // Check if using URL-based comparison for UX
  const hasUrlParams = urlTownSlugs.length > 0;
  
  // Need at least 2 towns for valid comparison
  if (compareTowns.length < 2) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explorer
          </Link>
          
          <EmptyState
            title="Nothing to compare"
            description={urlTownSlugs.length > 0 
              ? "One or more towns in your comparison link could not be found. Please select valid towns from the explorer."
              : "Add towns to your shortlist first, then come back to compare them side by side."
            }
            action={{
              label: 'Start Exploring',
              onClick: () => window.location.href = '/',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Explorer
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Compare Towns</h1>
            <p className="text-gray-600">{compareTowns.length} towns to compare</p>
          </div>
        </div>

        {/* Compare Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-medium text-gray-600 min-w-[150px]"></th>
                {compareTowns.map((town) => {
                    const tierInfo = getTierInfo(town.pricing.marketPosition);
                    const markerColor = getMarkerColor(town.pricing.marketPosition);
                    
                    return (
                      <th key={town.slug} className="p-4 min-w-[200px]">
                        <div className="relative">
                          {!hasUrlParams && (
                            <button
                              onClick={() => removeFromShortlist(town.slug)}
                              className="absolute -top-1 -right-1 p-1 rounded-full hover:bg-gray-100"
                              aria-label="Remove"
                            >
                              <Trash2 className="w-4 h-4 text-gray-400" />
                            </button>
                          )}
                          
                          <div 
                            className="h-32 rounded-lg bg-cover bg-center mb-3 cursor-pointer"
                            style={{ backgroundImage: `url(${town.hero.imageUrl})` }}
                            onClick={() => openTownModal(town.slug)}
                          />
                          
                          <div className="text-center">
                            <span 
                              className="inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white mb-1"
                              style={{ backgroundColor: markerColor }}
                            >
                              {tierInfo.label}
                            </span>
                            <h3 className="font-semibold text-gray-900">{town.name}</h3>
                            <p className="text-sm text-gray-500 capitalize">{town.region.replace('-', ' ')}</p>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {/* Price Row */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700">
                    <TrendingUp className="w-4 h-4 inline mr-2" />
                    Price
                  </td>
                {compareTowns.map((town) => (
                    <td key={town.slug} className="p-4 text-center">
                      <div className="font-semibold text-gray-900">
                        {town.pricing.priceBandLabel}
                      </div>
                      <div className="text-sm text-gray-500">
                        {town.pricing.avgPricePerSqm ? `€${town.pricing.avgPricePerSqm}/m²` : 'Unavailable'}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Beach Row */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700">
                    <Waves className="w-4 h-4 inline mr-2" />
                    Beach
                  </td>
                {compareTowns.map((town) => (
                    <td key={town.slug} className="p-4 text-center">
                      <div className="text-gray-900">
                        {town.access.beachWalkMins ? `${town.access.beachWalkMins} min walk` : town.lifestyle.beachAccess}
                      </div>
                      <div className="text-sm text-gray-500 capitalize">{town.lifestyle.beachAccess}</div>
                    </td>
                  ))}
                </tr>

                {/* Liveliness Row */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700">
                    <Users className="w-4 h-4 inline mr-2" />
                    Liveliness
                  </td>
                {compareTowns.map((town) => (
                    <td key={town.slug} className="p-4 text-center">
                      <div className="font-semibold text-gray-900 capitalize">
                        {town.lifestyle.yearRoundLiveliness}
                      </div>
                      <div className="text-sm text-gray-500">{town.lifestyle.internationalFeel} international</div>
                    </td>
                  ))}
                </tr>

                {/* Airport Row */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700">
                    <Plane className="w-4 h-4 inline mr-2" />
                    Airport
                  </td>
                {compareTowns.map((town) => (
                    <td key={town.slug} className="p-4 text-center">
                      <div className="text-gray-900 capitalize">{town.region.replace('-', ' ')}</div>
                      <div className="text-sm text-gray-500">{town.access.driveToAirportMins ? `${town.access.driveToAirportMins} min to airport` : 'Check local travel times'}</div>
                    </td>
                  ))}
                </tr>

                {/* Population Row */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700">
                    <Users className="w-4 h-4 inline mr-2" />
                    Population
                  </td>
                {compareTowns.map((town) => (
                    <td key={town.slug} className="p-4 text-center">
                      <div className="text-gray-900">
                        {town.facts.population?.toLocaleString() || 'N/A'}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Best For Row */}
                <tr>
                  <td className="p-4 font-medium text-gray-700">Best For</td>
                {compareTowns.map((town) => (
                    <td key={town.slug} className="p-4">
                      <div className="flex flex-wrap justify-center gap-1">
                        {town.summary.bestFor.map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Add More Towns
          </Link>
        </div>
      </div>
    </div>
  );
}
