import React from 'react';
import { Calendar, BookOpen, Target, Zap } from 'lucide-react';

export default function EmptyState() {
  const features = [
    {
      icon: BookOpen,
      title: 'Add Subjects',
      description: 'List all subjects you need to study',
      color: 'text-[#8AC6D1]'
    },
    {
      icon: Target,
      title: 'Set Goals',
      description: 'Define difficulty and target dates',
      color: 'text-[#FF9A8B]'
    },
    {
      icon: Zap,
      title: 'Generate Plan',
      description: 'AI creates your optimized schedule',
      color: 'text-[#A3BFFA]'
    }
  ];

  return (
    <div className="text-center">
      {/* Main Icon */}
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#E9F0FF] to-[#DFF6F0] flex items-center justify-center animate-pulse">
        <Calendar size={48} className="text-[#8AC6D1]" />
      </div>

      {/* Title and Description */}
      <h3 className="text-2xl font-bold text-gray-800 mb-3">
        Start Planning Your Success
      </h3>
      <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
        Add your subjects, set your goals, and let our AI create a personalized study schedule optimized for your success.
      </p>

      {/* Feature Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 flex items-center justify-center mb-3`}>
                <feature.icon size={24} className={feature.color} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-bold text-gray-400">STEP {index + 1}</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#E9F0FF] to-[#DFF6F0] rounded-xl p-6">
        <p className="text-gray-700 font-medium mb-4">
          Ready to transform your study routine?
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <span className="w-2 h-2 rounded-full bg-[#8AC6D1] animate-pulse"></span>
          <span>Start by adding your first subject using the panel on the left</span>
          <span className="text-2xl">👈</span>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        <div className="bg-white/50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h5 className="font-semibold text-gray-800 text-sm mb-1">Pro Tip</h5>
              <p className="text-xs text-gray-600">
                Be realistic with your difficulty ratings and time estimates for the best results.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h5 className="font-semibold text-gray-800 text-sm mb-1">Best Practice</h5>
              <p className="text-xs text-gray-600">
                Include all topics/chapters for comprehensive coverage and better scheduling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}