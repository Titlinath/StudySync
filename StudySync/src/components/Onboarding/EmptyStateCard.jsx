import React from 'react';
import './EmptyStateCard.css';

const emptyStateMessages = {
  goals: {
    emoji: '🎯',
    title: 'No goals yet? That\'s bold.',
    description: 'Time to set some targets and actually hit them for once.',
    action: 'Create Your First Goal',
    tips: [
      'Start small - one goal is better than none',
      'Make it specific and measurable',
      'Set a realistic deadline'
    ]
  },
  notes: {
    emoji: '📝',
    title: 'Your notes are lonely.',
    description: 'Create your first note and start building your knowledge empire.',
    action: 'Start Taking Notes',
    tips: [
      'Organize by subject or topic',
      'Use tags for easy searching',
      'Add summaries for quick review'
    ]
  },
  analytics: {
    emoji: '📊',
    title: 'No data to show... yet.',
    description: 'Start studying and watch your stats glow up in real-time.',
    action: 'Start Your First Session',
    tips: [
      'Use the Focus Timer to track study time',
      'Complete goals to see progress',
      'Check back daily for insights'
    ]
  },
  focusTime: {
    emoji: '⏱️',
    title: 'Zero minutes studied today.',
    description: 'The timer\'s waiting. Your goals are too. Let\'s lock in.',
    action: 'Start Focus Session',
    tips: [
      'Try 25-minute Pomodoro sessions',
      'Take 5-minute breaks',
      'Stay consistent, not perfect'
    ]
  },
  planner: {
    emoji: '📅',
    title: 'No study plan? Risky.',
    description: 'Let AI create a personalized study schedule that actually works.',
    action: 'Generate Study Plan',
    tips: [
      'Set your available study hours',
      'Prioritize difficult subjects',
      'Leave buffer time for breaks'
    ]
  }
};

const EmptyStateCard = ({ type, onAction }) => {
  const state = emptyStateMessages[type] || emptyStateMessages.goals;

  return (
    <div className="empty-state-card">
      <div className="empty-state-icon">{state.emoji}</div>
      <h2 className="empty-state-title">{state.title}</h2>
      <p className="empty-state-description">{state.description}</p>
      
      {onAction && (
        <button className="empty-state-action" onClick={onAction}>
          {state.action}
        </button>
      )}

      <div className="empty-state-tips">
        <h4>Quick Tips:</h4>
        <ul>
          {state.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmptyStateCard;