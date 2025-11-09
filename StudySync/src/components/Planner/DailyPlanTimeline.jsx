import React, { useState } from 'react';
import { CheckCircle, Circle, Clock, RefreshCw } from 'lucide-react';

export default function DailyPlanTimeline({ generatedPlan, generatePlan }) {
  const [completedSessions, setCompletedSessions] = useState({});

  // Toggle session completion
  const toggleSessionComplete = (dayIndex, sessionIndex) => {
    const key = `${dayIndex}-${sessionIndex}`;
    setCompletedSessions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Get difficulty stars
  const getDifficultyStars = (difficulty) => {
    if (difficulty <= 3) return '⭐';
    if (difficulty <= 7) return '⭐⭐';
    return '⭐⭐⭐';
  };

  // Calculate completion percentage
  const calculateProgress = () => {
    const totalSessions = generatedPlan.dailyPlan.reduce(
      (sum, day) => sum + day.sessions.length,
      0
    );
    const completedCount = Object.values(completedSessions).filter(Boolean).length;
    return totalSessions > 0 ? Math.round((completedCount / totalSessions) * 100) : 0;
  };

  const progress = calculateProgress();

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Your Weekly Study Schedule</h2>
            <p className="text-sm text-gray-600 mt-1">Track your progress and stay on target</p>
          </div>
          <button
            onClick={generatePlan}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <RefreshCw size={16} />
            Regenerate
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${progress}%` }}
          >
            {progress > 10 && (
              <span className="text-xs font-bold text-white">{progress}%</span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          {progress === 100 ? '🎉 Congratulations! You completed your weekly plan!' : `${progress}% Complete - Keep going!`}
        </p>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="space-y-6">
          {generatedPlan.dailyPlan.map((day, dayIndex) => (
            <div key={dayIndex} className="relative">
              {/* Timeline Line */}
              {dayIndex < generatedPlan.dailyPlan.length - 1 && (
                <div className="absolute left-3 top-10 bottom-0 w-0.5 bg-gradient-to-b from-[#8AC6D1] to-gray-200"></div>
              )}

              {/* Day Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative z-10">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8AC6D1] to-[#A3BFFA] flex items-center justify-center shadow-md">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{day.day}</h3>
                  <p className="text-sm text-gray-500">{day.date}</p>
                </div>
              </div>

              {/* Sessions */}
              <div className="ml-9 space-y-3">
                {day.sessions.map((session, sessionIndex) => {
                  const isCompleted = completedSessions[`${dayIndex}-${sessionIndex}`];
                  
                  return (
                    <div
                      key={sessionIndex}
                      className={`group relative overflow-hidden rounded-xl transition-all ${
                        isCompleted ? 'opacity-60' : ''
                      }`}
                    >
                      <div
                        className={`p-4 bg-gradient-to-r ${session.color} text-white hover:shadow-lg transition-all cursor-pointer`}
                        onClick={() => toggleSessionComplete(dayIndex, sessionIndex)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-lg">{session.subject}</h4>
                              {isCompleted && (
                                <span className="bg-white/30 px-2 py-0.5 rounded-full text-xs font-medium">
                                  ✓ Done
                                </span>
                              )}
                            </div>
                            <p className="text-sm opacity-90">{session.topic}</p>
                          </div>
                          
                          <div className="text-right ml-4">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock size={16} className="opacity-80" />
                              <div className="text-2xl font-bold">{session.duration.toFixed(1)}h</div>
                            </div>
                            <div className="text-xs opacity-80">
                              {getDifficultyStars(session.difficulty)}
                            </div>
                          </div>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
                      </div>

                      {/* Completion Indicator */}
                      {isCompleted && (
                        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                          <CheckCircle size={20} className="text-green-500" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Day Total */}
              <div className="ml-9 mt-3 flex items-center gap-2 text-sm text-gray-600">
                <Clock size={14} />
                <span className="font-medium">
                  Total: {day.sessions.reduce((sum, s) => sum + s.duration, 0).toFixed(1)}h
                </span>
                <span className="text-gray-400">•</span>
                <span>
                  {day.sessions.length} {day.sessions.length === 1 ? 'session' : 'sessions'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gradient-to-br from-[#E9F0FF] to-white rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Days</p>
              <p className="text-2xl font-bold text-gray-800">{generatedPlan.dailyPlan.length}</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-[#DFF6F0] to-white rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-800">
                {generatedPlan.dailyPlan.reduce((sum, day) => sum + day.sessions.length, 0)}
              </p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-[#FFE9D6] to-white rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-2xl font-bold text-gray-800">
                {Object.values(completedSessions).filter(Boolean).length}
              </p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-[#E8DFF5] to-white rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Remaining</p>
              <p className="text-2xl font-bold text-gray-800">
                {generatedPlan.dailyPlan.reduce((sum, day) => sum + day.sessions.length, 0) -
                  Object.values(completedSessions).filter(Boolean).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}