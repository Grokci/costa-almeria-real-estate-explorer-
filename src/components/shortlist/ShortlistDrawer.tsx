'use client';

import { useShortlistStore } from '@/lib/state/shortlistStore';
import { useUIStore } from '@/lib/state/uiStore';
import { Drawer } from '@/components/ui/Drawer';
import { ShortlistCard } from './ShortlistCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Heart } from 'lucide-react';

export function ShortlistDrawer() {
  const { shortlist, clearShortlist } = useShortlistStore();
  const { isShortlistOpen, closeShortlist, openTownModal, openComparePage } = useUIStore();

  const handleViewTown = (slug: string) => {
    closeShortlist();
    openTownModal(slug);
  };

  const handleCompare = () => {
    closeShortlist();
    openComparePage();
  };

  return (
    <Drawer
      isOpen={isShortlistOpen}
      onClose={closeShortlist}
      title="Shortlist"
      position="right"
      size="md"
    >
      {shortlist.length === 0 ? (
        <EmptyState
          title="No saved towns"
          description="Start exploring and save towns to your shortlist to compare them later."
          action={{
            label: 'Start Exploring',
            onClick: closeShortlist,
          }}
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {shortlist.length} {shortlist.length === 1 ? 'town' : 'towns'} saved
            </p>
            {shortlist.length > 1 && (
              <button
                onClick={handleCompare}
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
              >
                Compare All
              </button>
            )}
          </div>
          
          <div className="space-y-3">
            {shortlist.map((town) => (
              <ShortlistCard
                key={town.slug}
                town={town}
                onView={() => handleViewTown(town.slug)}
              />
            ))}
          </div>
          
          <button
            onClick={clearShortlist}
            className="w-full py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Clear All
          </button>
        </div>
      )}
    </Drawer>
  );
}
