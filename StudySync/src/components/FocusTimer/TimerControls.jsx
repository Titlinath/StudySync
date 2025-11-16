import React from 'react';
import { Play, Pause, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TimerControls({ 
  isRunning, 
  onStartPause, 
  onReset, 
  timerMode,
  focusModeEnabled,
  setFocusModeEnabled
}) {
  const getButtonColor = () => {
    switch(timerMode) {
      case 'focus': return 'from-[#8AC6D1] to-[#A3BFFA]';
      case 'shortBreak': return 'from-[#FFD6A5] to-[#FF9A8B]';
      case 'longBreak': return 'from-[#DFF6F0] to-[#8AC6D1]';
      default: return 'from-[#8AC6D1] to-[#A3BFFA]';
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {/* Main Control Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStartPause}
        className={`flex items-center justify-center gap-3 px-12 py-4 bg-gradient-to-r ${getButtonColor()} text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl dark:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all`}
      >
        {isRunning ? (
          <>
            <Pause size={24} fill="white" />
            Pause
          </>
        ) : (
          <>
            <Play size={24} fill="white" />
            Start
          </>
        )}
      </motion.button>

      {/* Secondary Controls */}
      <div className="flex items-center gap-3">
        {/* Reset Button */}
        <button
          onClick={onReset}
          disabled={isRunning}
          className={`flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-white/20 transition-all ${
            isRunning ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <RotateCcw size={18} />
          Reset
        </button>

        {/* Focus Mode Toggle */}
        <button
          onClick={() => setFocusModeEnabled(!focusModeEnabled)}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all ${
            focusModeEnabled
              ? 'bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] text-white shadow-lg'
              : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'
          }`}
        >
          {focusModeEnabled ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          Focus Mode
        </button>
      </div>
    </div>
  );
}