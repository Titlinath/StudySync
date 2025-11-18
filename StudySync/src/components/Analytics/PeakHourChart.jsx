import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp } from 'lucide-react';

export default function PeakHourChart({ data, loading }) {
  if (loading || !data) {
    return (
      <div className="bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-1/3"></div>
          <div className="h-48 bg-gray-200 dark:bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  const maxMinutes = Math.max(...data.map(d => d.minutes));
  const peakHour = data.reduce((max, curr) => curr.minutes > max.minutes ? curr : max, data[0]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-1">
            <Clock size={20} className="text-purple-500" />
            Peak Study Hours
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            When you study most effectively
          </p>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-1 text-purple-500 mb-1">
            <TrendingUp size={20} />
            <span className="text-2xl font-bold">{peakHour.label}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Your peak hour</p>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-2">
        {data.map((item, idx) => {
          const percentage = maxMinutes > 0 ? (item.minutes / maxMinutes) * 100 : 0;
          const isPeak = item.hour === peakHour.hour;
          
          return (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-16 text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.label}
              </div>
              
              <div className="flex-1 relative h-8 bg-gray-100 dark:bg-white/5 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: idx * 0.02, duration: 0.5 }}
                  className={`absolute inset-y-0 left-0 ${
                    isPeak 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : 'bg-gradient-to-r from-blue-400 to-cyan-500'
                  } rounded-lg`}
                />
                
                {item.minutes > 0 && (
                  <div className="absolute inset-0 flex items-center px-3">
                    <span className={`text-xs font-semibold ${
                      percentage > 30 ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {item.minutes}min
                    </span>
                  </div>
                )}
              </div>
              
              {isPeak && (
                <div className="px-2 py-1 bg-purple-100 dark:bg-purple-500/20 rounded text-xs font-bold text-purple-600 dark:text-purple-400">
                  Peak
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Insights */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10 grid grid-cols-3 gap-3">
        <div className="text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Morning</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {data.slice(0, 6).reduce((sum, h) => sum + h.minutes, 0)}m
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Afternoon</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {data.slice(6, 12).reduce((sum, h) => sum + h.minutes, 0)}m
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Evening</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {data.slice(12).reduce((sum, h) => sum + h.minutes, 0)}m
          </p>
        </div>
      </div>
    </motion.div>
  );
}