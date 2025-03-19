'use client';

import { useLeaderboardStore } from '@/lib/store';

export default function StatsCard() {
  const { getTotalModelCount, getAverageScore } = useLeaderboardStore();
  
  const totalModels = getTotalModelCount();
  const averageScore = getAverageScore();
  
  // Format date as day.month.year
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;
  
  const stats = [
    {
      title: "Models Evaluated",
      value: totalModels.toString()
    },
    {
      title: "Average Score",
      value: `${averageScore.toFixed(1)}%`
    },
    {
      title: "Last Updated",
      value: formattedDate
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div key={index} className="bg-[#1b222d] rounded-lg p-6 shadow-md border border-gray-800">
          <p className="text-gray-400 text-lg mb-2">{stat.title}</p>
          <p className="text-white font-bold text-4xl">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}