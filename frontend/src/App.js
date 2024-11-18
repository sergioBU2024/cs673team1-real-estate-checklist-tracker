import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp'; // Import SignUp component
import ClientHomePage from './components/pages/ClientHomePage';
import AddApplicationPage from './components/pages/AddApplicationPage';// Add applicationpage 
import ApplicationDetailPage from './components/pages/ApplicationDetailPage';
import AgentHomePage from './components/pages/AgentHomePage';
import SettingsPage from './components/pages/SettingsPage';// setting page
import SignUpClientInvitation from './components/auth/SignUpClientInvitation'; // Import SignUpClientInvitation component
import UserProvider from './contexts/UserContext';
import { ApplicationsProvider } from './contexts/ApplicationsContext';
import UserDetailPage from './components/pages/UserDetailPage';

function App() {
  return (

    <UserProvider>
    <ApplicationsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> {/* Sign Up route */}
          <Route path="/client" element={<ClientHomePage />} />
          <Route path="/dashboard" element={<AgentHomePage />} />
          <Route path="/add-application" element={<AddApplicationPage />} />
          <Route path="/applications/:applicationId" element={<ApplicationDetailPage />} /> 
          <Route path="/settings" element={<SettingsPage />} /> {/* Settings route */}
          <Route path="/signupnew/:userId" element={<SignUpClientInvitation />} />
          <Route path="/applications/:applicationId/users/:userId" element={<UserDetailPage />} />
          
        </Routes>
      </Router>
    </ApplicationsProvider>
      
    </UserProvider>
  );
}

export default App;
