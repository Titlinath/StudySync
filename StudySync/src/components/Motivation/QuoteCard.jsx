import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Zap, Heart, Target } from 'lucide-react';

export default function QuoteCard({ quote, loading }) {
  if (loading || !quote) {
    return (
      <div className="mb-8 animate-pulse">
        <div className="bg-white dark:bg-white/10 rounded-3xl p-8 h-64"></div>
      </div>
    );
  }

  const getModeIcon = () => {
    switch (quote.mode) {
      case 'focus':
        return <Zap size={24} className="text-orange-500" />;
      case 'calm':
        return <Heart size={24} className="text-pink-500" />;
      case 'accountability':
        return <Target size={24} className="text-green-500" />;
      default:
        return <Quote size={24} className="text-purple-500" />;
    }
  };

  const getModeLabel = () => {
    switch (quote.mode) {
      case 'focus':
        return { text: 'Focus Mode', bg: 'bg-orange-100 dark:bg-orange-500/20', text: 'text-orange-600 dark:text-orange-400' };
      case 'calm':
        return { text: 'Calm Mode', bg: 'bg-pink-100 dark:bg-pink-500/20', text: 'text-pink-600 dark:text-pink-400' };
      case 'accountability':
        return { text: 'Accountability Mode', bg: 'bg-green-100 dark:bg-green-500/20', text: 'text-green-600 dark:text-green-400' };
      default:
        return { text: 'Daily Wisdom', bg: 'bg-purple-100 dark:bg-purple-500/20', text: 'text-purple-600 dark:text-purple-400' };
    }
  };

  const modeLabel = getModeLabel();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="mb-8 relative"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${quote.color} rounded-3xl blur-2xl opacity-20`}></div>
      
      <div className={`relative bg-white/90 dark:bg-white/10 backdrop-blur-xl border-2 border-white dark:border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl`}>
        {/* Mode Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className={`flex items-center gap-2 px-4 py-2 ${modeLabel.bg} rounded-full`}>
            {getModeIcon()}
            <span className={`text-sm font-semibold ${modeLabel.text}`}>
              {modeLabel.text}
            </span>
          </div>
          
          <Quote size={32} className="text-gray-300 dark:text-white/20" />
        </div>

        {/* Quote Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white leading-relaxed mb-6 text-center">
            "{quote.text}"
          </p>
        </motion.div>

        {/* Animated Underline */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className={`h-1 bg-gradient-to-r ${quote.color} rounded-full max-w-md mx-auto`}
        />

        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-br from-pink-300 to-purple-300 dark:from-pink-500/30 dark:to-purple-500/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 right-4 w-24 h-24 bg-gradient-to-br from-blue-300 to-cyan-300 dark:from-blue-500/30 dark:to-cyan-500/30 rounded-full blur-2xl"></div>
      </div>
    </motion.div>
  );
}