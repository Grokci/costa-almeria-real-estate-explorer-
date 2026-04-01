'use client';

import { Town } from '@/types/town';
import { MapPin, Waves, Coffee, Compass } from 'lucide-react';

interface TownExploreSectionProps {
  town: Town;
}

export function TownExploreSection({ town }: TownExploreSectionProps) {
  // §12.9: up to 3 curated highlights
  const highlights = town.highlights.slice(0, 3);
  
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Explore</h2>
      
      {/* Beach Info - using lifestyle.beachAccess with fallback to access.beachWalkMins per §19.8 */}
      <div className="bg-sky-50 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Waves className="w-5 h-5 text-sky-600" />
          <span className="font-medium text-sky-900">Beach</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-sky-700">Beach Access:</span>
            <span className="ml-2 font-medium text-sky-900 capitalize">
              {town.lifestyle.beachAccess}
            </span>
          </div>
          <div>
            <span className="text-sky-700">Walk to Beach:</span>
            <span className="ml-2 font-medium text-sky-900">
              {town.access.beachWalkMins 
                ? `${town.access.beachWalkMins} min` 
                : `${town.lifestyle.beachAccess} beach access`
              }
            </span>
          </div>
        </div>
      </div>
      
      {/* Highlights - §12.9 says max 3 */}
      {highlights.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Highlights</h3>
          <div className="flex flex-wrap gap-2">
            {highlights.map((item, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                {item.title}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Top Area Note - §19.11 optional, omit if absent */}
      {town.editorial.topAreaNote && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Top Area</h3>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span className="text-sm text-gray-600">{town.editorial.topAreaNote}</span>
          </div>
        </div>
      )}
      
      {/* Dining Note - §19.14 optional, omit if absent */}
      {town.editorial.diningNote && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Dining</h3>
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-amber-600" />
            <span className="text-sm text-gray-600">{town.editorial.diningNote}</span>
          </div>
        </div>
      )}
      
      {/* Nearby Outing Note - §19.12 optional, omit if absent */}
      {town.editorial.nearbyOutingNote && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Nearby Attractions</h3>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{town.editorial.nearbyOutingNote}</span>
          </div>
        </div>
      )}
    </section>
  );
}
