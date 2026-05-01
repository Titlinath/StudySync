import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Download, Edit, Target, Clock, TrendingUp, ArrowLeft } from "lucide-react";
import StatsBar from "../components/Planner/StatsBar";
import SubjectInputPanel from "../components/Planner/SubjectInputPanel";
import SubjectList from "../components/Planner/SubjectList";
import DailyPlanTimeline from "../components/Planner/DailyPlanTimeline";
import MotivationBox from "../components/Planner/MotivationBox";
import EmptyState from "../components/Planner/EmptyState";
import { getSubjectColor } from "../utils/colorUtils";

export default function SmartStudyPlanner() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [availableHoursPerDay, setAvailableHoursPerDay] = useState(4);
  const [showInputPanel, setShowInputPanel] = useState(true);

  const generatePlan = () => {
    if (subjects.length === 0) {
      alert("Please add at least one subject");
      return;
    }

    const totalWeight = subjects.reduce(
      (sum, s) => sum + s.difficulty * (s.hoursNeeded || 10),
      0
    );
    const today = new Date();
    const earliestDate = new Date(
      Math.min(...subjects.map((s) => new Date(s.targetDate)))
    );
    const daysAvailable = Math.ceil(
      (earliestDate - today) / (1000 * 60 * 60 * 24)
    );
    const totalHoursAvailable = daysAvailable * availableHoursPerDay;
    const dailyPlan = [];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    subjects.forEach((subject, idx) => {
      const weight = subject.difficulty * (subject.hoursNeeded || 10);
      const allocatedHours = Math.max(
        1,
        Math.round((totalHoursAvailable * weight) / totalWeight)
      );
      const chapters = subject.chapters
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c);
      const hoursPerDay = Math.min(
        3,
        allocatedHours / Math.max(1, daysAvailable)
      );
      const sessionsNeeded = Math.ceil(allocatedHours / hoursPerDay);

      for (let i = 0; i < Math.min(sessionsNeeded, daysAvailable); i++) {
        const dayIndex = (today.getDay() + i) % 7;
        const dayName = days[dayIndex];
        const chapter = chapters[i % chapters.length] || "General Study";
        const color = getSubjectColor(idx);
        const existingDay = dailyPlan.find((d) => d.day === dayName);

        if (existingDay) {
          existingDay.sessions.push({
            subject: subject.name,
            topic: chapter,
            duration: hoursPerDay,
            difficulty: subject.difficulty,
            color,
          });
        } else {
          dailyPlan.push({
            day: dayName,
            date: new Date(today.getTime() + i * 86400000).toLocaleDateString(),
            sessions: [
              {
                subject: subject.name,
                topic: chapter,
                duration: hoursPerDay,
                difficulty: subject.difficulty,
                color,
              },
            ],
          });
        }
      }
    });

    dailyPlan.sort((a, b) => new Date(a.date) - new Date(b.date));

    setGeneratedPlan({
      dailyPlan: dailyPlan.slice(0, 7),
      totalHours: totalHoursAvailable,
      daysAvailable,
      subjects: subjects.length,
    });

    setShowInputPanel(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9F0FF] to-[#DFF6F0] dark:from-[#0f172a] dark:via-[#1e1b4b] dark:to-[#312e81] transition-colors duration-300 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Back Button - standalone above header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl backdrop-blur-sm transition-all duration-200 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back
        </button>

        {/* Header */}
        <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm dark:border dark:border-white/10 rounded-2xl shadow-lg dark:shadow-[0_0_30px_rgba(59,130,246,0.1)] p-6 mb-6 transition-all duration-300">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                📅 Smart Study Planner
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                AI-powered schedule optimization for your academic success
              </p>
            </div>
            <div className="flex gap-3">
              {generatedPlan && (
                <>
                  <button
                    onClick={() => setShowInputPanel(!showInputPanel)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] dark:from-[#3b82f6] dark:to-[#8b5cf6] text-white rounded-xl hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-105 transition-all duration-200 font-medium"
                  >
                    <Edit size={16} />
                    {showInputPanel ? "View Plan" : "Edit Subjects"}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF9A8B] to-[#FFD6A5] dark:from-[#ec4899] dark:to-[#f97316] text-white rounded-xl hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:scale-105 transition-all duration-200 font-medium">
                    <Download size={16} />
                    Export PDF
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        {generatedPlan && (
          <StatsBar generatedPlan={generatedPlan} availableHoursPerDay={availableHoursPerDay} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          {showInputPanel && (
            <div className="lg:col-span-1">
              <SubjectInputPanel
                subjects={subjects}
                setSubjects={setSubjects}
                availableHoursPerDay={availableHoursPerDay}
                setAvailableHoursPerDay={setAvailableHoursPerDay}
              />
            </div>
          )}

          {/* Main Content Area */}
          <div className={showInputPanel ? "lg:col-span-2" : "lg:col-span-3"}>
            {subjects.length > 0 && (
              <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm dark:border dark:border-white/10 rounded-2xl shadow-lg dark:shadow-[0_0_30px_rgba(139,92,246,0.1)] p-6 mb-6 transition-all duration-300">
                <SubjectList
                  subjects={subjects}
                  setSubjects={setSubjects}
                  generatePlan={generatePlan}
                  generatedPlan={generatedPlan}
                />
              </div>
            )}

            {generatedPlan && (
              <div className="space-y-6">
                <MotivationBox />
                <DailyPlanTimeline generatedPlan={generatedPlan} generatePlan={generatePlan} />
              </div>
            )}

            {subjects.length === 0 && !generatedPlan && (
              <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm dark:border dark:border-white/10 rounded-2xl shadow-lg dark:shadow-[0_0_30px_rgba(59,130,246,0.1)] p-12 text-center transition-all duration-300">
                <EmptyState />
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}