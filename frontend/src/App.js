import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TenantProvider } from './components/TenantContext';
import { ClientDataProvider } from './components/ClientDataContext';
import Login from './components/Login';
import SignUp from './components/SignUp'; // Import SignUp component
import AgentDashboard from './components/AgentDashboard';
import RequestNewTenant from './components/RequestNewTenant';
import Settings from './components/Settings';
import TenantInfoPage from './components/TenantInfoPage';
import AgentClientPage from './components/AgentClientPage';
import ClientPage from './components/ClientPage';
import ClientHomePage from './components/ClientHomePage';
import BrokerHomePage from './components/BrokerHomePage';

function App() {
  return (
    <TenantProvider>
      <ClientDataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} /> {/* Sign Up route */}
            <Route path="/dashboard" element={<AgentDashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/request-tenant" element={<RequestNewTenant />} />
            <Route path="/tenant-info" element={<TenantInfoPage />} />
            <Route path="/agent-client" element={<AgentClientPage />} />
            <Route path="/client" element={<ClientPage />} />
            <Route path="/client-home" element={<ClientHomePage />} />
            <Route path="/broker-home" element={<BrokerHomePage />} />
          </Routes>
        </Router>
      </ClientDataProvider>
    </TenantProvider>
  );
}

export default App;
