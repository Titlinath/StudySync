import React from 'react';
import { motion } from 'framer-motion';

export default function CircularTimer({ timeLeft, totalTime, isRunning, timerMode, getModeColor }) {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = ((totalTime - timeLeft) / totalTime) * circumference;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getModeLabel = () => {
    switch(timerMode) {
      case 'focus': return 'Focus Time';
      case 'shortBreak': return 'Short Break';
      case 'longBreak': return 'Long Break';
      default: return 'Focus Time';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* SVG Circular Progress */}
      <div className="relative">
        <svg width="280" height="280" className="transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-gray-200 dark:text-white/10"
          />
          
          {/* Progress Circle */}
          <motion.circle
            cx="140"
            cy="140"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-1000 ease-linear"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(138, 198, 209, 0.5))'
            }}
          />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8AC6D1" className="dark:stop-color-[#3b82f6]" />
              <stop offset="100%" stopColor="#A3BFFA" className="dark:stop-color-[#ec4899]" />
            </linearGradient>
          </defs>
        </svg>

        {/* Timer Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            animate={{ scale: isRunning ? [1, 1.02, 1] : 1 }}
            transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
            className="text-center"
          >
            <div className={`text-6xl font-bold bg-gradient-to-r ${getModeColor()} bg-clip-text text-transparent mb-2`}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {getModeLabel()}
            </div>
          </motion.div>
        </div>

        {/* Pulsing Ring Effect when Running */}
        {isRunning && (
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-r ${getModeColor()} opacity-20`}
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>

      {/* Progress Percentage */}
      <div className="mt-4 text-center">
        <span className="text-2xl font-bold text-gray-800 dark:text-white">
          {Math.round(((totalTime - timeLeft) / totalTime) * 100)}%
        </span>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Complete</p>
      </div>
    </div>
  );
}