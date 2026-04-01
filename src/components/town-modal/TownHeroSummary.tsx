'use client';

import { Town } from '@/types/town';
import { MapPin } from 'lucide-react';
import { getTierInfo, getMarkerColor } from '@/lib/map/mapbox';

interface TownHeroSummaryProps {
  town: Town;
  onCompare: () => void;
}

export function TownHeroSummary({ town, onCompare }: TownHeroSummaryProps) {
  const tierInfo = getTierInfo(town.pricing.marketPosition);
  const markerColor = getMarkerColor(town.pricing.marketPosition);

  return (
    <div className="relative">
      {/* Hero Image */}
      <div 
        className="h-48 lg:h-64 rounded-xl overflow-hidden bg-cover bg-center relative"
        style={{ backgroundImage: `url(${town.hero.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Badges - Price Band + Beach Access + Airport (per §12.5) */}
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          <span 
            className="px-3 py-1 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: markerColor }}
          >
            {tierInfo.label}
          </span>
          
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-sky-500 text-white">
            {town.lifestyle.beachAccess} beach
          </span>
          
          {town.access.driveToAirportMins && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-white">
              {town.access.driveToAirportMins} min to airport
            </span>
          )}
        </div>
        
        {/* Location */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white">
          <MapPin className="w-4 h-4" />
          <span className="text-sm capitalize">{town.region.replace('-', ' ')}, Spain</span>
        </div>
      </div>
      
      {/* One-line summary (per §12.5) */}
      <p className="mt-3 text-gray-700 text-lg font-medium">
        {town.summary.oneLiner}
      </p>
    </div>
  );
}
