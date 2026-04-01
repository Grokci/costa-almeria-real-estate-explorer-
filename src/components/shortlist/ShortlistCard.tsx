'use client';

import { Town } from '@/types/town';
import { useShortlistStore } from '@/lib/state/shortlistStore';
import { getMarkerColor, getTierInfo } from '@/lib/map/mapbox';
import { X, MapPin } from 'lucide-react';

interface ShortlistCardProps {
  town: Town;
  onView: () => void;
}

export function ShortlistCard({ town, onView }: ShortlistCardProps) {
  const { removeFromShortlist } = useShortlistStore();
  
  const tierInfo = getTierInfo(town.pricing.marketPosition);
  const markerColor = getMarkerColor(town.pricing.marketPosition);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromShortlist(town.slug);
  };

  return (
    <div 
      onClick={onView}
      className="flex gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
    >
      {/* Thumbnail */}
      <div 
        className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0"
        style={{ backgroundImage: `url(${town.hero.imageUrl})` }}
      />
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-medium text-gray-900 truncate">{town.name}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              <span className="capitalize">{town.region.replace('-', ' ')}</span>
            </div>
          </div>
          
          <button
            onClick={handleRemove}
            className="p-1 rounded hover:bg-gray-200 transition-colors"
            aria-label="Remove from shortlist"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        <div className="mt-2 flex items-center gap-3">
          <span 
            className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: markerColor }}
          >
            {tierInfo.label}
          </span>
          
          <span className="text-sm font-semibold text-gray-900">
            {town.pricing.priceBandLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
