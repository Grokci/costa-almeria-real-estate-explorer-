'use client';

interface BeachAccessFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function BeachAccessFilter({ value, onChange }: BeachAccessFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Beach Access</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="select"
      >
        <option value="all">All</option>
        <option value="excellent">Excellent</option>
        <option value="good">Good</option>
        <option value="okay">Okay</option>
        <option value="limited">Limited</option>
      </select>
    </div>
  );
}
