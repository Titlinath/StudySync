// src/context/OnboardingContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const OnboardingContext = createContext();

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider = ({ children }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [currentTourStep, setCurrentTourStep] = useState(0);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding before
    const onboardingComplete = localStorage.getItem('onboarding_complete');
    
    if (!onboardingComplete) {
      // New user - show welcome modal after a brief delay
      setTimeout(() => {
        setShowWelcome(true);
      }, 500);
    } else {
      setHasCompletedOnboarding(true);
    }
  }, []);

  const startTour = () => {
    setShowWelcome(false);
    setShowTour(true);
    setCurrentTourStep(0);
  };

  const skipOnboarding = () => {
    setShowWelcome(false);
    setShowTour(false);
    localStorage.setItem('onboarding_complete', 'true');
    setHasCompletedOnboarding(true);
  };

  const completeTour = () => {
    setShowTour(false);
    localStorage.setItem('onboarding_complete', 'true');
    setHasCompletedOnboarding(true);
  };

  const nextTourStep = () => {
    setCurrentTourStep(prev => prev + 1);
  };

  const prevTourStep = () => {
    setCurrentTourStep(prev => Math.max(0, prev - 1));
  };

  const resetOnboarding = () => {
    localStorage.removeItem('onboarding_complete');
    setHasCompletedOnboarding(false);
    setShowWelcome(true);
  };

  const value = {
    showWelcome,
    showTour,
    currentTourStep,
    hasCompletedOnboarding,
    startTour,
    skipOnboarding,
    completeTour,
    nextTourStep,
    prevTourStep,
    resetOnboarding,
    setShowWelcome,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};