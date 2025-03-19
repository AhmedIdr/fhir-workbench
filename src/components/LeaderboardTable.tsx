'use client';

import * as React from 'react';
import { MoveUp, MoveDown, ExternalLink, Info } from 'lucide-react';
import { Task } from '@/types';
import { taskNames, taskDescriptions, taskFullNames } from '@/utils/constants';
import { useLeaderboardStore } from '@/lib/store';

export default function LeaderboardTable() {
  const { sortConfig, setSortConfig, getFilteredAndSortedModels, getTotalModelCount } = useLeaderboardStore();
  const [activeTooltip, setActiveTooltip] = React.useState<Task | null>(null);
  
  // Set initial sort on component mount
  React.useEffect(() => {
    if (!sortConfig.key) {
      setSortConfig(null);  // null key represents the average column
    }
  }, []);

  const models = getFilteredAndSortedModels();
  const totalCount = getTotalModelCount();

  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text-gray-500';
    return 'text-white';
  };

  const getMedalEmoji = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return null;
    }
  };

  const SortIndicator = ({ columnKey }: { columnKey: Task | null }) => {
    const isActive = sortConfig.key === columnKey;
    return (
      <div className="flex -space-x-2">
        <MoveUp 
          className={`h-3 w-3 ${
            isActive && sortConfig.direction === 'asc' 
              ? 'text-[#f2acac]' 
              : 'text-gray-500'
          } transition-colors`} 
        />
        <MoveDown 
          className={`h-3 w-3 ${
            isActive && sortConfig.direction === 'desc' 
              ? 'text-[#f2acac]' 
              : 'text-gray-500'
          } transition-colors`} 
        />
      </div>
    );
  };

  const getScoreBar = (score: number | null) => {
    if (score === null) {
      return <span className="text-gray-500">-*</span>;
    }
    
    return (
      <div className="flex items-center">
        <div className="w-24 bg-gray-700 rounded-full h-2 mr-2">
          <div 
            className="bg-[#f2acac] h-2 rounded-full" 
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <span>{score.toFixed(1)}%</span>
      </div>
    );
  };

  // Calculate average excluding null values
  const calculateAverage = (tasks: Record<Task, number | null>) => {
    const validValues = Object.values(tasks).filter(val => val !== null) as number[];
    if (validValues.length === 0) return null;
    return validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
  };

  return (
    <div className="w-full mb-12">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-400">
          Showing <span className="font-medium text-white">{models.length}</span> of <span className="font-medium text-white">{totalCount}</span> models
        </div>
        <div className="flex items-center gap-2">
          <button className="text-sm text-gray-400 flex items-center gap-1 hover:text-[#f2acac]">
            <Info className="h-4 w-4" />
            <span>Table options</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto bg-[#222732] rounded-xl shadow-lg border border-gray-700">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#2d3748]">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 w-16">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Model</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 w-24">Size</th>
              {Object.entries(taskNames).map(([key, name]) => (
                <th 
                  key={key}
                  className="px-6 py-4 text-sm font-semibold text-gray-300 cursor-pointer hover:bg-[#353e50] relative"
                  onClick={() => setSortConfig(key as Task)}
                  onMouseEnter={() => setActiveTooltip(key as Task)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <div className="flex items-center gap-1">
                    <span>{name}</span>
                    <Info className="h-3.5 w-3.5 text-gray-400 ml-1" />
                    <SortIndicator columnKey={key as Task} />
                  </div>
                  
                  {activeTooltip === key && (
                    <div className="absolute z-10 w-64 p-4 mt-2 bg-[#2d3748] rounded-lg shadow-xl border border-gray-700 
                                  text-sm text-gray-300 top-full left-1/2 transform -translate-x-1/2">
                      <div className="font-medium mb-1">{taskFullNames[key as Task]}</div>
                      {taskDescriptions[key as Task]}
                      <div className="absolute w-3 h-3 bg-[#2d3748] transform rotate-45 -top-1.5 left-1/2 -translate-x-1/2 border-t border-l border-gray-700"></div>
                    </div>
                  )}
                </th>
              ))}
              <th 
                className="px-6 py-4 text-sm font-semibold text-gray-300 cursor-pointer hover:bg-[#353e50]"
                onClick={() => setSortConfig(null)}
              >
                <div className="flex items-center gap-1">
                  <span>Avg</span>
                  <SortIndicator columnKey={null} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, index) => {
              const avgScore = calculateAverage(model.tasks);
              return (
                <tr 
                  key={model.name}
                  className="border-t border-gray-700 hover:bg-[#2d3748] transition-colors"
                >
                  <td className="px-6 py-5 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">#{index + 1}</span>
                      {getMedalEmoji(index)}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{model.name}</span>
                      <a
                        href={model.huggingface}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#f2acac]"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-300">
                    {model.size === 'Closed' ? 'Closed' : (
                      <div className="flex items-center">
                        {model.size === '>70' ? (
                          <>
                            <span className="whitespace-nowrap">&gt;70</span>
                            <span className="ml-0.5 whitespace-nowrap" style={{ letterSpacing: '0.05em' }}>B</span>
                          </>
                        ) : (
                          <>
                            <span className="whitespace-nowrap">{model.size}</span>
                            <span className="ml-0.5 whitespace-nowrap" style={{ letterSpacing: '0.05em' }}>B</span>
                          </>
                        )}
                      </div>
                    )}
                  </td>
                  {Object.keys(taskNames).map(task => (
                    <td 
                      key={task}
                      className="px-6 py-5"
                    >
                      {getScoreBar(model.tasks[task as Task])}
                    </td>
                  ))}
                  <td className="px-6 py-5">
                    {getScoreBar(avgScore)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}