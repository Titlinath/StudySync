import React, { useState, useEffect } from 'react';
import { Lightbulb, Sparkles, RefreshCw } from 'lucide-react';

export default function MotivationBox() {
  const [currentTip, setCurrentTip] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const motivationalTips = [
    {
      icon: '💡',
      title: 'AI Optimization Tip',
      message: 'Your plan prioritizes harder subjects early in the week when focus is highest. Remember to take 15-minute breaks every 2 hours for optimal retention!'
    },
    {
      icon: '🎯',
      title: 'Smart Strategy',
      message: 'Studies show that spaced repetition is 200% more effective than cramming. Your schedule is designed with optimal intervals for long-term memory.'
    },
    {
      icon: '🧠',
      title: 'Brain Science',
      message: 'Your brain needs variety! Switching between subjects prevents mental fatigue and keeps you engaged throughout your study sessions.'
    },
    {
      icon: '⚡',
      title: 'Peak Performance',
      message: 'The first 2 hours of your study session are most productive. Tackle the challenging topics first while your mind is fresh!'
    },
    {
      icon: '🌟',
      title: 'Progress Matters',
      message: 'Consistency beats intensity! Even 30 minutes of focused study daily is better than 5 hours once a week. Trust the process!'
    },
    {
      icon: '💪',
      title: 'Stay Strong',
      message: 'Every expert was once a beginner. Your dedication today builds the expertise of tomorrow. Keep pushing forward!'
    }
  ];

  // Auto-rotate tips every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextTip();
    }, 10000);

    return () => clearInterval(interval);
  }, [currentTip]);

  const handleNextTip = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTip((prev) => (prev + 1) % motivationalTips.length);
      setIsAnimating(false);
    }, 300);
  };

  const tip = motivationalTips[currentTip];

  return (
    <div className="bg-gradient-to-r from-[#E8DFF5] to-[#DFF6F0] dark:from-purple-500/10 dark:to-cyan-500/10 dark:border dark:border-purple-500/20 dark:backdrop-blur-sm rounded-2xl p-6 shadow-lg dark:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(139,92,246,0.25)] transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-full bg-white dark:bg-white/10 dark:border dark:border-white/20 flex items-center justify-center flex-shrink-0 transition-transform ${isAnimating ? 'scale-90' : 'scale-100'}`}>
          <span className="text-3xl">{tip.icon}</span>
        </div>
        <div className={`flex-1 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800 dark:text-white text-lg flex items-center gap-2">
              <Sparkles size={18} className="text-[#A3BFFA] dark:text-purple-400" />
              {tip.title}
            </h3>
            <button
              onClick={handleNextTip}
              className="p-2 hover:bg-white/50 dark:hover:bg-white/10 rounded-lg transition-all"
            >
              <RefreshCw size={18} className="text-gray-600 dark:text-gray-300 hover:text-[#8AC6D1] dark:hover:text-purple-400 transition-colors" />
            </button>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{tip.message}</p>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {motivationalTips.map((_, index) => (
          <button
            key={index}
            onClick={() => { setIsAnimating(true); setTimeout(() => { setCurrentTip(index); setIsAnimating(false); }, 300); }}
            className={`h-2 rounded-full transition-all ${index === currentTip ? 'w-8 bg-[#8AC6D1] dark:bg-purple-400' : 'w-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}