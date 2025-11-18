import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Flame } from 'lucide-react';

export default function ProductivityHeatmap({ data, loading }) {
  if (loading || !data) {
    return (
      <div className="bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 dark:bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  const getColor = (minutes) => {
    if (minutes === 0) return 'bg-gray-100 dark:bg-white/5';
    if (minutes < 30) return 'bg-green-200 dark:bg-green-500/30';
    if (minutes < 60) return 'bg-green-300 dark:bg-green-500/50';
    if (minutes < 120) return 'bg-green-400 dark:bg-green-500/70';
    return 'bg-green-600 dark:bg-green-500';
  };

  const getIntensity = (minutes) => {
    if (minutes === 0) return 'None';
    if (minutes < 30) return 'Low';
    if (minutes < 60) return 'Medium';
    if (minutes < 120) return 'High';
    return 'Very High';
  };

  // Group by weeks
  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  // Calculate stats
  const totalMinutes = data.reduce((sum, d) => sum + d.studyMinutes, 0);
  const activeDays = data.filter(d => d.studyMinutes > 0).length;
  const avgMinutes = Math.round(totalMinutes / activeDays) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-1">
            <Calendar size={20} className="text-blue-500" />
            Study Activity Heatmap
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Last 12 weeks • {activeDays} active days
          </p>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-1 text-orange-500 mb-1">
            <Flame size={20} />
            <span className="text-2xl font-bold">{avgMinutes}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">min/day avg</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Time</p>
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
          </p>
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Best Day</p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            {Math.max(...data.map(d => d.studyMinutes))}m
          </p>
        </div>
        <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Consistency</p>
          <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {Math.round((activeDays / data.length) * 100)}%
          </p>
        </div>
      </div>

      {/* Days Labels */}
      <div className="flex gap-2 mb-2">
        <div className="w-12 text-xs text-gray-500 dark:text-gray-400"></div>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
          <div key={idx} className="flex-1 text-center text-xs text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Heatmap Grid */}
      <div className="space-y-1">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="flex gap-2">
            <div className="w-12 text-xs text-gray-500 dark:text-gray-400 flex items-center">
              W{weekIdx + 1}
            </div>
            {week.map((day, dayIdx) => (
              <motion.div
                key={dayIdx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: (weekIdx * 7 + dayIdx) * 0.005 }}
                className={`flex-1 aspect-square ${getColor(day.studyMinutes)} rounded hover:ring-2 ring-blue-500 cursor-pointer transition-all`}
                title={`${day.date}: ${day.studyMinutes}min (${getIntensity(day.studyMinutes)})`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-white/10">
        <span className="text-xs text-gray-500 dark:text-gray-400">Less</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-100 dark:bg-white/5 rounded" />
          <div className="w-4 h-4 bg-green-200 dark:bg-green-500/30 rounded" />
          <div className="w-4 h-4 bg-green-300 dark:bg-green-500/50 rounded" />
          <div className="w-4 h-4 bg-green-400 dark:bg-green-500/70 rounded" />
          <div className="w-4 h-4 bg-green-600 dark:bg-green-500 rounded" />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">More</span>
      </div>
    </motion.div>
  );
}