import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// 页面导入
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import ComplianceRecommendations from './pages/ComplianceRecommendations';
import RegulationDetail from './pages/RegulationDetail';
import RiskWarning from './pages/RiskWarning';
import ContractManagement from './pages/ContractManagement';
import AIAssistant from './pages/AIAssistant';

function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/" element={
        <MainLayout>
          <Dashboard />
        </MainLayout>
      } />
      <Route path="/compliance" element={
        <MainLayout>
          <ComplianceRecommendations />
        </MainLayout>
      } />
      <Route path="/regulation/:id" element={
        <MainLayout>
          <RegulationDetail />
        </MainLayout>
      } />
      <Route path="/risk" element={
        <MainLayout>
          <RiskWarning />
        </MainLayout>
      } />
      <Route path="/contracts" element={
        <MainLayout>
          <ContractManagement />
        </MainLayout>
      } />
      <Route path="/assistant" element={
        <MainLayout>
          <AIAssistant />
        </MainLayout>
      } />
    </Routes>
  );
}

export default App; 