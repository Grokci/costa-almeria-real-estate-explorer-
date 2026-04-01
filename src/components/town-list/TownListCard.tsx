'use client';

import { Town } from '@/types/town';
import { useUIStore } from '@/lib/state/uiStore';
import { useShortlistStore } from '@/lib/state/shortlistStore';
import { getTierInfo } from '@/lib/map/mapbox';
import { Heart } from 'lucide-react';

interface TownListCardProps {
  town: Town;
  index: number;
}

export function TownListCard({ town, index }: TownListCardProps) {
  const { openTownModal, selectedTownSlug } = useUIStore();
  const { addToShortlist, removeFromShortlist, isShortlisted: checkShortlisted } = useShortlistStore();
  
  const isSelected = selectedTownSlug === town.slug;
  const isShortlisted = checkShortlisted(town.slug);

  const handleToggleShortlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isShortlisted) {
      removeFromShortlist(town.slug);
    } else {
      addToShortlist(town);
    }
  };
  const tierInfo = getTierInfo(town.pricing.marketPosition);

  return (
    <button
      onClick={() => openTownModal(town.slug)}
      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-blue-50 border-l-4 border-blue-600' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">{index + 1}</span>
            <h3 className="font-medium text-gray-900 truncate">{town.name}</h3>
          </div>
          
          <p className="text-xs text-gray-500 mt-0.5 capitalize">
            {town.type} • {town.region.replace('-', ' ')}
          </p>
          
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {town.summary.oneLiner}
          </p>
          
          <div className="flex items-center gap-2 mt-2">
            <span 
              className="chip"
              style={{ 
                backgroundColor: tierInfo.soft, 
                color: tierInfo.color,
                borderColor: tierInfo.border 
              }}
            >
              {tierInfo.label}
            </span>
            
            <span className="text-xs text-gray-500">
              {town.pricing.priceBandLabel}
            </span>
          </div>
        </div>
        
        <button
          onClick={handleToggleShortlist}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
        >
          <Heart 
            className={`w-5 h-5 ${isShortlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} 
          />
        </button>
      </div>
    </button>
  );
}
