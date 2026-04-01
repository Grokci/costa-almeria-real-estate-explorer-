'use client';

import { Town } from '@/types/town';
import { Home, Key } from 'lucide-react';

interface TownPropertySectionProps {
  town: Town;
}

export function TownPropertySection({ town }: TownPropertySectionProps) {
  const { pricing } = town;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Property</h2>
      
      {/* Price Band & Market Position */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-emerald-50 rounded-lg p-4">
          <div className="text-sm text-emerald-700 font-medium mb-1">Price Band</div>
          <div className="text-2xl font-bold text-emerald-900">
            {pricing.priceBandLabel}
          </div>
        </div>
        
        <div className="bg-sky-50 rounded-lg p-4">
          <div className="text-sm text-sky-700 font-medium mb-1">Market Position</div>
          <div className="text-2xl font-bold text-sky-900 capitalize">
            {pricing.marketPosition}
          </div>
        </div>
      </div>
      
      {/* Average Price per sqm - optional with fallback */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <span className="text-sm font-medium text-gray-700">Price per m²: </span>
        <span className="text-sm text-gray-900">
          {pricing.avgPricePerSqm 
            ? `€${pricing.avgPricePerSqm.toLocaleString()}` 
            : 'unavailable'
          }
        </span>
      </div>
      
      {/* Typical Property Types */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Typical Properties</h3>
        <div className="flex flex-wrap gap-2">
          {pricing.typicalPropertyTypes.map((type) => (
            <span 
              key={type}
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      
      {/* Buyer Note */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Key className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-800">{pricing.buyerNote}</p>
        </div>
      </div>
    </section>
  );
}
