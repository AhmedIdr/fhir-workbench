'use client';

import { useLeaderboardStore } from '@/lib/store';
import { Task } from '@/types';
import { Info } from 'lucide-react';
import { useState } from 'react';

export default function TasksGrid() {
  const { setSortConfig } = useLeaderboardStore();
  const [activeTooltip, setActiveTooltip] = useState<Task | null>(null);
  
  const tasks = [
    {
      id: 'qna' as Task,
      title: "FHIR Q&A",
      subtitle: "(Q&A)",
      description: "Ability to answer questions about FHIR general knowledge"
    },
    {
      id: 'api_qna' as Task,
      title: "FHIR API Usage",
      subtitle: "(API)",
      description: "Ability to answer questions about FHIR API specifications"
    },
    {
      id: 'identification' as Task,
      title: "Resource Identification",
      subtitle: "(ID)",
      description: "Ability to identify FHIR resource types and elements"
    },
    {
      id: 'generation' as Task,
      title: "Resource Generation",
      subtitle: "(Gen)",
      description: "Ability to generate valid FHIR resources and profiles"
    }
  ];

  const handleMouseEnter = (taskId: Task) => {
    setActiveTooltip(taskId);
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {tasks.map(task => (
        <div 
          key={task.id}
          onClick={() => setSortConfig(task.id)}
          onMouseEnter={() => handleMouseEnter(task.id)}
          onMouseLeave={handleMouseLeave}
          className="bg-[#1b222d] rounded-lg p-6 shadow-md border border-gray-800 cursor-pointer 
                   hover:bg-[#202938] hover:border-gray-700 transition-all relative"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">{task.title}</h3>
              <p className="text-sm text-gray-400">{task.subtitle}</p>
            </div>
            <Info className="h-4 w-4 text-gray-400 mt-1" />
          </div>
          
          {activeTooltip === task.id && (
            <div className="absolute z-10 w-64 p-4 mt-2 bg-[#2d3748] rounded-lg shadow-xl border border-gray-700 
                          text-sm text-gray-300 top-full left-1/2 transform -translate-x-1/2">
              {task.description}
              <div className="absolute w-3 h-3 bg-[#2d3748] transform rotate-45 -top-1.5 left-1/2 -translate-x-1/2 border-t border-l border-gray-700"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}