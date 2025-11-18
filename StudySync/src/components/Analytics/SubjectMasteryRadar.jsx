import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, ChevronRight } from 'lucide-react';

export default function SubjectMasteryRadar({ data, loading }) {
  const [selectedSubject, setSelectedSubject] = useState(null);

  if (loading || !data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 dark:bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  const dimensions = [
    { key: 'understanding', label: 'Understanding', color: 'from-blue-400 to-blue-600' },
    { key: 'practice', label: 'Practice', color: 'from-green-400 to-green-600' },
    { key: 'notesQuality', label: 'Notes Quality', color: 'from-purple-400 to-purple-600' },
    { key: 'revisionFrequency', label: 'Revision', color: 'from-orange-400 to-orange-600' },
    { key: 'confidence', label: 'Confidence', color: 'from-pink-400 to-pink-600' }
  ];

  const avgScores = dimensions.map(dim => ({
    ...dim,
    value: Math.round(data.reduce((sum, s) => sum + s[dim.key], 0) / data.length)
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-1">
          <Brain size={20} className="text-indigo-500" />
          Subject Mastery Dashboard
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Comprehensive skill analysis across subjects
        </p>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {data.map((subject, idx) => {
          const avgMastery = Math.round(
            (subject.understanding + subject.practice + subject.notesQuality + 
             subject.revisionFrequency + subject.confidence) / 5
          );
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedSubject(selectedSubject === idx ? null : idx)}
              className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/5 dark:to-white/10 border-2 border-gray-200 dark:border-white/10 rounded-xl cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-1">
                    {subject.subject}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {avgMastery}% Overall Mastery
                  </p>
                </div>
                <ChevronRight 
                  size={20} 
                  className={`text-gray-400 transition-transform ${
                    selectedSubject === idx ? 'rotate-90' : ''
                  }`}
                />
              </div>

              {/* Progress Ring */}
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="transform -rotate-90 w-24 h-24">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200 dark:text-white/10"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="url(#gradient-mastery)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - avgMastery / 100)}`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient-mastery" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-800 dark:text-white">
                    {avgMastery}%
                  </span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              {selectedSubject === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2 pt-3 border-t border-gray-300 dark:border-white/10"
                >
                  {dimensions.map((dim, dimIdx) => (
                    <div key={dimIdx}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 dark:text-gray-400">{dim.label}</span>
                        <span className="font-semibold text-gray-800 dark:text-white">
                          {subject[dim.key]}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${subject[dim.key]}%` }}
                          transition={{ delay: dimIdx * 0.1 }}
                          className={`h-full bg-gradient-to-r ${dim.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Average Dimensions */}
      <div className="pt-4 border-t border-gray-200 dark:border-white/10">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Average Performance Across All Subjects
        </h4>
        <div className="space-y-2">
          {avgScores.map((dim, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600 dark:text-gray-400">{dim.label}</span>
                <span className="font-semibold text-gray-800 dark:text-white">{dim.value}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${dim.value}%` }}
                  transition={{ delay: idx * 0.1 }}
                  className={`h-full bg-gradient-to-r ${dim.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}