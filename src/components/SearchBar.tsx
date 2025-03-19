'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useLeaderboardStore } from '@/lib/store';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const { setSearchQuery } = useLeaderboardStore();

  // Update search results whenever query changes
  useEffect(() => {
    // Use debounce for search to avoid excessive updates for rapid typing
    const timeoutId = setTimeout(() => {
      setSearchQuery(query);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [query, setSearchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full mb-8">
      <div className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            className="block w-full rounded-lg border-0 bg-[#2d3748] py-4 pl-12 pr-4 text-gray-300 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-[#f2acac] focus:outline-none text-base"
            placeholder="Search by model name • try regex patterns"
            aria-label="Search models"
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 ml-1">
          Supports strict search and regex • Use semicolons for multiple terms
        </p>
      </div>
    </div>
  );
} 