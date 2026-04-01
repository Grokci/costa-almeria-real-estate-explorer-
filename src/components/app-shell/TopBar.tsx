'use client';

import Link from 'next/link';
import { MapPin, List, Heart } from 'lucide-react';
import { useUIStore } from '@/lib/state/uiStore';

interface TopBarProps {
  totalTowns: number;
  shortlistedCount: number;
}

export function TopBar({ totalTowns, shortlistedCount }: TopBarProps) {
  const { setIsShortlistOpen } = useUIStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-blue-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Costa de Almería</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Town Explorer</p>
            </div>
          </div>

          {/* Stats */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <List className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{totalTowns} towns</span>
            </div>
            <button 
              onClick={() => setIsShortlistOpen(true)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>Shortlist ({shortlistedCount})</span>
            </button>
          </div>

          {/* Mobile Shortlist Button */}
          <button 
            onClick={() => setIsShortlistOpen(true)}
            className="md:hidden flex items-center gap-1 text-sm text-gray-600"
          >
            <Heart className="w-4 h-4" />
            <span className="lg:hidden">{shortlistedCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
