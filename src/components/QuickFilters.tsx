'use client';

import { useLeaderboardStore } from '@/lib/store';

type QuickFilterType = 'open-source' | 'closed-source' | 'small' | 'medium' | 'large' | null;

interface QuickFilter {
  id: QuickFilterType;
  label: string;
  count: number;
}

export default function QuickFilters() {
  const { setQuickFilter, activeQuickFilter } = useLeaderboardStore();
  
  const filters: QuickFilter[] = [
    { id: 'open-source', label: 'Open Source Models', count: 32 },
    { id: 'closed-source', label: 'Closed Source', count: 4 },
    { id: 'small', label: '≤7B Models', count: 15 },
    { id: 'medium', label: '8-24B Models', count: 12 },
    { id: 'large', label: '≥32B Models', count: 9 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="flex items-center mb-4">
        <span className="text-sm font-medium text-gray-400 mr-4">Quick Filters:</span>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setQuickFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center
                ${activeQuickFilter === filter.id
                  ? 'bg-[#f2acac] text-[#222732] font-medium'
                  : 'bg-[#2d3748] text-gray-300 hover:bg-[#353e50]'
                }`}
            >
              {filter.label}
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-opacity-20 bg-white">
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 