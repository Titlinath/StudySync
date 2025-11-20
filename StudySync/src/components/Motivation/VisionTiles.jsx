import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Clock, Lightbulb, TrendingUp, Flame } from 'lucide-react';

export default function VisionTiles({ stats, loading }) {
  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white dark:bg-white/10 rounded-xl p-4 h-32 animate-pulse"></div>
        ))}
      </div>
    );
  }

  const tiles = [
    {
      icon: Trophy,
      title: 'Longest Streak',
      value: `${stats.longestStreak} days`,
      subtitle: 'Beat it this week!',
      gradient: 'from-yellow-400 to-orange-500',
      bg: 'from-yellow-50 to-orange-50 dark:from-yellow-500/10 dark:to-orange-500/10'
    },
    {
      icon: Flame,
      title: 'Current Streak',
      value: `${stats.currentStreak} days`,
      subtitle: 'Keep the fire burning!',
      gradient: 'from-orange-400 to-red-500',
      bg: 'from-orange-50 to-red-50 dark:from-orange-500/10 dark:to-red-500/10'
    },
    {
      icon: Target,
      title: `${stats.subjectName} Progress`,
      value: `${stats.goalProgress}%`,
      subtitle: 'Closer than you think',
      gradient: 'from-green-400 to-emerald-500',
      bg: 'from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10'
    },
    {
      icon: Clock,
      title: 'Peak Productivity',
      value: stats.peakHour,
      subtitle: 'Your golden hours',
      gradient: 'from-blue-400 to-cyan-500',
      bg: 'from-blue-50 to-cyan-50 dark:from-blue-500/10 dark:to-cyan-500/10'
    },
    {
      icon: TrendingUp,
      title: 'Total Study Time',
      value: `${Math.floor(stats.totalStudyTime / 60)}h ${stats.totalStudyTime % 60}m`,
      subtitle: 'Hours invested',
      gradient: 'from-purple-400 to-pink-500',
      bg: 'from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10'
    },
    {
      icon: Lightbulb,
      title: 'Smart Tip',
      value: 'First Task',
      subtitle: 'Study hardest topic first',
      gradient: 'from-indigo-400 to-purple-500',
      bg: 'from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10'
    }
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <Trophy size={20} className="text-yellow-500" />
        Your Vision Board
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map((tile, idx) => {
          const Icon = tile.icon;
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: idx * 0.1, type: "spring" }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                transition: { duration: 0.2 }
              }}
              className={`relative group cursor-pointer bg-gradient-to-br ${tile.bg} border-2 border-white dark:border-white/10 rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all overflow-hidden`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              
              {/* Icon */}
              <div className={`inline-flex p-3 bg-gradient-to-br ${tile.gradient} rounded-lg mb-3 shadow-md`}>
                <Icon size={24} className="text-white" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {tile.title}
                </h4>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  {tile.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {tile.subtitle}
                </p>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/30 to-white/0 dark:from-white/0 dark:via-white/10 dark:to-white/0 opacity-0 group-hover:opacity-100 transition-opacity transform -skew-x-12"></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}