'use client';

import { Town } from '@/types/town';
import { MapboxMap } from './MapboxMap';

interface MapPanelProps {
  towns: Town[];
}

export function MapPanel({ towns }: MapPanelProps) {
  return (
    <div className="relative w-full h-full min-h-[400px]">
      <MapboxMap towns={towns} />
    </div>
  );
}
