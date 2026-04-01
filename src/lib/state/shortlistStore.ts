import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Town } from '@/types/town';

interface ShortlistStore {
  // State
  shortlist: Town[];
  // Actions
  addToShortlist: (town: Town) => void;
  removeFromShortlist: (slug: string) => void;
  clearShortlist: () => void;
  isShortlisted: (slug: string) => boolean;
}

const STORAGE_KEY = 'town-explorer-shortlist-v1';
const MAX_COMPARE_TOWNS = 4;

export const useShortlistStore = create<ShortlistStore>()(
  persist(
    (set, get) => ({
      shortlist: [],

      addToShortlist: (town: Town) => set((state) => {
        if (state.shortlist.some(t => t.slug === town.slug)) {
          return state;
        }
        // Limit to 4 towns for compare functionality
        if (state.shortlist.length >= MAX_COMPARE_TOWNS) {
          return state;
        }
        return { shortlist: [...state.shortlist, town] };
      }),

      removeFromShortlist: (slug: string) => set((state) => ({
        shortlist: state.shortlist.filter(t => t.slug !== slug),
      })),

      clearShortlist: () => set({ shortlist: [] }),

      isShortlisted: (slug: string) => {
        return get().shortlist.some(t => t.slug === slug);
      },
    }),
    {
      name: STORAGE_KEY,
    }
  )
);
