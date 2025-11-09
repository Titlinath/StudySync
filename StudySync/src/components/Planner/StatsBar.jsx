import React from 'react';
import { Target, Clock, Calendar, TrendingUp } from 'lucide-react';

export default function StatsBar({ generatedPlan, availableHoursPerDay }) {
  const stats = [
    {
      icon: Target,
      label: 'Total Subjects',
      value: generatedPlan.subjects,
      gradient: 'from-[#8AC6D1] to-[#A3BFFA]',
      bgColor: 'bg-gradient-to-br from-[#8AC6D1] to-[#A3BFFA]'
    },
    {
      icon: Clock,
      label: 'Study Hours',
      value: `${Math.round(generatedPlan.totalHours)}h`,
      gradient: 'from-[#FF9A8B] to-[#FFD6A5]',
      bgColor: 'bg-gradient-to-br from-[#FF9A8B] to-[#FFD6A5]'
    },
    {
      icon: Calendar,
      label: 'Days Left',
      value: generatedPlan.daysAvailable,
      gradient: 'from-[#DFF6F0] to-[#8AC6D1]',
      bgColor: 'bg-gradient-to-br from-[#DFF6F0] to-[#8AC6D1]'
    },
    {
      icon: TrendingUp,
      label: 'Daily Goal',
      value: `${availableHoursPerDay}h`,
      gradient: 'from-[#E8DFF5] to-[#A3BFFA]',
      bgColor: 'bg-gradient-to-br from-[#E8DFF5] to-[#A3BFFA]'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center flex-shrink-0`}>
              <stat.icon className="text-white" size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-600 truncate">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}