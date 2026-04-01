'use client';

import { ArrowLeft, X } from 'lucide-react';

interface TownModalHeaderProps {
  townName: string;
  onClose: () => void;
}

export function TownModalHeader({ townName, onClose }: TownModalHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <button
        onClick={onClose}
        className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>
      
      <button
        onClick={onClose}
        className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors hidden lg:block"
        aria-label="Close"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>
      
      <h1 className="text-2xl font-bold text-gray-900">{townName}</h1>
    </div>
  );
}
