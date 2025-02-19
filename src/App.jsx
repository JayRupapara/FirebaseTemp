import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';
import Navbar from './components/layout/Navbar';

// Pages
import LandingPage from './pages/LandingPage';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import DashboardHome from './pages/dashboard/DashboardHome';
import Profile from './pages/dashboard/Profile';
import Appointments from './pages/dashboard/Appointments';
import Settings from './pages/dashboard/Settings';
import ScholarshipManagement from './pages/dashboard/ScholarshipManagement';

// Layout wrapper component
const AppLayout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  // Don't show the main navbar on dashboard routes
  if (isDashboardRoute && user) {
    return children;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppLayout>
            <div className="min-h-screen">
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#333',
                    color: '#fff',
                  },
                  success: {
                    style: {
                      background: '#22c55e',
                    },
                  },
                  error: {
                    style: {
                      background: '#ef4444',
                    },
                  },
                }}
              />

              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Dashboard Routes */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="scholarships" element={<ScholarshipManagement />} />
                </Route>

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </AppLayout>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;