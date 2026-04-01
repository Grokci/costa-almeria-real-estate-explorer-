'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Town } from '@/types/town';
import { loadTowns } from '@/lib/towns/loadTowns';
import { TownModalHeader } from '@/components/town-modal/TownModalHeader';
import { TownHeroSummary } from '@/components/town-modal/TownHeroSummary';
import { TownOverviewSection } from '@/components/town-modal/TownOverviewSection';
import { TownLivingSection } from '@/components/town-modal/TownLivingSection';
import { TownPropertySection } from '@/components/town-modal/TownPropertySection';
import { TownExploreSection } from '@/components/town-modal/TownExploreSection';
import { TownModalActions } from '@/components/town-modal/TownModalActions';
import { EmptyState } from '@/components/ui/EmptyState';
import { ArrowLeft, GitCompare } from 'lucide-react';
import { useUIStore } from '@/lib/state/uiStore';

export default function TownPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { openComparePage } = useUIStore();

  const [error] = useState<string | null>(null);

  const allTowns = useMemo(() => {
    try {
      return loadTowns();
    } catch (e) {
      console.error('Failed to load towns:', e);
      return [];
    }
  }, []);

  const town = useMemo(() => {
    return allTowns.find(t => t.slug === slug);
  }, [allTowns, slug]);

  if (!town) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explorer
          </Link>
          
          <EmptyState
            title="Town not found"
            description="The town you're looking for doesn't exist or has been removed."
            action={{
              label: 'Explore All Towns',
              onClick: () => window.location.href = '/',
            }}
          />
        </div>
      </div>
    );
  }

  const handleCompare = () => {
    openComparePage();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Explorer</span>
            </Link>
            
            <button 
              onClick={() => router.push('/compare')}
              className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              <GitCompare className="w-4 h-4" />
              Compare
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <TownModalHeader 
          townName={town.name} 
          onClose={() => router.push('/')} 
        />
        
        <div className="space-y-8 mt-4">
          <TownHeroSummary 
            town={town}
            onCompare={handleCompare}
          />
          
          <TownOverviewSection town={town} />
          
          <TownLivingSection town={town} />
          
          <TownPropertySection town={town} />
          
          <TownExploreSection town={town} />
          
          <TownModalActions 
            town={town}
            onCompare={handleCompare}
          />
        </div>
      </div>
    </div>
  );
}
