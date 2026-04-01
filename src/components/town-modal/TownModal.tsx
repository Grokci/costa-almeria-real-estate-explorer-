'use client';

import { useEffect, useMemo } from 'react';
import { Town } from '@/types/town';
import { useUIStore } from '@/lib/state/uiStore';
import { Modal } from '@/components/ui/Modal';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { TownModalHeader } from './TownModalHeader';
import { TownHeroSummary } from './TownHeroSummary';
import { TownOverviewSection } from './TownOverviewSection';
import { TownLivingSection } from './TownLivingSection';
import { TownPropertySection } from './TownPropertySection';
import { TownExploreSection } from './TownExploreSection';
import { TownModalActions } from './TownModalActions';

interface TownModalProps {
  town: Town;
}

export function TownModal({ town }: TownModalProps) {
  const { closeTownModal, openComparePage } = useUIStore();

  const handleCompare = () => {
    openComparePage();
  };

  const modalContent = (
    <div className="flex flex-col">
      <TownModalHeader 
        townName={town.name} 
        onClose={closeTownModal} 
      />
      
      <div className="space-y-6">
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
  );

  return (
    <>
      {/* Desktop: Modal */}
      <Modal
        isOpen={true}
        onClose={closeTownModal}
        size="lg"
      >
        {modalContent}
      </Modal>

      {/* Mobile: Bottom Sheet */}
      <BottomSheet
        isOpen={true}
        onClose={closeTownModal}
        title={town.name}
      >
        {modalContent}
      </BottomSheet>
    </>
  );
}
