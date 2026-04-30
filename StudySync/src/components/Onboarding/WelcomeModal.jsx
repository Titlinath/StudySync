import React, { useState, useEffect } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import './WelcomeModal.css';

const welcomeMessages = [
  "Psst… your study goals are staring at you 👀",
  "Fresh focus served hot 🍵",
  "Scrolling won't finish your syllabus 💀",
  "Your brain called. It wants some gains 🧠💪",
  "Plot twist: you actually study today ✨",
  "Main character energy starts here 🎬"
];

const WelcomeModal = () => {
  const { showWelcome, startTour, skipOnboarding } = useOnboarding();
  const [randomMessage, setRandomMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showWelcome) {
      // Pick a random welcome message
      const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
      setRandomMessage(welcomeMessages[randomIndex]);
      
      // Trigger animation
      setTimeout(() => setIsVisible(true), 100);
    }
  }, [showWelcome]);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => skipOnboarding(), 300);
  };

  const handleTakeTour = () => {
    setIsVisible(false);
    setTimeout(() => startTour(), 300);
  };

  if (!showWelcome) return null;

  return (
    <>
      <div className={`welcome-overlay ${isVisible ? 'visible' : ''}`} onClick={handleSkip} />
      <div className={`welcome-modal ${isVisible ? 'visible' : ''}`}>
        <div className="welcome-header">
          <h2 className="welcome-greeting">{randomMessage}</h2>
          <h1 className="welcome-title">Welcome to StudySync</h1>
          <p className="welcome-subtitle">Where procrastination meets its match.</p>
        </div>

        <div className="welcome-features">
          <div className="feature-item">
            <span className="feature-icon">⏱️</span>
            <div>
              <h3>Focus Timer</h3>
              <p>Pomodoro but make it aesthetic</p>
            </div>
          </div>

          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <div>
              <h3>Goals & Tracking</h3>
              <p>Because vibes need structure</p>
            </div>
          </div>

          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <div>
              <h3>Study Analytics</h3>
              <p>See your glow-up in real-time</p>
            </div>
          </div>

          <div className="feature-item">
            <span className="feature-icon">📝</span>
            <div>
              <h3>Smart Notes</h3>
              <p>Your second brain, organized</p>
            </div>
          </div>

          <div className="feature-item">
            <span className="feature-icon">🤖</span>
            <div>
              <h3>AI Study Buddy</h3>
              <p>ChatGPT but for your syllabus</p>
            </div>
          </div>
        </div>

        <div className="welcome-footer">
          <p className="tour-prompt">First time here? Let's show you around 👇</p>
          <div className="welcome-actions">
            <button className="btn-skip" onClick={handleSkip}>
              Nah, I'll explore
            </button>
            <button className="btn-tour" onClick={handleTakeTour}>
              Give me the tour ⚡
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeModal;