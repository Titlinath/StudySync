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

  const darkStyles = [
    { darkBg: 'dark:bg-blue-500/10', darkBorder: 'dark:border-blue-500/30', darkGlow: 'dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]', darkText: 'dark:text-blue-300', darkIcon: 'dark:from-[#3b82f6] dark:to-[#8b5cf6]' },
    { darkBg: 'dark:bg-pink-500/10', darkBorder: 'dark:border-pink-500/30', darkGlow: 'dark:hover:shadow-[0_0_25px_rgba(236,72,153,0.35)]', darkText: 'dark:text-pink-300', darkIcon: 'dark:from-[#ec4899] dark:to-[#f97316]' },
    { darkBg: 'dark:bg-cyan-500/10', darkBorder: 'dark:border-cyan-500/30', darkGlow: 'dark:hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]', darkText: 'dark:text-cyan-300', darkIcon: 'dark:from-[#06b6d4] dark:to-[#3b82f6]' },
    { darkBg: 'dark:bg-purple-500/10', darkBorder: 'dark:border-purple-500/30', darkGlow: 'dark:hover:shadow-[0_0_25px_rgba(139,92,246,0.35)]', darkText: 'dark:text-purple-300', darkIcon: 'dark:from-[#8b5cf6] dark:to-[#ec4899]' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const ds = darkStyles[index];
        return (
          <div
            key={index}
            className={`bg-white dark:bg-transparent dark:backdrop-blur-sm dark:border rounded-xl p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl ${ds.darkBg} ${ds.darkBorder} ${ds.darkGlow}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.gradient} ${ds.darkIcon} flex items-center justify-center flex-shrink-0`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{stat.label}</p>
                <p className={`text-2xl font-bold text-gray-800 ${ds.darkText}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}