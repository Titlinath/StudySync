import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FocusModeOverlay({ timeLeft, timerMode, onDisable }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getModeText = () => {
    switch(timerMode) {
      case 'focus': return 'Stay Focused';
      case 'shortBreak': return 'Take a Break';
      case 'longBreak': return 'Rest & Recharge';
      default: return 'Focus Time';
    }
  };

  const getGradient = () => {
    switch(timerMode) {
      case 'focus': return 'from-[#8AC6D1] via-[#A3BFFA] to-[#E9F0FF]';
      case 'shortBreak': return 'from-[#FFD6A5] via-[#FF9A8B] to-[#FFE9D6]';
      case 'longBreak': return 'from-[#DFF6F0] via-[#8AC6D1] to-[#E9F0FF]';
      default: return 'from-[#8AC6D1] via-[#A3BFFA] to-[#E9F0FF]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 bg-gradient-to-br ${getGradient()} dark:from-[#0f172a] dark:via-[#1e1b4b] dark:to-[#312e81] flex flex-col items-center justify-center`}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Close Button */}
      <button
        onClick={onDisable}
        className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all"
      >
        <X size={24} className="text-white" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Timer Display */}
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8"
        >
          <div className="text-9xl font-bold text-white mb-4 drop-shadow-2xl">
            {formatTime(timeLeft)}
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="space-y-4"
        >
          <h2 className="text-4xl font-bold text-white drop-shadow-lg">
            {getModeText()}
          </h2>
          <p className="text-xl text-white/80 max-w-md mx-auto">
            {timerMode === 'focus' 
              ? 'Breathe deeply. Focus gently. You\'re doing great.' 
              : 'Relax your mind. You\'ve earned this break.'}
          </p>
        </motion.div>

        {/* Breathing Circle */}
        {timerMode === 'focus' && (
          <motion.div
            className="mt-16 w-32 h-32 mx-auto rounded-full bg-white/20 backdrop-blur-md"
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-8 text-center">
        <p className="text-white/60 text-sm">
          Press ESC or click × to exit focus mode
        </p>
      </div>
    </motion.div>
  );
}