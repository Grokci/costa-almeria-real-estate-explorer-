'use client';

interface LivelinessFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function LivelinessFilter({ value, onChange }: LivelinessFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Year-round Liveliness</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="select"
      >
        <option value="all">All</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
}
