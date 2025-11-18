import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, TrendingUp } from 'lucide-react';

export default function NoteQualityAnalysis({ data, loading }) {
  if (loading || !data) {
    return (
      <div className="bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-2/3"></div>
          <div className="h-32 bg-gray-200 dark:bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  const metrics = [
    { 
      label: 'Depth', 
      value: data.averageDepth, 
      color: 'from-blue-400 to-blue-600',
      icon: '📚'
    },
    { 
      label: 'Clarity', 
      value: data.averageClarity, 
      color: 'from-green-400 to-green-600',
      icon: '✨'
    },
    { 
      label: 'Structure', 
      value: data.averageStructure, 
      color: 'from-purple-400 to-purple-600',
      icon: '🏗️'
    }
  ];

  const overallScore = Math.round(
    (data.averageDepth + data.averageClarity + data.averageStructure) / 3
  );

  const getGrade = (score) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-600 dark:text-green-400' };
    if (score >= 80) return { grade: 'A', color: 'text-green-600 dark:text-green-400' };
    if (score >= 70) return { grade: 'B', color: 'text-blue-600 dark:text-blue-400' };
    if (score >= 60) return { grade: 'C', color: 'text-yellow-600 dark:text-yellow-400' };
    return { grade: 'D', color: 'text-red-600 dark:text-red-400' };
  };

  const grade = getGrade(overallScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-1">
          <FileText size={18} className="text-yellow-500" />
          Notes Intelligence
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          AI-powered quality analysis
        </p>
      </div>

      {/* Overall Score */}
      <div className="relative mb-6">
        <div className="w-32 h-32 mx-auto">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-gray-200 dark:text-white/10"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="url(#gradient-quality)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - overallScore / 100)}`}
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient-quality" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${grade.color}`}>
              {grade.grade}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {overallScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3 mb-6">
        {metrics.map((metric, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">{metric.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {metric.label}
                </span>
              </div>
              <span className="text-sm font-bold text-gray-800 dark:text-white">
                {metric.value}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metric.value}%` }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`h-full bg-gradient-to-r ${metric.color}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Notes</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {data.totalNotes}
          </p>
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Analyzed</p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">
            {data.analyzedNotes}
          </p>
        </div>
      </div>

      {/* Top Note */}
      {data.topNote && (
        <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-500/10 dark:to-orange-500/10 border-2 border-yellow-200 dark:border-yellow-500/30 rounded-xl">
          <div className="flex items-start gap-2 mb-2">
            <Sparkles size={16} className="text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 mb-1">
                🏆 Highest Quality Note
              </p>
              <p className="text-sm font-bold text-gray-800 dark:text-white mb-2">
                {data.topNote.title}
              </p>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 bg-white/50 dark:bg-white/10 rounded">
                  Depth: {data.topNote.depth}%
                </span>
                <span className="px-2 py-1 bg-white/50 dark:bg-white/10 rounded">
                  Clarity: {data.topNote.clarity}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Insight */}
      <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg border border-purple-200 dark:border-purple-500/30">
        <div className="flex items-start gap-2">
          <TrendingUp size={16} className="text-purple-600 dark:text-purple-400 mt-0.5" />
          <p className="text-xs text-gray-700 dark:text-gray-300">
            {overallScore >= 80 
              ? 'Excellent! Your notes are well-structured and comprehensive.' 
              : overallScore >= 60 
              ? 'Good progress! Add more examples to improve depth.' 
              : 'Consider restructuring notes with clear headings and examples.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}