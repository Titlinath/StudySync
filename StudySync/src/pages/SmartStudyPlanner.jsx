import React, { useState } from "react";
import { Calendar, Download, Edit, Target, Clock, TrendingUp } from "lucide-react";
import StatsBar from "../components/Planner/StatsBar";
import SubjectInputPanel from "../components/Planner/SubjectInputPanel";
import SubjectList from "../components/Planner/SubjectList";
import DailyPlanTimeline from "../components/Planner/DailyPlanTimeline";
import MotivationBox from "../components/Planner/MotivationBox";
import EmptyState from "../components/Planner/EmptyState";
import { getSubjectColor } from "../utils/colorUtils";

export default function SmartStudyPlanner() {
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
    <div className="min-h-screen bg-gradient-to-br from-[#E9F0FF] to-[#DFF6F0] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                📅 Smart Study Planner
              </h1>
              <p className="text-gray-600">
                AI-powered schedule optimization for your academic success
              </p>
            </div>
            <div className="flex gap-3">
              {generatedPlan && (
                <>
                  <button
                    onClick={() => setShowInputPanel(!showInputPanel)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8AC6D1] to-[#A3BFFA] text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <Edit size={18} />
                    {showInputPanel ? "View Plan" : "Edit Subjects"}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF9A8B] to-[#FFD6A5] text-white rounded-lg hover:shadow-lg transition-all">
                    <Download size={18} />
                    Export PDF
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        {generatedPlan && (
          <StatsBar
            generatedPlan={generatedPlan}
            availableHoursPerDay={availableHoursPerDay}
          />
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
          <div
            className={
              showInputPanel ? "lg:col-span-2" : "lg:col-span-3"
            }
          >
            {/* Subject List */}
            {subjects.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <SubjectList
                  subjects={subjects}
                  setSubjects={setSubjects}
                  generatePlan={generatePlan}
                  generatedPlan={generatedPlan}
                />
              </div>
            )}

            {/* Generated Plan */}
            {generatedPlan && (
              <div className="space-y-6">
                <MotivationBox />
                <DailyPlanTimeline generatedPlan={generatedPlan} generatePlan={generatePlan} />
              </div>
            )}

            {/* Empty State */}
            {subjects.length === 0 && !generatedPlan && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <EmptyState />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}