import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp'; // Import SignUp component
import ClientHomePage from './components/pages/ClientHomePage';
import AgentHomePage from './components/pages/AgentHomePage';
import UserProvider from './contexts/UserContext';

function App() {
  return (

    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> {/* Sign Up route */}
          <Route path="/client" element={<ClientHomePage />} />
          <Route path="/dashboard" element={<AgentHomePage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
