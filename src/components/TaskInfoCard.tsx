import React from 'react';
import { HelpCircle } from 'lucide-react';
import { taskDescriptions } from '../utils/constants';
import { Task } from '../types';

interface Props {
  task: Task;
  name: string;
  shortName: string;
}

const TaskInfoCard: React.FC<Props> = ({ task, name, shortName }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border border-primary-darker/10">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-primary-darker">{name}</h3>
          <span className="text-xs text-secondary">({shortName})</span>
        </div>
        <HelpCircle className="h-4 w-4 text-secondary" />
      </div>
      <p className="mt-2 text-xs text-secondary">{taskDescriptions[task]}</p>
    </div>
  );
}

export default TaskInfoCard;