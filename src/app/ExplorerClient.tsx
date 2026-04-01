'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ExplorerFilters, Town } from '@/types/town';
import { filterTowns } from '@/lib/towns/loadTowns';
import { useUIStore } from '@/lib/state/uiStore';
import { useShortlistStore } from '@/lib/state/shortlistStore';
import { TopBar } from '@/components/app-shell/TopBar';
import { ExplorerLayout } from '@/components/app-shell/ExplorerLayout';
import { TownModal } from '@/components/town-modal/TownModal';
import { ShortlistDrawer } from '@/components/shortlist/ShortlistDrawer';
import { EmptyState } from '@/components/ui/EmptyState';

interface ExplorerClientProps {
  initialTowns: Town[];
}

export function ExplorerClient({ initialTowns }: ExplorerClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [towns] = useState<Town[]>(initialTowns);
  
  const { selectedTownSlug, closeTownModal } = useUIStore();
  const { shortlist } = useShortlistStore();

  // Parse URL filters
  const filters: ExplorerFilters = useMemo(() => ({
    search: searchParams.get('search') || '',
    budget: (searchParams.get('budget') as ExplorerFilters['budget']) || 'all',
    bestFor: (searchParams.get('bestFor') as ExplorerFilters['bestFor']) || 'all',
    beachAccess: (searchParams.get('beachAccess') as ExplorerFilters['beachAccess']) || 'all',
    access: (searchParams.get('access') as ExplorerFilters['access']) || 'all',
    liveliness: (searchParams.get('liveliness') as ExplorerFilters['liveliness']) || 'all',
  }), [searchParams]);

  // Filter towns based on current filters
  const filteredTowns = useMemo(() => {
    // Convert ExplorerFilters to filterTowns format
    const filterParams: Parameters<typeof filterTowns>[1] = {};
    
    // Search filter
    if (filters.search && filters.search.trim()) {
      filterParams.search = filters.search;
    }
    
    // Budget - convert 'all', 'value', 'mid', 'premium' to price range
    if (filters.budget && filters.budget !== 'all') {
      const budgetRanges: Record<string, { min: number; max: number }> = {
        value: { min: 0, max: 1000 },
        mid: { min: 1000, max: 2000 },
        premium: { min: 2000, max: 10000 },
      };
      filterParams.budget = budgetRanges[filters.budget];
    }
    
    // Best for
    if (filters.bestFor && filters.bestFor !== 'all') {
      filterParams.bestFor = [filters.bestFor];
    }
    
    // Beach access
    if (filters.beachAccess && filters.beachAccess !== 'all') {
      filterParams.beachAccess = filters.beachAccess;
    }
    
    // Access (airport distance)
    if (filters.access && filters.access !== 'all') {
      const accessMap: Record<string, string> = {
        'under-30': 'close',
        'under-45': 'close',
        'under-60': 'medium',
      };
      filterParams.airportAccess = accessMap[filters.access];
    }
    
    // Liveliness
    if (filters.liveliness && filters.liveliness !== 'all') {
      filterParams.liveliness = filters.liveliness;
    }
    
    return filterTowns(towns, filterParams);
  }, [towns, filters]);

  // Get selected town object
  const selectedTown = useMemo(() => {
    if (!selectedTownSlug) return null;
    return towns.find(t => t.slug === selectedTownSlug) || null;
  }, [towns, selectedTownSlug]);

  // Reset filters handler
  const handleResetFilters = () => {
    router.push('/explorer', { scroll: false });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar totalTowns={towns.length} shortlistedCount={shortlist.length} />
      
      <main className="pt-14">
        {filteredTowns.length > 0 ? (
          <ExplorerLayout 
            towns={filteredTowns} 
            filters={filters}
          />
        ) : (
          <EmptyState 
            title="No towns found"
            description="Try adjusting your filters to see more results."
            action={{ label: 'Reset Filters', onClick: handleResetFilters }}
          />
        )}
      </main>

      {/* Town Modal */}
      {selectedTown && (
        <TownModal town={selectedTown} />
      )}

      {/* Shortlist Drawer */}
      <ShortlistDrawer />
    </div>
  );
}
