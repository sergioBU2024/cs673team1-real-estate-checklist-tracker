import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TenantProvider } from './components/TenantContext'; // Import TenantProvider
import Login from './components/Login';
import AgentDashboard from './components/AgentDashboard';
import RequestNewTenant from './components/RequestNewTenant';
import Settings from './components/Settings';
import TenantInfoPage from './components/TenantInfoPage';
import AgentClientPage from './components/AgentClientPage'; // Import the AgentClientPage component

function App() {
  return (
    <TenantProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<AgentDashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/request-tenant" element={<RequestNewTenant />} />
          <Route path="/tenant-info" element={<TenantInfoPage />} />
          <Route path="/agent-client" element={<AgentClientPage />} /> {/* Add AgentClientPage route */}
        </Routes>
      </Router>
    </TenantProvider>
  );
}

export default App;
