import React, { useState } from "react";
import StatsBar from "../components/Planner/StatsBar";
import SubjectInputPanel from "../components/Planner/SubjectInputPanel";
import SubjectList from "../components/Planner/SubjectList";
import DailyPlanTimeline from "../components/Planner/DailyPlanTimeline";
import MotivationBox from "../components/Planner/MotivationBox";
import EmptyState from "../components/Planner/EmptyState";
import { Calendar, Download, Edit } from "lucide-react";
import { getSubjectColor } from "../utils/colorUtils";

export default function SmartStudyPlanner() {
  const [subjects, setSubjects] = useState([]);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [availableHoursPerDay, setAvailableHoursPerDay] = useState(4);
  const [showInputPanel, setShowInputPanel] = useState(true);

  const generatePlan = () => {
    if (subjects.length === 0) return alert("Please add at least one subject");
    const totalWeight = subjects.reduce(
      (sum, s) => sum + (s.difficulty * (s.hoursNeeded || 10)), 0
    );
    const today = new Date();
    const earliestDate = new Date(Math.min(...subjects.map(s => new Date(s.targetDate))));
    const daysAvailable = Math.ceil((earliestDate - today) / (1000 * 60 * 60 * 24));
    const totalHoursAvailable = daysAvailable * availableHoursPerDay;
    const dailyPlan = [];
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    subjects.forEach((subject, idx) => {
      const weight = subject.difficulty * (subject.hoursNeeded || 10);
      const allocatedHours = Math.max(1, Math.round((totalHoursAvailable * weight) / totalWeight));
      const chapters = subject.chapters.split(",").map(c => c.trim()).filter(c => c);
      const hoursPerDay = Math.min(3, allocatedHours / Math.max(1, daysAvailable));
      const sessionsNeeded = Math.ceil(allocatedHours / hoursPerDay);

      for (let i = 0; i < Math.min(sessionsNeeded, daysAvailable); i++) {
        const dayIndex = (today.getDay() + i) % 7;
        const dayName = days[dayIndex];
        const chapter = chapters[i % chapters.length] || "General Study";
        const color = getSubjectColor(idx);
        const existingDay = dailyPlan.find(d => d.day === dayName);
        if (existingDay) {
          existingDay.sessions.push({ subject: subject.name, topic: chapter, duration: hoursPerDay, color });
        } else {
          dailyPlan.push({
            day: dayName,
            date: new Date(today.getTime() + i * 86400000).toLocaleDateString(),
            sessions: [{ subject: subject.name, topic: chapter, duration: hoursPerDay, color }]
          });
        }
      }
    });

    setGeneratedPlan({ dailyPlan: dailyPlan.slice(0, 7), totalHours: totalHoursAvailable, daysAvailable, subjects: subjects.length });
    setShowInputPanel(false);
  };

  return (
  <div className="min-h-screen bg-study-gradient p-6 md:p-10 text-gray-100">
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-glow p-6 mb-8 transition-all hover:shadow-[0_0_30px_#3b82f6]">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-electric via-magenta to-neonPurple mb-2">
              📅 Smart Study Planner
            </h1>
            <p className="text-gray-300 tracking-wide">
              AI-powered schedule optimization for your academic success
            </p>
          </div>

          {generatedPlan && (
            <div className="flex gap-3">
              <button
                onClick={() => setShowInputPanel(!showInputPanel)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-electric to-magenta text-white rounded-lg font-semibold shadow-md hover:shadow-glow transition-transform hover:scale-105"
              >
                <Edit size={18} />
                {showInputPanel ? "View Plan" : "Edit"}
              </button>

              <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-neonPurple to-electric text-white rounded-lg font-semibold shadow-md hover:shadow-glow transition-transform hover:scale-105">
                <Download size={18} /> Export PDF
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      {generatedPlan && (
        <div className="animate-fadeIn">
          <StatsBar
            generatedPlan={generatedPlan}
            availableHoursPerDay={availableHoursPerDay}
          />
        </div>
      )}

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Input Panel */}
        {showInputPanel && (
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-soft p-6 transition-all hover:shadow-glow">
            <SubjectInputPanel
              subjects={subjects}
              setSubjects={setSubjects}
              availableHoursPerDay={availableHoursPerDay}
              setAvailableHoursPerDay={setAvailableHoursPerDay}
            />
          </div>
        )}

        {/* Right Content Area */}
        <div
          className={`transition-all duration-300 ${
            showInputPanel ? "lg:col-span-2" : "lg:col-span-3"
          }`}
        >
          {/* Subject List */}
          {subjects.length > 0 && (
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-soft p-6 mb-8 transition-all hover:shadow-glow">
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
            <div className="space-y-8 animate-fadeIn">
              <MotivationBox />
              <DailyPlanTimeline generatedPlan={generatedPlan} />
            </div>
          )}

          {/* Empty State */}
          {!generatedPlan && subjects.length === 0 && (
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-soft p-12 text-center transition-all hover:shadow-glow">
              <EmptyState />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
}
