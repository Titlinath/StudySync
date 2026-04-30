import React, { useEffect, useState } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import { useNavigate } from 'react-router-dom';
import './FeatureTour.css';

const tourSteps = [
  {
    target: 'dashboard',
    title: 'Your Command Center 🎮',
    description: 'This is your dashboard - where all the magic happens. Track everything at a glance.',
    route: '/dashboard',
    position: 'center'
  },
  {
    target: 'goals',
    title: 'Set Your Goals 🎯',
    description: 'Create study goals, track milestones, and flex on your progress. No cap.',
    route: '/goals',
    position: 'center'
  },
  {
    target: 'focus-timer',
    title: 'Lock In Mode ⏱️',
    description: 'Pomodoro timer with break suggestions. Your focus, but leveled up.',
    route: '/focus-timer',
    position: 'center'
  },
  {
    target: 'analytics',
    title: 'Track Your Glow-Up 📊',
    description: 'See your study patterns, peak hours, and subject mastery. Data that actually matters.',
    route: '/analytics',
    position: 'center'
  },
  {
    target: 'notes',
    title: 'Notes That Hit Different 📝',
    description: 'Organize notes by subject, tag them, and never lose track again.',
    route: '/notes',
    position: 'center'
  },
  {
    target: 'planner',
    title: 'Smart Study Plans 🧠',
    description: 'AI-powered study schedules based on your goals and habits. It\'s giving productivity.',
    route: '/planner',
    position: 'center'
  }
];

const FeatureTour = () => {
  const { showTour, currentTourStep, completeTour, nextTourStep, prevTourStep } = useOnboarding();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const currentStep = tourSteps[currentTourStep];
  const isLastStep = currentTourStep === tourSteps.length - 1;

  useEffect(() => {
    if (showTour && currentStep) {
      // Navigate to the route for this step
      navigate(currentStep.route);
      
      // Show tooltip after navigation
      setTimeout(() => setIsVisible(true), 300);
    }
  }, [showTour, currentTourStep, currentStep, navigate]);

  const handleNext = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (isLastStep) {
        completeTour();
      } else {
        nextTourStep();
      }
    }, 300);
  };

  const handlePrev = () => {
    if (currentTourStep > 0) {
      setIsVisible(false);
      setTimeout(() => {
        prevTourStep();
      }, 300);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => completeTour(), 300);
  };

  if (!showTour || !currentStep) return null;

  return (
    <>
      <div className={`tour-overlay ${isVisible ? 'visible' : ''}`} />
      <div className={`tour-tooltip ${isVisible ? 'visible' : ''} tooltip-${currentStep.position}`}>
        <div className="tour-header">
          <div className="tour-progress">
            <span className="tour-step-count">
              {currentTourStep + 1} / {tourSteps.length}
            </span>
            <button className="tour-skip" onClick={handleSkip}>
              Skip tour
            </button>
          </div>
        </div>

        <div className="tour-content">
          <h2 className="tour-title">{currentStep.title}</h2>
          <p className="tour-description">{currentStep.description}</p>
        </div>

        <div className="tour-footer">
          <div className="tour-dots">
            {tourSteps.map((_, index) => (
              <span 
                key={index} 
                className={`tour-dot ${index === currentTourStep ? 'active' : ''} ${index < currentTourStep ? 'completed' : ''}`}
              />
            ))}
          </div>

          <div className="tour-actions">
            {currentTourStep > 0 && (
              <button className="tour-btn tour-btn-back" onClick={handlePrev}>
                ← Back
              </button>
            )}
            <button className="tour-btn tour-btn-next" onClick={handleNext}>
              {isLastStep ? "Let's Go! 🚀" : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureTour;