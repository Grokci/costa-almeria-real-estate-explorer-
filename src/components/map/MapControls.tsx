'use client';

import { Plus, Minus, RotateCcw } from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function MapControls({ onZoomIn, onZoomOut, onReset }: MapControlsProps) {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      <button
        onClick={onZoomIn}
        className="w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
        aria-label="Zoom in"
      >
        <Plus className="w-4 h-4 text-gray-700" />
      </button>
      
      <button
        onClick={onZoomOut}
        className="w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
        aria-label="Zoom out"
      >
        <Minus className="w-4 h-4 text-gray-700" />
      </button>
      
      <button
        onClick={onReset}
        className="w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
        aria-label="Reset view"
      >
        <RotateCcw className="w-4 h-4 text-gray-700" />
      </button>
    </div>
  );
}
