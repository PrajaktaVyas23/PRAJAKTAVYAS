import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AuthenticationPage from './pages/authentication-login-register';
import MaterialUploadProcessing from './pages/material-upload-processing';
import Dashboard from './pages/dashboard';
import ProgressAnalyticsDashboard from './pages/progress-analytics-dashboard';
import AITutorChatInterface from './pages/ai-tutor-chat-interface';
import StudyMaterialsLibrary from './pages/study-materials-library';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AITutorChatInterface />} />
        <Route path="/authentication-login-register" element={<AuthenticationPage />} />
        <Route path="/material-upload-processing" element={<MaterialUploadProcessing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/progress-analytics-dashboard" element={<ProgressAnalyticsDashboard />} />
        <Route path="/ai-tutor-chat-interface" element={<AITutorChatInterface />} />
        <Route path="/study-materials-library" element={<StudyMaterialsLibrary />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
