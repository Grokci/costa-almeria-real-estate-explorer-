'use client';

interface BudgetFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function BudgetFilter({ value, onChange }: BudgetFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="select"
      >
        <option value="all">All budgets</option>
        <option value="value">Value (€80k-€160k)</option>
        <option value="mid">Mid-range (€130k-€320k)</option>
        <option value="premium">Premium (€200k+)</option>
      </select>
    </div>
  );
}
