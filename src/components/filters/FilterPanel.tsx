'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ExplorerFilters } from '@/types/town';
import { BudgetFilter } from './BudgetFilter';
import { BestForFilter } from './BestForFilter';
import { BeachAccessFilter } from './BeachAccessFilter';
import { AccessFilter } from './AccessFilter';
import { LivelinessFilter } from './LivelinessFilter';

interface FilterPanelProps {
  filters: ExplorerFilters;
}

export function FilterPanel({ filters }: FilterPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: keyof ExplorerFilters, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === 'all' || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="font-semibold text-gray-900">Filters</h2>
      
      <div className="space-y-4">
        <BudgetFilter 
          value={filters.budget} 
          onChange={(v) => updateFilter('budget', v)} 
        />
        
        <BestForFilter 
          value={filters.bestFor} 
          onChange={(v) => updateFilter('bestFor', v)} 
        />
        
        <BeachAccessFilter 
          value={filters.beachAccess} 
          onChange={(v) => updateFilter('beachAccess', v)} 
        />
        
        <AccessFilter 
          value={filters.access} 
          onChange={(v) => updateFilter('access', v)} 
        />
        
        <LivelinessFilter 
          value={filters.liveliness} 
          onChange={(v) => updateFilter('liveliness', v)} 
        />
      </div>
    </div>
  );
}
