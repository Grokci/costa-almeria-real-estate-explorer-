'use client';

import { Town } from '@/types/town';
import { 
  Users, 
  Plane, 
  Wallet
} from 'lucide-react';

interface TownOverviewSectionProps {
  town: Town;
}

export function TownOverviewSection({ town }: TownOverviewSectionProps) {
  // §19.8: if beachWalkMins is missing, use beachAccess value
  const beachDisplay = town.access.beachWalkMins 
    ? `${town.access.beachWalkMins} min walk`
    : town.lifestyle.beachAccess;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Overview</h2>
      
      <p className="text-gray-700 leading-relaxed mb-4">
        {town.summary.shortDescription}
      </p>
      
      {/* Best For Chips - §12.6 */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Best For</h3>
        <div className="flex flex-wrap gap-2">
          {town.summary.bestFor.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Tradeoffs - §12.6 says "tradeoff chips or bullets" */}
      {town.summary.tradeoffs.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Tradeoffs</h3>
          <ul className="space-y-1">
            {town.summary.tradeoffs.map((tradeoff, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-amber-500">•</span>
                {tradeoff}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Vibe Summary - §12.6 */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700 italic">
          "{town.editorial.vibe}"
        </p>
      </div>
      
      {/* Four Key Facts - §12.6 and §12.7 */}
      <div className="grid grid-cols-2 gap-3">
        {/* Price Band */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Wallet className="w-5 h-5 text-emerald-500" />
          <div>
            <div className="text-sm font-medium text-gray-900">Price Band</div>
            <div className="text-xs text-gray-600">{town.pricing.priceBandLabel}</div>
          </div>
        </div>
        
        {/* Beach - with fallback per §19.8 */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Users className="w-5 h-5 text-sky-500" />
          <div>
            <div className="text-sm font-medium text-gray-900">Beach</div>
            <div className="text-xs text-gray-600">{beachDisplay}</div>
          </div>
        </div>
        
        {/* Airport - with fallback per §19.9 */}
        {town.access.driveToAirportMins ? (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Plane className="w-5 h-5 text-sky-500" />
            <div>
              <div className="text-sm font-medium text-gray-900">Airport Drive</div>
              <div className="text-xs text-gray-600">{town.access.driveToAirportMins} mins</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Plane className="w-5 h-5 text-sky-500" />
            <div>
              <div className="text-sm font-medium text-gray-900">Airport Access</div>
              <div className="text-xs text-gray-600">Check local travel times</div>
            </div>
          </div>
        )}
        
        {/* Year-round liveliness */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Wallet className="w-5 h-5 text-purple-500" />
          <div>
            <div className="text-sm font-medium text-gray-900">Year-Round</div>
            <div className="text-xs text-gray-600 capitalize">{town.lifestyle.yearRoundLiveliness}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
