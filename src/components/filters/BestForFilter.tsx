'use client';

interface BestForFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function BestForFilter({ value, onChange }: BestForFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Best For</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="select"
      >
        <option value="all">All</option>
        <option value="value-buyers">Value Buyers</option>
        <option value="year-round-living">Year-round Living</option>
        <option value="remote-work">Remote Work</option>
        <option value="families">Families</option>
        <option value="beach-lifestyle">Beach Lifestyle</option>
      </select>
    </div>
  );
}
