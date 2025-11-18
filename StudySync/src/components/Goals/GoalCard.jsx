import React, { useState } from 'react';
import { Calendar, Edit3, Trash2, Trophy, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import MilestoneTracker from './MilestoneTracker';

export default function GoalCard({ goal, index, onEdit, onDelete, onToggleMilestone }) {
  const [showMilestones, setShowMilestones] = useState(false);

  const getDaysUntilDeadline = () => {
    const deadline = new Date(goal.deadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilDeadline();
  const isOverdue = daysLeft < 0;
  const isUrgent = daysLeft >= 0 && daysLeft <= 2;

  const getUrgencyColor = () => {
    if (goal.isCompleted) return 'from-green-400 to-green-600';
    if (isOverdue) return 'from-red-400 to-red-600';
    if (isUrgent) return 'from-orange-400 to-orange-600';
    return 'from-[#8AC6D1] to-[#A3BFFA]';
  };

  const getUrgencyBg = () => {
    if (goal.isCompleted) return 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30';
    if (isOverdue) return 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30';
    if (isUrgent) return 'bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30';
    return 'bg-white dark:bg-[#1e1b4b] border-gray-200 dark:border-white/10';
  };

  const getDifficultyLabel = () => {
    if (goal.difficulty <= 3) return { text: 'Easy', color: 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' };
    if (goal.difficulty <= 7) return { text: 'Medium', color: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' };
    return { text: 'Hard', color: 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400' };
  };

  const difficulty = getDifficultyLabel();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      className={`${getUrgencyBg()} border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all group relative overflow-hidden ${
        goal.isCompleted ? 'opacity-75' : ''
      }`}
    >
      {goal.isCompleted && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full text-sm font-semibold shadow-lg">
            <Trophy size={16} />
            Completed
          </div>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="relative">
          <svg width="80" height="80" className="transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="34"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className="text-gray-200 dark:text-white/10"
            />
            <circle
              cx="40"
              cy="40"
              r="34"
              stroke="url(#progress-gradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 34}`}
              strokeDashoffset={`${2 * Math.PI * 34 * (1 - goal.progress / 100)}`}
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8AC6D1" />
                <stop offset="100%" stopColor="#A3BFFA" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {goal.progress}%
            </span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 pr-16">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {goal.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {goal.subject && (
                  <span className="px-2 py-1 bg-gradient-to-r from-[#A3BFFA]/20 to-[#8AC6D1]/20 dark:from-[#3b82f6]/20 dark:to-[#ec4899]/20 text-[#8AC6D1] dark:text-[#3b82f6] text-xs font-semibold rounded-full">
                    {goal.subject}
                  </span>
                )}
                <span className={`px-2 py-1 ${difficulty.color} text-xs font-semibold rounded-full`}>
                  {difficulty.text}
                </span>
              </div>
            </div>
          </div>

          {goal.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {goal.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm mb-4">
            <div className="flex items-center gap-1">
              <Calendar size={16} className={`${
                isOverdue ? 'text-red-500' : isUrgent ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'
              }`} />
              <span className={`${
                isOverdue ? 'text-red-600 dark:text-red-400 font-semibold' : 
                isUrgent ? 'text-orange-600 dark:text-orange-400 font-semibold' : 
                'text-gray-600 dark:text-gray-400'
              }`}>
                {isOverdue ? `${Math.abs(daysLeft)} days overdue` : 
                 isUrgent ? `${daysLeft} days left!` : 
                 `${daysLeft} days left`}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Clock size={16} />
              <span>{new Date(goal.deadline).toLocaleDateString()}</span>
            </div>
          </div>

          <button
            onClick={() => setShowMilestones(!showMilestones)}
            className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors mb-3"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {goal.milestones.filter(m => m.isDone).length} / {goal.milestones.length} milestones completed
            </span>
            <TrendingUp size={16} className="text-[#8AC6D1] dark:text-[#3b82f6]" />
          </button>

          {showMilestones && (
            <MilestoneTracker
              milestones={goal.milestones}
              goalId={goal.id}
              onToggle={onToggleMilestone}
            />
          )}

          <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
            >
              <Edit3 size={16} />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/30 transition-all"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}