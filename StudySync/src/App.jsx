import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingProvider } from './context/OnboardingContext';
import WelcomeModal from './components/Onboarding/WelcomeModal';
import FeatureTour from './components/Onboarding/FeatureTour';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import SmartStudyPlanner from './pages/SmartStudyPlanner';
import NotesPage from './pages/NotesPage';
import FocusTimerPage from './pages/FocusTimerPage';
import GoalTrackingPage from './pages/GoalTrackingPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DailyMotivationPage from './pages/DailyMotivationPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <OnboardingProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/planner"
            element={
              <ProtectedRoute>
                <SmartStudyPlanner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <NotesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/focus-timer"
            element={
              <ProtectedRoute>
                <FocusTimerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/goals"
            element={
              <ProtectedRoute>
                <GoalTrackingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/motivation"
            element={
              <ProtectedRoute>
                <DailyMotivationPage />
              </ProtectedRoute>
            }
          />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Onboarding Components - These will show for new users */}
        <WelcomeModal />
        <FeatureTour />
      </Router>
    </OnboardingProvider>
  );
}

export default App;