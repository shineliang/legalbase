import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// 页面导入
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import ComplianceRecommendations from './pages/ComplianceRecommendations';
import RegulationDetail from './pages/RegulationDetail';
import RiskWarning from './pages/RiskWarning';
import ContractManagement from './pages/ContractManagement';
import AIAssistant from './pages/AIAssistant';
import AIComplianceHub from './pages/AIComplianceHub';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/legalbase" replace />} />
      <Route path="/legalbase/welcome" element={<Welcome />} />
      <Route path="/legalbase" element={
        <MainLayout>
          <Dashboard />
        </MainLayout>
      } />
      <Route path="/legalbase/compliance" element={
        <MainLayout>
          <ComplianceRecommendations />
        </MainLayout>
      } />
      <Route path="/legalbase/regulation/:id" element={
        <MainLayout>
          <RegulationDetail />
        </MainLayout>
      } />
      <Route path="/legalbase/risk" element={
        <MainLayout>
          <RiskWarning />
        </MainLayout>
      } />
      <Route path="/legalbase/contracts" element={
        <MainLayout>
          <ContractManagement />
        </MainLayout>
      } />
      <Route path="/legalbase/assistant" element={
        <MainLayout>
          <AIAssistant />
        </MainLayout>
      } />
      <Route path="/legalbase/ai-hub" element={
        <MainLayout>
          <AIComplianceHub />
        </MainLayout>
      } />
    </Routes>
  );
}

export default App; 