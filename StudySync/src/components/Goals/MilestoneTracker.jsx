import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MilestoneTracker({ milestones, goalId, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-2 mb-3"
    >
      {milestones.map((milestone, idx) => (
        <motion.button
          key={milestone.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          onClick={() => onToggle(goalId, milestone.id)}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
            milestone.isDone
              ? 'bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30'
              : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#8AC6D1] dark:hover:border-[#3b82f6]'
          }`}
        >
          {milestone.isDone ? (
            <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
          ) : (
            <Circle size={20} className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
          )}
          <span className={`text-sm font-medium text-left ${
            milestone.isDone
              ? 'text-green-700 dark:text-green-400 line-through'
              : 'text-gray-700 dark:text-gray-300'
          }`}>
            {milestone.title}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}