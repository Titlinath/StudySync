import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Activity, Sparkles } from 'lucide-react';

export default function CommunityFeed({ feed, loading }) {
  const [visibleFeed, setVisibleFeed] = useState([]);

  useEffect(() => {
    if (feed && feed.length > 0) {
      // Show items one by one
      feed.forEach((item, idx) => {
        setTimeout(() => {
          setVisibleFeed(prev => [...prev, item]);
        }, idx * 300);
      });
    }
  }, [feed]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-white/10 rounded-2xl p-6 h-96 animate-pulse"></div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/90 dark:bg-white/10 backdrop-blur-xl border-2 border-white dark:border-white/20 rounded-2xl p-6 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-1">
            <Users size={20} className="text-blue-500" />
            Community Vibes
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            You're not alone in this journey
          </p>
        </div>
        <Activity size={20} className="text-green-500 animate-pulse" />
      </div>

      {/* Feed Items */}
      <div className="space-y-3">
        <AnimatePresence>
          {visibleFeed.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: idx * 0.1 }}
              className="group p-3 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-white/5 dark:to-blue-500/5 border border-gray-200 dark:border-white/10 rounded-lg hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-lg shadow-md">
                  {item.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-white mb-1">
                    {item.text}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.time}
                  </p>
                </div>

                {/* Pulse Indicator */}
                {item.time === 'now' && (
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Join Study Room Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
      >
        <Users size={18} />
        Join Live Study Room
      </motion.button>

      {/* Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
              {Math.floor(Math.random() * 50) + 10}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Studying Now
            </p>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              {Math.floor(Math.random() * 200) + 50}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Goals Today
            </p>
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 p-3 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-500/10 dark:to-purple-500/10 rounded-lg border border-pink-200 dark:border-pink-500/30"
      >
        <div className="flex items-start gap-2">
          <Sparkles size={16} className="text-pink-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-700 dark:text-gray-300 italic">
            "Together we rise. Your consistency inspires others."
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}