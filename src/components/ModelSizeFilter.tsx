'use client';

import { ModelSize } from '@/types';
import { useLeaderboardStore } from '@/lib/store';

export default function ModelSizeFilter() {
  const { selectedSize, setSelectedSize } = useLeaderboardStore();

  const renderSizeLabel = (label: string) => {
    if (label === 'All Sizes' || label === 'Closed Source') {
      return label;
    }
    
    // For size labels with B suffix, split into components
    const match = label.match(/([≤>]?)(\d+)(B)/);
    if (match) {
      const [_, prefix, number, suffix] = match;
      return (
        <div className="flex items-center">
          {prefix && <span className="whitespace-nowrap">{prefix}</span>}
          <span className="whitespace-nowrap">{number}</span>
          <span className="ml-0.5 whitespace-nowrap" style={{ letterSpacing: '0.05em' }}>B</span>
        </div>
      );
    }
    
    return label;
  };

  const sizes: Array<{ value: ModelSize | 'all'; label: string }> = [
    { value: 'all', label: 'All Sizes' },
    { value: '7', label: '≤7B' },
    { value: '14', label: '≤14B' },
    { value: '32', label: '≤32B' },
    { value: '70', label: '≤70B' },
    { value: '>70', label: '>70B' },
    { value: 'Closed', label: 'Closed Source' },
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-400 mr-6">Filter by size:</span>
        <div className="flex flex-wrap gap-3">
          {sizes.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setSelectedSize(value)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${selectedSize === value
                  ? 'bg-[#f2acac] text-[#222732] font-medium'
                  : 'bg-[#2d3748] text-gray-300 hover:bg-[#353e50]'
                }`}
              aria-label={label}
            >
              {renderSizeLabel(label)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}