import React from 'react';
import { BookOpen, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NoteSidebar({ subjects, selectedSubject, setSelectedSubject, noteCount }) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-[#1e1b4b] rounded-2xl shadow-lg dark:border dark:border-white/10 p-6 sticky top-24">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#A3BFFA] to-[#8AC6D1] dark:from-[#3b82f6] dark:to-[#ec4899] flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">Subjects</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{noteCount} total notes</p>
          </div>
        </div>

        <div className="space-y-2">
          {subjects.map((subject, index) => {
            const isSelected = selectedSubject === subject;
            return (
              <motion.button
                key={subject}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedSubject(subject)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#ec4899] text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{subject}</span>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full bg-white"
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Your Progress</span>
            <span className="font-semibold text-[#8AC6D1] dark:text-[#3b82f6]">{noteCount} notes</span>
          </div>
        </div>
      </div>
    </div>
  );
}