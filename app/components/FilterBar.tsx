'use client';

import { Filter } from '../types/todo';

interface FilterBarProps {
  current: Filter;
  onChange: (filter: Filter) => void;
  counts: { all: number; active: number; completed: number };
}

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'completed', label: '완료' },
];

export default function FilterBar({ current, onChange, counts }: FilterBarProps) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            current === value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {label}
          <span className="ml-1.5 text-xs opacity-75">({counts[value]})</span>
        </button>
      ))}
    </div>
  );
}
