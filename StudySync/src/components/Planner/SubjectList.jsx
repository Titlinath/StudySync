import React, { useState } from 'react';
import { Edit, Trash2, Zap } from 'lucide-react';

export default function SubjectList({ subjects, setSubjects, generatePlan, generatedPlan }) {
  const [editingIndex, setEditingIndex] = useState(null);

  // Delete subject
  const handleDeleteSubject = (index) => {
    const confirmed = window.confirm('Are you sure you want to delete this subject?');
    if (confirmed) {
      setSubjects(subjects.filter((_, i) => i !== index));
    }
  };

  // Edit subject (you'll need to pass this to SubjectInputPanel)
  const handleEditSubject = (index) => {
    // This would trigger edit mode in SubjectInputPanel
    // You might need to lift this state up or use context
    alert('Edit functionality: Pass this index to SubjectInputPanel to populate form');
  };

  const getDifficultyBadge = (difficulty) => {
    if (difficulty <= 3) return { text: 'Easy', color: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300' };
    if (difficulty <= 7) return { text: 'Medium', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300' };
    return { text: 'Hard', color: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300' };
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Your Subjects ({subjects.length})
      </h2>
      
      <div className="space-y-3">
        {subjects.map((subject, index) => {
          const badge = getDifficultyBadge(subject.difficulty);
          return (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white dark:from-white/5 dark:to-white/10 border border-gray-100 dark:border-white/10 hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-200"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{subject.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>{badge.text}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {subject.chapters || 'No topics specified'} • {subject.hoursNeeded || 0}h needed • Due: {new Date(subject.targetDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditSubject(index)}
                  className="p-2 hover:bg-blue-50 dark:hover:bg-blue-500/20 rounded-lg transition-colors"
                >
                  <Edit size={18} className="text-[#8AC6D1] dark:text-blue-400" />
                </button>
                <button
                  onClick={() => handleDeleteSubject(index)}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 size={18} className="text-red-500 dark:text-red-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {!generatedPlan && (
        <button
          onClick={generatePlan}
          className="w-full mt-6 p-4 bg-gradient-to-r from-[#FF9A8B] to-[#FFD6A5] dark:from-[#ec4899] dark:to-[#f97316] text-white rounded-xl font-semibold text-lg hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Zap size={24} />
          Generate Smart Study Plan
        </button>
      )}
    </div>
  );
}