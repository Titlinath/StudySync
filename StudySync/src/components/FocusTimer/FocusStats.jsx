import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Calendar, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FocusStats({ todayFocusTime, completedCycles, streak }) {
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    loadWeeklyData();
  }, [todayFocusTime]);

  const loadWeeklyData = () => {
    const stats = JSON.parse(localStorage.getItem('focusStats') || '{}');
    const last7Days = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      last7Days.push({
        day: dayName,
        focusTime: stats[dateStr]?.focusTime || 0,
        cycles: stats[dateStr]?.cycles || 0
      });
    }
    
    setWeeklyData(last7Days);
  };

  const maxFocusTime = Math.max(...weeklyData.map(d => d.focusTime), 1);

  return (
    <div className="space-y-4">
      {/* Today's Stats Card */}
      <div className="bg-white dark:bg-[#1e1b4b] dark:border dark:border-white/10 rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FFD6A5] to-[#FF9A8B] dark:from-[#ec4899] dark:to-[#8b5cf6] flex items-center justify-center">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">Today's Stats</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Your focus journey</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Focus Time */}
          <div className="p-4 bg-gradient-to-r from-[#A3BFFA]/10 to-[#8AC6D1]/10 dark:from-[#3b82f6]/10 dark:to-[#ec4899]/10 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Focus Time</span>
              <Target size={16} className="text-[#8AC6D1] dark:text-[#3b82f6]" />
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {todayFocusTime}<span className="text-lg text-gray-500 dark:text-gray-400">m</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((todayFocusTime / 120) * 100, 100)}%` }}
                className="h-full bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] rounded-full"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Goal: 120 minutes
            </p>
          </div>

          {/* Cycles */}
          <div className="p-4 bg-gradient-to-r from-[#DFF6F0]/30 to-[#8AC6D1]/10 dark:from-[#8b5cf6]/10 dark:to-[#22d3ee]/10 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Cycles</span>
              <Award size={16} className="text-[#8AC6D1] dark:text-[#8b5cf6]" />
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {completedCycles}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Pomodoro sessions
            </p>
          </div>

          {/* Streak */}
          <div className="p-4 bg-gradient-to-r from-[#FFD6A5]/20 to-[#FF9A8B]/20 dark:from-[#ec4899]/10 dark:to-[#8b5cf6]/10 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Streak</span>
              <Calendar size={16} className="text-[#FF9A8B] dark:text-[#ec4899]" />
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {streak}<span className="text-lg text-gray-500 dark:text-gray-400">d</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Keep it going! 🔥
            </p>
          </div>
        </div>
      </div>

      {/* Weekly Heatmap */}
      <div className="bg-white dark:bg-[#1e1b4b] dark:border dark:border-white/10 rounded-2xl shadow-lg p-6">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <Calendar size={18} className="text-[#8AC6D1] dark:text-[#3b82f6]" />
          7-Day Activity
        </h3>

        <div className="space-y-3">
          {weeklyData.map((data, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-8">
                {data.day}
              </span>
              <div className="flex-1 h-8 bg-gray-100 dark:bg-white/5 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(data.focusTime / maxFocusTime) * 100}%` }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] rounded-lg flex items-center justify-end pr-2"
                >
                  {data.focusTime > 0 && (
                    <span className="text-xs font-bold text-white">
                      {data.focusTime}m
                    </span>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gradient-to-br from-[#FFD6A5] to-[#FF9A8B] dark:from-[#ec4899] dark:to-[#8b5cf6] rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Award size={24} />
          <h3 className="font-bold text-lg">Achievements</h3>
        </div>
        <div className="space-y-2">
          {completedCycles >= 10 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-2xl">🏆</span>
              <span>Focus Master (10+ cycles)</span>
            </div>
          )}
          {streak >= 7 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-2xl">🔥</span>
              <span>Week Warrior (7 day streak)</span>
            </div>
          )}
          {todayFocusTime >= 120 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-2xl">⭐</span>
              <span>Daily Goal Achieved</span>
            </div>
          )}
          {completedCycles < 10 && streak < 7 && todayFocusTime < 120 && (
            <div className="text-sm opacity-90">
              Keep studying to unlock achievements! 💪
            </div>
          )}
        </div>
      </div>
    </div>
  );
}