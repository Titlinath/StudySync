import React, { useState } from 'react';
import { Plus, Clock } from 'lucide-react';

export default function SubjectInputPanel({ 
  subjects, 
  setSubjects, 
  availableHoursPerDay, 
  setAvailableHoursPerDay 
}) {
  const [currentSubject, setCurrentSubject] = useState({
    name: '',
    chapters: '',
    difficulty: 5,
    targetDate: '',
    hoursNeeded: 0
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Add or update subject
  const handleAddSubject = () => {
    if (!currentSubject.name || !currentSubject.targetDate) {
      alert('Please fill in subject name and target date');
      return;
    }

    if (editingIndex !== null) {
      const updated = [...subjects];
      updated[editingIndex] = currentSubject;
      setSubjects(updated);
      setEditingIndex(null);
    } else {
      setSubjects([...subjects, currentSubject]);
    }

    // Reset form
    setCurrentSubject({
      name: '',
      chapters: '',
      difficulty: 5,
      targetDate: '',
      hoursNeeded: 0
    });
  };

  return (
    <div className="space-y-6">
      {/* Add Subject Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Plus size={20} className="text-[#8AC6D1]" />
          Add Subject
        </h2>
        
        <div className="space-y-4">
          {/* Subject Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Name
            </label>
            <input
              type="text"
              value={currentSubject.name}
              onChange={(e) => setCurrentSubject({...currentSubject, name: e.target.value})}
              placeholder="e.g., Data Structures"
              className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#8AC6D1] focus:ring-2 focus:ring-[#8AC6D1] focus:ring-opacity-20 transition-all outline-none"
            />
          </div>

          {/* Topics/Chapters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topics/Chapters
            </label>
            <input
              type="text"
              value={currentSubject.chapters}
              onChange={(e) => setCurrentSubject({...currentSubject, chapters: e.target.value})}
              placeholder="Trees, Graphs, Sorting (comma-separated)"
              className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#8AC6D1] focus:ring-2 focus:ring-[#8AC6D1] focus:ring-opacity-20 transition-all outline-none"
            />
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level: {currentSubject.difficulty}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={currentSubject.difficulty}
              onChange={(e) => setCurrentSubject({...currentSubject, difficulty: parseInt(e.target.value)})}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8AC6D1]"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Easy</span>
              <span>Hard</span>
            </div>
          </div>

          {/* Estimated Hours Needed */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Hours Needed
            </label>
            <input
              type="number"
              value={currentSubject.hoursNeeded}
              onChange={(e) => setCurrentSubject({...currentSubject, hoursNeeded: parseInt(e.target.value) || 0})}
              placeholder="10"
              min="0"
              className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#8AC6D1] focus:ring-2 focus:ring-[#8AC6D1] focus:ring-opacity-20 transition-all outline-none"
            />
          </div>

          {/* Target Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Date
            </label>
            <input
              type="date"
              value={currentSubject.targetDate}
              onChange={(e) => setCurrentSubject({...currentSubject, targetDate: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#8AC6D1] focus:ring-2 focus:ring-[#8AC6D1] focus:ring-opacity-20 transition-all outline-none"
            />
          </div>

          {/* Add Subject Button */}
          <button
            onClick={handleAddSubject}
            className="w-full p-3 bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            {editingIndex !== null ? 'Update Subject' : 'Add Subject'}
          </button>
        </div>
      </div>

      {/* Available Time Setup */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Clock size={20} className="text-[#FF9A8B]" />
          Daily Study Time
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hours per day: {availableHoursPerDay}h
          </label>
          <input
            type="range"
            min="1"
            max="12"
            value={availableHoursPerDay}
            onChange={(e) => setAvailableHoursPerDay(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF9A8B]"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1h</span>
            <span>12h</span>
          </div>
          
          {/* Visual indicator */}
          <div className="mt-4 p-3 bg-gradient-to-r from-[#FFE9D6] to-[#FFD6A5] rounded-lg">
            <p className="text-sm text-gray-700 text-center font-medium">
              You're committing to {availableHoursPerDay} {availableHoursPerDay === 1 ? 'hour' : 'hours'} of focused study daily 🎯
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}