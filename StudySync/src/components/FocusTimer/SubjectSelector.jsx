import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SubjectSelector({ 
  selectedSubject, 
  setSelectedSubject, 
  selectedNote, 
  setSelectedNote 
}) {
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [showSubjects, setShowSubjects] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    // Load subjects from study planner
    const plans = JSON.parse(localStorage.getItem('studysync_plans') || '[]');
    if (plans.length > 0 && plans[0].subjects) {
      const subjectNames = plans[0].subjects.map(s => s.name);
      setSubjects(subjectNames);
    }

    // Load notes
    const savedNotes = JSON.parse(localStorage.getItem('studysync_notes') || '[]');
    setNotes(savedNotes);
  }, []);

  return (
    <div className="space-y-4">
      {/* Subject Selector */}
      <div className="bg-white dark:bg-[#1e1b4b] dark:border dark:border-white/10 rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#A3BFFA] to-[#8AC6D1] dark:from-[#3b82f6] dark:to-[#ec4899] flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">Study Context</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">What are you working on?</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Subject Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSubjects(!showSubjects)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl text-left text-gray-700 dark:text-gray-300 hover:border-[#8AC6D1] dark:hover:border-[#3b82f6] transition-all"
            >
              <span className="font-medium">
                {selectedSubject || 'Select Subject'}
              </span>
              <ChevronDown size={20} className={`transition-transform ${showSubjects ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showSubjects && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 w-full bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-10 max-h-48 overflow-y-auto"
                >
                  <button
                    onClick={() => {
                      setSelectedSubject(null);
                      setShowSubjects(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    None
                  </button>
                  {subjects.map((subject, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedSubject(subject);
                        setShowSubjects(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      {subject}
                    </button>
                  ))}
                  {subjects.length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      No subjects found. Create a study plan first!
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Note Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl text-left text-gray-700 dark:text-gray-300 hover:border-[#8AC6D1] dark:hover:border-[#3b82f6] transition-all"
            >
              <span className="font-medium truncate">
                {selectedNote || 'Select Note'}
              </span>
              <ChevronDown size={20} className={`transition-transform flex-shrink-0 ${showNotes ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showNotes && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 w-full bg-white dark:bg-[#1e1b4b] border-2 border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-10 max-h-48 overflow-y-auto"
                >
                  <button
                    onClick={() => {
                      setSelectedNote(null);
                      setShowNotes(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    None
                  </button>
                  {notes.map((note, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedNote(note.title);
                        setShowNotes(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 transition-colors truncate"
                    >
                      {note.title}
                    </button>
                  ))}
                  {notes.length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      No notes found. Create some notes first!
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick Tip */}
        <div className="mt-4 p-3 bg-gradient-to-r from-[#A3BFFA]/10 to-[#8AC6D1]/10 dark:from-[#3b82f6]/10 dark:to-[#ec4899]/10 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            💡 <strong>Tip:</strong> Select what you're studying for better focus tracking!
          </p>
        </div>
      </div>
    </div>
  );
}