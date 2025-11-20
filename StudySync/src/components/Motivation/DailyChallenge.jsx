import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, CheckCircle, Star, Zap, Trophy } from 'lucide-react';

export default function DailyChallenge({ challenge, onComplete, loading }) {
  const [showCelebration, setShowCelebration] = useState(false);

  if (loading || !challenge) {
    return (
      <div className="bg-white dark:bg-white/10 rounded-2xl p-6 h-48 animate-pulse"></div>
    );
  }

  const handleComplete = () => {
    onComplete();
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className={`bg-white/90 dark:bg-white/10 backdrop-blur-xl border-2 ${
        challenge.completed 
          ? 'border-green-300 dark:border-green-500/50' 
          : 'border-white dark:border-white/20'
      } rounded-2xl p-6 shadow-lg overflow-hidden`}>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 bg-gradient-to-br ${
                challenge.completed 
                  ? 'from-green-400 to-emerald-500' 
                  : 'from-purple-400 to-pink-500'
              } rounded-lg shadow-md`}>
                {challenge.completed ? (
                  <Trophy size={24} className="text-white" />
                ) : (
                  <Target size={24} className="text-white" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {challenge.completed ? 'Challenge Completed!' : 'Today\'s Challenge'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {challenge.completed ? 'Amazing work!' : 'Build your momentum'}
                </p>
              </div>
            </div>

            {/* XP Badge */}
            <div className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-500/20 rounded-full">
              <Star size={16} className="text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                +{challenge.xp} XP
              </span>
            </div>
          </div>

          {/* Challenge Content */}
          <div className={`p-4 ${
            challenge.completed 
              ? 'bg-green-50 dark:bg-green-500/10' 
              : 'bg-purple-50 dark:bg-purple-500/10'
          } rounded-xl mb-4`}>
            <div className="flex items-start gap-3">
              <span className="text-3xl">{challenge.icon}</span>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                  {challenge.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {challenge.description}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {!challenge.completed ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleComplete}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} />
              Mark as Complete
            </motion.button>
          ) : (
            <div className="flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-semibold shadow-lg">
              <Trophy size={20} />
              Challenge Completed!
            </div>
          )}
        </div>

        {/* Celebration Animation */}
        <AnimatePresence>
          {showCelebration && (
            <>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: '50%', 
                    y: '50%', 
                    scale: 0,
                    opacity: 1 
                  }}
                  animate={{ 
                    x: `${50 + (Math.random() - 0.5) * 200}%`,
                    y: `${50 + (Math.random() - 0.5) * 200}%`,
                    scale: Math.random() * 2 + 1,
                    opacity: 0
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute pointer-events-none"
                >
                  <span className="text-2xl">
                    {['🎉', '⭐', '🏆', '✨', '🎊'][i % 5]}
                  </span>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Motivational Message */}
      {challenge.completed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 border-2 border-green-200 dark:border-green-500/30 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <Zap size={20} className="text-green-600 dark:text-green-400" />
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              You kept your promise to yourself — that's HUGE! 💪
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}