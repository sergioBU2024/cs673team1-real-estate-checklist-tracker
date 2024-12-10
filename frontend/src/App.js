import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp'; // Import SignUp component
import ClientHomePage from './components/pages/ClientHomePage';
import AddApplicationPage from './components/pages/AddApplicationPage'; // Add application page
import ApplicationDetailPage from './components/pages/ApplicationDetailPage';
import AgentHomePage from './components/pages/AgentHomePage';
import SettingsPage from './components/pages/SettingsPage'; // Setting page
import SignUpClientInvitation from './components/auth/SignUpClientInvitation'; // Import SignUpClientInvitation component
import UserProvider from './contexts/UserContext';
import { ApplicationsProvider } from './contexts/ApplicationsContext';
import UserDetailPage from './components/pages/UserDetailPage';
import TaskDetailsPage from './components/pages/TaskDetailsPage';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import Montserrat font if using npm package
// import '@fontsource/montserrat';

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', 'Roboto', 'Arial', sans-serif", // Add Montserrat globally
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent styling across the app */}
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
              <Route path="/applications/:applicationId/users/:userId/task/:taskId" element={<TaskDetailsPage />} />
            </Routes>
          </Router>
        </ApplicationsProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;