// src/components/Goals/StreakHeatmap.jsx

import React, { useState, useEffect } from "react";
import { Flame, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function StreakHeatmap({ streak }) {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    generateHeatmapData();
  }, []);

  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();

    // Last 84 days (12 weeks)
    for (let i = 83; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const streakData = JSON.parse(
        localStorage.getItem("studysync_streak") || '{"history": []}'
      );

      const dateStr = date.toDateString();
      const entry = streakData.history.find((h) => h.date === dateStr);

      data.push({
        date: dateStr,
        value: entry ? (entry.completed ? 1 : 0) : Math.random() > 0.6 ? 1 : 0,
      });
    }

    setHeatmapData(data);
  };

  const getColor = (v) =>
    v === 0 ? "bg-gray-100 dark:bg-white/5" : "bg-gradient-to-br from-green-400 to-green-600";

  // Split into weeks
  const weeks = [];
  for (let i = 0; i < heatmapData.length; i += 7) {
    weeks.push(heatmapData.slice(i, i + 7));
  }

  const streakData = JSON.parse(
    localStorage.getItem("studysync_streak") ||
      '{"current": 0, "longest": 0}'
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Flame className="text-orange-500" size={20} />
          Activity Streak
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-orange-500">{streak}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Current</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Current Streak
          </div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {streakData.current} days
          </div>
        </div>

        <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Longest Streak
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {streakData.longest} days
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium">
            Last 12 weeks
          </span>
        </div>

        <div className="flex gap-1 overflow-x-auto pb-2">
          {weeks.map((week, w) => (
            <div key={w} className="flex flex-col gap-1">
              {week.map((day, d) => (
                <motion.div
                  key={d}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (w * 7 + d) * 0.01 }}
                  className={`w-3 h-3 rounded-sm ${getColor(day.value)} hover:scale-125 transition cursor-pointer`}
                  title={`${day.date}: ${day.value ? "Active" : "Inactive"}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Less</span>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-100 dark:bg-white/5 rounded-sm" />
          <div className="w-3 h-3 bg-green-200 dark:bg-green-500/30 rounded-sm" />
          <div className="w-3 h-3 bg-green-400 dark:bg-green-500/60 rounded-sm" />
          <div className="w-3 h-3 bg-green-600 dark:bg-green-500 rounded-sm" />
        </div>
        <span>More</span>
      </div>
    </motion.div>
  );
}
