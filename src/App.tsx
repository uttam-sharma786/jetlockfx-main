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

import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from './pages';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <FxRateProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Index />}>
                  {/* <Route index element={<HomePage />} /> */}
                  {/* <Route path="login" element={<LoginPage />} /> */}
                  {/* <Route path="register" element={<RegisterPage />} /> */}
                  <Route path="about" element={<AboutPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  {/* <Route path="pilot" element={<Pilot />} /> */}
                  <Route path="faq" element={<Faq />} />

                  {/* Protected routes */}
                  {/* <Route path="dashboard" element={
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
                  } /> */}
                  
                  {/* Not found route */}
                  <Route path="404" element={<NotFoundPage />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Route>
              </Routes>
            </Router>
          </FxRateProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;