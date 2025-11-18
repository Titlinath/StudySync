import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, Lightbulb, ExternalLink } from 'lucide-react';

export default function WeakAreaList({ areas, loading }) {
  if (loading || !areas) {
    return (
      <div className="bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-2/3"></div>
          <div className="h-32 bg-gray-200 dark:bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return {
          bg: 'bg-red-50 dark:bg-red-500/10',
          border: 'border-red-200 dark:border-red-500/30',
          text: 'text-red-600 dark:text-red-400',
          badge: 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
        };
      case 'medium':
        return {
          bg: 'bg-orange-50 dark:bg-orange-500/10',
          border: 'border-orange-200 dark:border-orange-500/30',
          text: 'text-orange-600 dark:text-orange-400',
          badge: 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400'
        };
      default:
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-500/10',
          border: 'border-yellow-200 dark:border-yellow-500/30',
          text: 'text-yellow-600 dark:text-yellow-400',
          badge: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
        };
    }
  };

  const recommendations = [
    { platform: 'YouTube', icon: '🎥', topics: ['GateSmashers', 'Abdul Bari', 'CodeHelp'] },
    { platform: 'Books', icon: '📚', topics: ['CLRS', 'Operating System Concepts', 'Tanenbaum'] },
    { platform: 'Practice', icon: '💻', topics: ['LeetCode', 'GeeksforGeeks', 'HackerRank'] }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-1">
          <TrendingDown size={18} className="text-red-500" />
          Weak Areas
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Topics needing attention
        </p>
      </div>

      {/* Weak Areas List */}
      {areas.length > 0 ? (
        <div className="space-y-3 mb-6">
          {areas.map((area, idx) => {
            const colors = getSeverityColor(area.severity);
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 ${colors.bg} border-2 ${colors.border} rounded-xl`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-800 dark:text-white">
                        {area.topic}
                      </h4>
                      <span className={`px-2 py-0.5 ${colors.badge} text-xs font-semibold rounded-full uppercase`}>
                        {area.severity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {area.subject}
                    </p>
                  </div>
                  <AlertCircle size={18} className={colors.text} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-0.5">
                      Issue:
                    </span>
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {area.reason}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Lightbulb size={12} className="text-yellow-500 mt-0.5" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {area.suggestion}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
            <span className="text-3xl">🎉</span>
          </div>
          <p className="text-sm font-semibold text-gray-800 dark:text-white mb-1">
            No Weak Areas!
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Keep up the great work!
          </p>
        </div>
      )}

      {/* Learning Resources */}
      <div className="pt-4 border-t border-gray-200 dark:border-white/10">
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <Lightbulb size={14} className="text-yellow-500" />
          Recommended Resources
        </p>
        
        <div className="space-y-2">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{rec.icon}</span>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {rec.platform}
                  </span>
                </div>
                <ExternalLink size={12} className="text-gray-400" />
              </div>
              <div className="flex flex-wrap gap-1">
                {rec.topics.map((topic, topicIdx) => (
                  <span
                    key={topicIdx}
                    className="px-2 py-0.5 bg-white dark:bg-white/10 text-xs text-gray-600 dark:text-gray-400 rounded"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action */}
      <div className="mt-4">
        <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm font-semibold rounded-lg transition-all shadow-md hover:shadow-lg">
          Generate Study Plan for Weak Areas
        </button>
      </div>
    </motion.div>
  );
}