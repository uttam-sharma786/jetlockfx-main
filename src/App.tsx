import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FxRateProvider } from './contexts/FxRateContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import Pilot from './pages/PilotTab';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import RateLockPage from './pages/RateLockPage';
import TransactionsPage from './pages/TransactionsPage';
import ProfilePage from './pages/ProfilePage';
import Faq from './components/layout/Faq';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <FxRateProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="AboutPage" element={<AboutPage/>} />
              <Route path="ContactPage" element={<ContactPage/>} />
              <Route path="PilotTab" element={<Pilot />} />
              <Route path="Faq" element={<Faq />}/>

              
              {/* Protected routes */}
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="rate-lock" element={
                <ProtectedRoute>
                  <RateLockPage />
                </ProtectedRoute>
              } />
              <Route path="transactions" element={
                <ProtectedRoute>
                  <TransactionsPage />
                </ProtectedRoute>
              } />
              <Route path="profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              
              {/* Not found route */}
              <Route path="not-found" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Route>
          </Routes>
        </Router>
      </FxRateProvider>
    </AuthProvider>
  );
}

export default App;