'use client';

import { Town } from '@/types/town';
import { 
  Footprints,
  Globe,
  Users,
  Laptop,
  Shield,
  AlertCircle
} from 'lucide-react';

interface TownLivingSectionProps {
  town: Town;
}

export function TownLivingSection({ town }: TownLivingSectionProps) {
  const lifestyleScores = [
    { 
      icon: Footprints, 
      label: 'Walkability', 
      value: town.lifestyle.walkability,
      color: 'text-emerald-500'
    },
    { 
      icon: Globe, 
      label: 'International Feel', 
      value: town.lifestyle.internationalFeel,
      color: 'text-sky-500'
    },
    { 
      icon: Users, 
      label: 'Family Fit', 
      value: town.lifestyle.familyFit,
      color: 'text-purple-500'
    },
    { 
      icon: Laptop, 
      label: 'Remote Work', 
      value: town.lifestyle.remoteWorkFit,
      color: 'text-orange-500'
    },
  ];

  const getScoreColor = (score: string) => {
    if (score === 'high') return 'bg-emerald-500';
    if (score === 'medium') return 'bg-sky-500';
    return 'bg-amber-500';
  };

  const getScoreWidth = (score: string) => {
    if (score === 'high') return '100%';
    if (score === 'medium') return '66%';
    return '33%';
  };

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Living</h2>
      
      {/* Liveliness */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-gray-900">Year-Round Liveliness</span>
          <span className="text-sm text-gray-600 capitalize">{town.lifestyle.yearRoundLiveliness}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${getScoreColor(town.lifestyle.yearRoundLiveliness)}`}
            style={{ width: getScoreWidth(town.lifestyle.yearRoundLiveliness) }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">{town.editorial.vibe}</p>
      </div>
      
      {/* Lifestyle Scores Grid */}
      <div className="grid grid-cols-2 gap-3">
        {lifestyleScores.map((item) => (
          <div 
            key={item.label}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
          >
            <item.icon className={`w-5 h-5 ${item.color}`} />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{item.label}</div>
              <div className="text-xs text-gray-600 capitalize">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Practical Notes */}
      {town.facts.practicalNotes && town.facts.practicalNotes.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Practical Notes</h3>
          <ul className="space-y-1">
            {town.facts.practicalNotes.map((note, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                <Shield className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Who Should Avoid It */}
      {town.editorial.whoShouldAvoidIt && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-amber-800">Who Should Consider Elsewhere</h3>
              <p className="text-sm text-amber-700 mt-1">{town.editorial.whoShouldAvoidIt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
