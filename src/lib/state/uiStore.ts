import { create } from 'zustand';
import { UIState } from '@/types/town';

interface UIStore extends UIState {
  setSelectedTownSlug: (slug: string | null) => void;
  setIsTownModalOpen: (isOpen: boolean) => void;
  setIsShortlistOpen: (isOpen: boolean) => void;
  setHoveredTownSlug: (slug: string | null) => void;
  setIsMobileFilterOpen: (isOpen: boolean) => void;
  openTownModal: (slug: string) => void;
  closeTownModal: () => void;
  openShortlist: () => void;
  closeShortlist: () => void;
  openComparePage: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  selectedTownSlug: null,
  isTownModalOpen: false,
  isShortlistOpen: false,
  hoveredTownSlug: null,
  isMobileFilterOpen: false,

  setSelectedTownSlug: (slug) => set({ selectedTownSlug: slug }),
  setIsTownModalOpen: (isOpen) => set({ isTownModalOpen: isOpen }),
  setIsShortlistOpen: (isOpen) => set({ isShortlistOpen: isOpen }),
  setHoveredTownSlug: (slug) => set({ hoveredTownSlug: slug }),
  setIsMobileFilterOpen: (isOpen) => set({ isMobileFilterOpen: isOpen }),

  openTownModal: (slug) => set({ 
    selectedTownSlug: slug, 
    isTownModalOpen: true 
  }),
  
  closeTownModal: () => set({ 
    isTownModalOpen: false 
  }),
  
  openShortlist: () => set({ isShortlistOpen: true }),
  
  closeShortlist: () => set({ isShortlistOpen: false }),
  
  openComparePage: () => {
    // Navigate to compare page - handled by router in components
  },
}));
