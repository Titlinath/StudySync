import React from 'react';
import { Award, Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BadgeShelf({ badges, totalGoals, streak }) {
  const allBadges = [
    { 
      id: 'beginner', 
      name: 'Beginner Achiever', 
      description: 'Complete 3 goals', 
      icon: '🏅', 
      threshold: 3,
      type: 'goals'
    },
    { 
      id: 'consistency', 
      name: 'Consistency King', 
      description: 'Maintain 7-day streak', 
      icon: '🔥', 
      threshold: 7,
      type: 'streak'
    },
    { 
      id: 'quick', 
      name: 'Quick Finisher', 
      description: 'Complete before deadline', 
      icon: '⚡',
      type: 'special'
    },
    { 
      id: 'master', 
      name: 'Goal Master', 
      description: 'Complete 10 goals', 
      icon: '🌟', 
      threshold: 10,
      type: 'goals'
    },
    { 
      id: 'dedicated', 
      name: 'Dedicated Scholar', 
      description: 'Complete 25 goals', 
      icon: '💎', 
      threshold: 25,
      type: 'goals'
    },
    { 
      id: 'legend', 
      name: 'StudySync Legend', 
      description: 'Complete 50 goals', 
      icon: '👑', 
      threshold: 50,
      type: 'goals'
    },
    { 
      id: 'fire', 
      name: 'On Fire', 
      description: 'Maintain 30-day streak', 
      icon: '🚀', 
      threshold: 30,
      type: 'streak'
    },
    { 
      id: 'unstoppable', 
      name: 'Unstoppable', 
      description: 'Maintain 100-day streak', 
      icon: '⭐', 
      threshold: 100,
      type: 'streak'
    },
  ];

  const isBadgeUnlocked = (badge) => {
    const earned = badges.find(b => b.id === badge.id);
    if (earned) return true;

    if (badge.type === 'goals') {
      return totalGoals >= badge.threshold;
    }
    if (badge.type === 'streak') {
      return streak >= badge.threshold;
    }
    return false;
  };

  const earnedBadges = allBadges.filter(b => isBadgeUnlocked(b));
  const lockedBadges = allBadges.filter(b => !isBadgeUnlocked(b));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Award className="text-yellow-500" size={20} />
          Badge Collection
        </h3>
        <div className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-500/20 dark:to-orange-500/20 rounded-full">
          <span className="text-sm font-bold text-yellow-700 dark:text-yellow-400">
            {earnedBadges.length}/{allBadges.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Collection Progress</span>
          <span>{Math.round((earnedBadges.length / allBadges.length) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(earnedBadges.length / allBadges.length) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
          />
        </div>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-yellow-500" />
            Unlocked
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {earnedBadges.map((badge, idx) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="relative p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-500/10 dark:to-orange-500/10 border-2 border-yellow-200 dark:border-yellow-500/30 rounded-xl hover:scale-105 transition-transform cursor-pointer group"
                title={badge.description}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className="text-xs font-bold text-gray-800 dark:text-white line-clamp-2">
                  {badge.name}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                  {badge.description}
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/50 to-white/0 dark:from-white/0 dark:via-white/10 dark:to-white/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Badges */}
      {lockedBadges.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Lock size={16} className="text-gray-400" />
            Locked
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {lockedBadges.slice(0, 4).map((badge, idx) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: earnedBadges.length * 0.1 + idx * 0.1 }}
                className="relative p-4 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl opacity-50 hover:opacity-75 transition-opacity cursor-not-allowed"
                title={badge.description}
              >
                <div className="relative">
                  <div className="text-3xl grayscale blur-[1px]">{badge.icon}</div>
                  <Lock size={16} className="absolute top-0 right-0 text-gray-400" />
                </div>
                <div className="text-xs font-bold text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">
                  {badge.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 line-clamp-1">
                  {badge.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {earnedBadges.length === 0 && (
        <div className="text-center py-6">
          <div className="text-4xl mb-3 opacity-50">🏆</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Complete goals to unlock badges!
          </p>
        </div>
      )}
    </motion.div>
  );
}