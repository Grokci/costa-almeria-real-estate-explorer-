import { loadTowns } from '@/lib/towns/loadTowns';
import { Suspense } from 'react';
import { ExplorerClient } from '../ExplorerClient';

export const metadata = {
  title: 'Town Explorer | Costa de Almería',
  description: 'Explore coastal towns in Almería province, Spain. Compare properties, beach access, and lifestyle factors to find your perfect Mediterranean home.',
};

export default function ExplorerPage() {
  const towns = loadTowns();
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Loading...</p></div>}>
      <ExplorerClient initialTowns={towns} />
    </Suspense>
  );
}