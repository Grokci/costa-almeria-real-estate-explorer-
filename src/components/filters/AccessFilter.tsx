'use client';

interface AccessFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function AccessFilter({ value, onChange }: AccessFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Airport Access</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="select"
      >
        <option value="all">All</option>
        <option value="under-30">Under 30 mins</option>
        <option value="under-45">Under 45 mins</option>
        <option value="under-60">Under 60 mins</option>
      </select>
    </div>
  );
}
