'use client';

import { Town } from '@/types/town';
import { Share2 } from 'lucide-react';
import { useShortlistStore } from '@/lib/state/shortlistStore';

interface TownModalActionsProps {
  town: Town;
  onCompare: () => void;
}

export function TownModalActions({ town, onCompare }: TownModalActionsProps) {
  const { isShortlisted, addToShortlist, removeFromShortlist } = useShortlistStore();
  const isInShortlist = isShortlisted(town.slug);

  const toggleShortlist = () => {
    if (isInShortlist) {
      removeFromShortlist(town.slug);
    } else {
      addToShortlist(town);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/town/${town.slug}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${town.name} - Costa de Almería`,
          text: `Check out ${town.name} on Costa de Almería Town Explorer`,
          url,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
      {/* §12.10: Save to shortlist */}
      <button
        onClick={toggleShortlist}
        className={`
          flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors
          ${isInShortlist 
            ? 'bg-rose-100 text-rose-700 border border-rose-200' 
            : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
          }
        `}
      >
        {isInShortlist ? 'Remove from Shortlist' : 'Save to Shortlist'}
      </button>
      
      <div className="flex gap-3">
        {/* §12.10: Compare */}
        <button
          onClick={onCompare}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium
            bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
        >
          Compare
        </button>
        
        {/* §12.10: Copy link */}
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium
            bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Copy Link
        </button>
      </div>
    </div>
  );
}
