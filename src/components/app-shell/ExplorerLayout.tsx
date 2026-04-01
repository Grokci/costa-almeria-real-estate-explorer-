'use client';

import { Town, ExplorerFilters } from '@/types/town';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { TownList } from '@/components/town-list/TownList';
import { MapPanel } from '@/components/map/MapPanel';

interface ExplorerLayoutProps {
  towns: Town[];
  filters: ExplorerFilters;
}

export function ExplorerLayout({ towns, filters }: ExplorerLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)]">
      {/* Filters Panel - Desktop */}
      <div className="hidden lg:block w-64 flex-shrink-0 border-r border-gray-200 bg-white">
        <FilterPanel filters={filters} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Town List */}
        <div className="w-full lg:w-96 lg:flex-shrink-0 border-r border-gray-200 bg-white overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-thin">
            <TownList towns={towns} />
          </div>
        </div>

        {/* Map Panel */}
        <div className="flex-1 min-h-[50vh] lg:min-h-0 relative">
          <MapPanel towns={towns} />
        </div>
      </div>

      {/* Mobile Filter Sheet - would be implemented with a bottom sheet component */}
      <div className="lg:hidden">
        <FilterPanel filters={filters} />
      </div>
    </div>
  );
}
