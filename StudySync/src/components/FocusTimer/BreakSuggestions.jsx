import React from 'react';
import { Coffee, Eye, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BreakSuggestions({ timerMode, selectedNote }) {
  const suggestions = timerMode === 'shortBreak' 
    ? [
        {
          icon: Eye,
          title: '20-20-20 Rule',
          description: 'Look at something 20 feet away for 20 seconds',
          color: 'from-[#A3BFFA] to-[#8AC6D1]',
          duration: '20s'
        },
        {
          icon: Coffee,
          title: 'Hydrate',
          description: 'Drink a glass of water',
          color: 'from-[#DFF6F0] to-[#8AC6D1]',
          duration: '1m'
        },
        {
          icon: Sparkles,
          title: 'Stretch',
          description: 'Stand up and do light stretches',
          color: 'from-[#FFD6A5] to-[#FF9A8B]',
          duration: '2m'
        }
      ]
    : [
        {
          icon: Coffee,
          title: 'Take a Walk',
          description: 'Go outside for fresh air',
          color: 'from-[#A3BFFA] to-[#8AC6D1]',
          duration: '10m'
        },
        {
          icon: BookOpen,
          title: 'Review Notes',
          description: selectedNote ? `Review "${selectedNote}"` : 'Review your recent notes',
          color: 'from-[#FFD6A5] to-[#FF9A8B]',
          duration: '5m'
        },
        {
          icon: Sparkles,
          title: 'Meditate',
          description: 'Deep breathing exercises',
          color: 'from-[#E8DFF5] to-[#A3BFFA]',
          duration: '5m'
        }
      ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 bg-white dark:bg-[#1e1b4b] dark:border dark:border-white/10 rounded-2xl shadow-lg p-6"
    >
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <Sparkles size={20} className="text-[#8AC6D1] dark:text-[#3b82f6]" />
        Smart Break Suggestions
      </h3>

      <div className="grid md:grid-cols-3 gap-4">
        {suggestions.map((suggestion, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-gradient-to-br from-gray-50 to-white dark:from-white/5 dark:to-transparent border border-gray-200 dark:border-white/10 rounded-xl p-4 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${suggestion.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <suggestion.icon size={24} className="text-white" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800 dark:text-white">{suggestion.title}</h4>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/10 px-2 py-1 rounded-full">
                {suggestion.duration}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{suggestion.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}