import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Removed BrowserRouter alias
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import ClientHomePage from './components/pages/ClientHomePage';
import AddApplicationPage from './components/pages/AddApplicationPage';
import ApplicationDetailPage from './components/pages/ApplicationDetailPage';
import AgentHomePage from './components/pages/AgentHomePage';
import SettingsPage from './components/pages/SettingsPage';
import SignUpClientInvitation from './components/auth/SignUpClientInvitation';
import UserProvider from './contexts/UserContext';
import { ApplicationsProvider } from './contexts/ApplicationsContext';
import UserDetailPage from './components/pages/UserDetailPage';
import TaskDetailsPage from './components/pages/TaskDetailsPage';

function App() {
  return (
    <UserProvider>
      <ApplicationsProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/client" element={<ClientHomePage />} />
          <Route path="/dashboard" element={<AgentHomePage />} />
          <Route path="/add-application" element={<AddApplicationPage />} />
          <Route path="/applications/:applicationId" element={<ApplicationDetailPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/signupnew/:userId" element={<SignUpClientInvitation />} />
          <Route path="/applications/:applicationId/users/:userId" element={<UserDetailPage />} />
          <Route path="/applications/:applicationId/users/:userId/task/:taskId" element={<TaskDetailsPage />} />
        </Routes>
      </ApplicationsProvider>
    </UserProvider>
  );
}

export default App;
