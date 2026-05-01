import React from 'react';
import { Calendar, BookOpen, Target, Zap } from 'lucide-react';

export default function EmptyState() {
  const features = [
    {
      icon: BookOpen,
      title: 'Add Subjects',
      description: 'List all subjects you need to study',
      color: 'text-[#8AC6D1]'
    },
    {
      icon: Target,
      title: 'Set Goals',
      description: 'Define difficulty and target dates',
      color: 'text-[#FF9A8B]'
    },
    {
      icon: Zap,
      title: 'Generate Plan',
      description: 'AI creates your optimized schedule',
      color: 'text-[#A3BFFA]'
    }
  ];

  return (
    <div className="text-center">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] dark:from-[#3b82f6]/30 dark:to-[#8b5cf6]/30 dark:border dark:border-blue-500/30 flex items-center justify-center animate-pulse">
        <Calendar size={48} className="text-white dark:text-blue-300" />
      </div>

      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
        Start Planning Your Success
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
        Add your subjects, set your goals, and let our AI create a personalized study schedule optimized for your success.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-white/5 dark:to-white/10 dark:border dark:border-white/10 rounded-xl p-6 hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:scale-105 transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-50 to-white dark:from-white/10 dark:to-white/5 dark:border dark:border-white/20 flex items-center justify-center mb-3">
                <feature.icon size={24} className={feature.color} />
              </div>
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2">STEP {index + 1}</span>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#E9F0FF] to-[#DFF6F0] dark:from-blue-500/10 dark:to-cyan-500/10 dark:border dark:border-blue-500/20 rounded-xl p-6 mb-8">
        <p className="text-gray-700 dark:text-gray-300 font-medium mb-3">Ready to transform your study routine?</p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="w-2 h-2 rounded-full bg-[#8AC6D1] dark:bg-blue-400 animate-pulse"></span>
          <span>Start by adding your first subject using the panel on the left</span>
          <span className="text-2xl">👈</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        <div className="bg-white/50 dark:bg-white/5 dark:border dark:border-white/10 rounded-lg p-4 hover:dark:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h5 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">Pro Tip</h5>
              <p className="text-xs text-gray-600 dark:text-gray-400">Be realistic with your difficulty ratings and time estimates for the best results.</p>
            </div>
          </div>
        </div>
        <div className="bg-white/50 dark:bg-white/5 dark:border dark:border-white/10 rounded-lg p-4 hover:dark:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h5 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">Best Practice</h5>
              <p className="text-xs text-gray-600 dark:text-gray-400">Include all topics/chapters for comprehensive coverage and better scheduling.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}