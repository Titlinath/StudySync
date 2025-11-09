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

  // Get difficulty badge styling
  const getDifficultyBadge = (difficulty) => {
    if (difficulty <= 3) {
      return { text: 'Easy', color: 'bg-green-100 text-green-700' };
    }
    if (difficulty <= 7) {
      return { text: 'Medium', color: 'bg-yellow-100 text-yellow-700' };
    }
    return { text: 'Hard', color: 'bg-red-100 text-red-700' };
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Your Subjects ({subjects.length})
      </h2>
      
      <div className="space-y-3">
        {subjects.map((subject, index) => {
          const badge = getDifficultyBadge(subject.difficulty);
          
          return (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                    {badge.text}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {subject.chapters || 'No topics specified'} • {subject.hoursNeeded || 0}h needed • Due: {new Date(subject.targetDate).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditSubject(index)}
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit subject"
                >
                  <Edit size={18} className="text-[#8AC6D1]" />
                </button>
                <button
                  onClick={() => handleDeleteSubject(index)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete subject"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Generate Plan Button */}
      {!generatedPlan && (
        <button
          onClick={generatePlan}
          className="w-full mt-6 p-4 bg-gradient-to-r from-[#FF9A8B] to-[#FFD6A5] text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
        >
          <Zap size={24} />
          Generate Smart Study Plan
        </button>
      )}
    </div>
  );
}