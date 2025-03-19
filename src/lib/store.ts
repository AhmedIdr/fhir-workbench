import { create } from 'zustand';
import { ModelSize, Task, SortConfig } from '@/types';
import leaderboardData from '@/data/leaderboard.json';

type QuickFilterType = 'open-source' | 'closed-source' | 'small' | 'medium' | 'large' | null;

interface LeaderboardStore {
  models: typeof leaderboardData.models;
  selectedSize: ModelSize | 'all';
  sortConfig: SortConfig;
  searchQuery: string;
  activeQuickFilter: QuickFilterType;
  setSelectedSize: (size: ModelSize | 'all') => void;
  setSortConfig: (key: Task | null) => void;
  setSearchQuery: (query: string) => void;
  setQuickFilter: (filter: QuickFilterType) => void;
  getFilteredAndSortedModels: () => typeof leaderboardData.models;
  getTotalModelCount: () => number;
  getAverageScore: () => number;
}

// Helper function to calculate average score excluding null values
const calculateAverage = (tasks: Record<Task, number | null>) => {
  const validValues = Object.values(tasks).filter(val => val !== null) as number[];
  if (validValues.length === 0) return 0; // Default to 0 for sorting purposes
  return validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
};

// Helper function to safely compare values that might be null
const safeCompare = (a: number | null, b: number | null): number => {
  // Null values are placed at the end when sorting
  if (a === null && b === null) return 0;
  if (a === null) return 1; // null is "greater" (goes to the end)
  if (b === null) return -1; // null is "greater" (goes to the end)
  return a - b;
};

export const useLeaderboardStore = create<LeaderboardStore>((set, get) => ({
  models: leaderboardData.models,
  selectedSize: 'all',
  sortConfig: {
    key: null,
    direction: 'desc'
  },
  searchQuery: '',
  activeQuickFilter: null,
  setSelectedSize: (size) => set({ selectedSize: size }),
  setSortConfig: (key) => set((state) => ({
    sortConfig: {
      key,
      direction: state.sortConfig.key === key && state.sortConfig.direction === 'desc' ? 'asc' : 'desc'
    }
  })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setQuickFilter: (filter) => set((state) => ({
    activeQuickFilter: state.activeQuickFilter === filter ? null : filter
  })),
  getTotalModelCount: () => leaderboardData.models.length,
  getAverageScore: () => {
    const models = leaderboardData.models;
    const totalScores = models.reduce((acc, model) => {
      const avgScore = calculateAverage(model.tasks);
      return acc + avgScore;
    }, 0);
    return totalScores / models.length;
  },
  getFilteredAndSortedModels: () => {
    const { models, selectedSize, sortConfig, searchQuery, activeQuickFilter } = get();
    let filteredModels = [...models];
    
    // Apply quick filters first
    if (activeQuickFilter) {
      switch (activeQuickFilter) {
        case 'open-source':
          filteredModels = filteredModels.filter(model => model.size !== 'Closed');
          break;
        case 'closed-source':
          filteredModels = filteredModels.filter(model => model.size === 'Closed');
          break;
        case 'small':
          filteredModels = filteredModels.filter(model => {
            if (model.size === 'Closed') return false;
            const modelSize = parseInt(model.size);
            return modelSize <= 7;
          });
          break;
        case 'medium':
          filteredModels = filteredModels.filter(model => {
            if (model.size === 'Closed' || model.size === '>70') return false;
            const modelSize = parseInt(model.size);
            return modelSize > 7 && modelSize <= 32;
          });
          break;
        case 'large':
          filteredModels = filteredModels.filter(model => {
            if (model.size === 'Closed') return false;
            return model.size === '70' || model.size === '>70';
          });
          break;
      }
    }
    
    // Filter by size
    else if (selectedSize !== 'all') {
      if (selectedSize === 'Closed') {
        filteredModels = filteredModels.filter(model => model.size === 'Closed');
      } else if (selectedSize === '>70') {
        filteredModels = filteredModels.filter(model => {
          if (model.size === 'Closed') return false;
          if (model.size === '>70') return true;
          const modelSize = parseInt(model.size);
          return modelSize > 70;
        });
      } else {
        // "Less than or equal to" filter
        const sizeThreshold = parseInt(selectedSize);
        filteredModels = filteredModels.filter(model => {
          if (model.size === 'Closed' || model.size === '>70') return false;
          const modelSize = parseInt(model.size);
          return modelSize <= sizeThreshold;
        });
      }
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      try {
        // Check if query contains multiple search terms
        if (searchQuery.includes(';')) {
          const terms = searchQuery.split(';').map(term => term.trim()).filter(Boolean);
          
          filteredModels = filteredModels.filter(model => {
            return terms.some(term => {
              try {
                const regex = new RegExp(term, 'i');
                return regex.test(model.name);
              } catch (e) {
                return model.name.toLowerCase().includes(term.toLowerCase());
              }
            });
          });
        } else {
          // Single search term (potentially regex)
          const regex = new RegExp(searchQuery, 'i');
          filteredModels = filteredModels.filter(model => regex.test(model.name));
        }
      } catch (e) {
        // Fallback to simple string match if regex is invalid
        const lowerQuery = searchQuery.toLowerCase();
        filteredModels = filteredModels.filter(model => 
          model.name.toLowerCase().includes(lowerQuery)
        );
      }
    }

    // Sort models
    return filteredModels.sort((a, b) => {
      if (!sortConfig.key) {
        const aAvg = calculateAverage(a.tasks);
        const bAvg = calculateAverage(b.tasks);
        return sortConfig.direction === 'asc' 
          ? aAvg - bAvg 
          : bAvg - aAvg;
      }
      
      const aVal = a.tasks[sortConfig.key];
      const bVal = b.tasks[sortConfig.key];
      
      return sortConfig.direction === 'asc' 
        ? safeCompare(aVal, bVal)
        : safeCompare(bVal, aVal);
    });
  }
}));