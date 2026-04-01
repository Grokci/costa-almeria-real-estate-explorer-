'use client';

import { Town } from '@/types/town';
import { TownListCard } from './TownListCard';

interface TownListProps {
  towns: Town[];
}

export function TownList({ towns }: TownListProps) {
  return (
    <div className="divide-y divide-gray-100">
      {towns.map((town, index) => (
        <TownListCard 
          key={town.id} 
          town={town} 
          index={index}
        />
      ))}
    </div>
  );
}
