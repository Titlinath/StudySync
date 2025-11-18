import React from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle, CheckCircle } from 'lucide-react';

export default function RevisionPredictionGraph({ data, loading }) {
  if (loading || !data) {
    return (
      <div className="bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-2/3"></div>
          <div className="h-48 bg-gray-200 dark:bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  const maxRetention = 100;
  const warningThreshold = 60;
  const criticalThreshold = 40;

  const getRetentionStatus = (retention) => {
    if (retention >= warningThreshold) return { color: 'text-green-600 dark:text-green-400', status: 'Good' };
    if (retention >= criticalThreshold) return { color: 'text-yellow-600 dark:text-yellow-400', status: 'Warning' };
    return { color: 'text-red-600 dark:text-red-400', status: 'Critical' };
  };

  const currentRetention = data[data.length - 1]?.retention || 100;
  const status = getRetentionStatus(currentRetention);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-1">
            <Brain size={20} className="text-pink-500" />
            Memory Retention Curve
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ebbinghaus forgetting curve prediction
          </p>
        </div>
        
        <div className="text-right">
          <div className={`text-2xl font-bold ${status.color}`}>
            {currentRetention}%
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{status.status}</p>
        </div>
      </div>

      {/* Graph */}
      <div className="relative h-64 mb-6">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[100, 75, 50, 25, 0].map((value, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 w-8">
                {value}%
              </span>
              <div className="flex-1 border-t border-dashed border-gray-300 dark:border-white/10" />
            </div>
          ))}
        </div>

        {/* Warning Zones */}
        <div 
          className="absolute left-10 right-0 bg-yellow-100 dark:bg-yellow-500/10 opacity-30"
          style={{ 
            top: `${(1 - warningThreshold / 100) * 100}%`, 
            height: `${((warningThreshold - criticalThreshold) / 100) * 100}%` 
          }}
        />
        <div 
          className="absolute left-10 right-0 bg-red-100 dark:bg-red-500/10 opacity-30"
          style={{ 
            top: `${(1 - criticalThreshold / 100) * 100}%`, 
            height: `${(criticalThreshold / 100) * 100}%` 
          }}
        />

        {/* Line Graph */}
        <svg className="absolute left-10 right-0 top-0 bottom-0 w-full h-full">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Area under curve */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            d={`
              M 0,${256 * (1 - data[0].retention / 100)}
              ${data.map((point, idx) => {
                const x = (idx / (data.length - 1)) * 100;
                const y = 256 * (1 - point.retention / 100);
                return `L ${x}%,${y}`;
              }).join(' ')}
              L 100%,256
              L 0,256
              Z
            `}
            fill="url(#area-gradient)"
          />

          {/* Line */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            d={`
              M 0,${256 * (1 - data[0].retention / 100)}
              ${data.map((point, idx) => {
                const x = (idx / (data.length - 1)) * 100;
                const y = 256 * (1 - point.retention / 100);
                return `L ${x}%,${y}`;
              }).join(' ')}
            `}
            stroke="url(#line-gradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {data.map((point, idx) => {
            const x = (idx / (data.length - 1)) * 100;
            const y = 256 * (1 - point.retention / 100);
            return (
              <motion.circle
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                cx={`${x}%`}
                cy={y}
                r="5"
                fill="#EC4899"
                className="cursor-pointer hover:r-7 transition-all"
              >
                <title>{point.label}: {point.retention}%</title>
              </motion.circle>
            );
          })}
        </svg>

        {/* X-axis Labels */}
        <div className="absolute bottom-0 left-10 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          {data.map((point, idx) => (
            <span key={idx}>{point.label}</span>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-3">
        <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg border border-blue-200 dark:border-blue-500/30">
          <div className="flex items-start gap-2">
            <CheckCircle size={16} className="text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">
                Next Revision Due
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Review within <strong>3 days</strong> to maintain 80%+ retention
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-lg border border-orange-200 dark:border-orange-500/30">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-orange-600 dark:text-orange-400 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-orange-700 dark:text-orange-400 mb-1">
                Critical Threshold
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                After <strong>14 days</strong>, retention drops below 60%. Schedule revision!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
          📚 Optimal Revision Schedule
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-2 bg-green-50 dark:bg-green-500/10 rounded text-center">
            <p className="text-green-600 dark:text-green-400 font-bold">Day 1</p>
            <p className="text-gray-600 dark:text-gray-400">Quick review</p>
          </div>
          <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded text-center">
            <p className="text-blue-600 dark:text-blue-400 font-bold">Day 7</p>
            <p className="text-gray-600 dark:text-gray-400">Deep revision</p>
          </div>
          <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded text-center">
            <p className="text-purple-600 dark:text-purple-400 font-bold">Day 30</p>
            <p className="text-gray-600 dark:text-gray-400">Full recap</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}