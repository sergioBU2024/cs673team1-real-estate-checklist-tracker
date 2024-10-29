import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BrokerHomePage.css';

function BrokerHomePage() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSettings = () => navigate('/settings');
  const handleLogout = () => navigate('/');

  return (
    <div className="broker-home-container">
      {/* Header */}
      <header className="header">
        <div className="logo-header">
          <img src="/logo.png" alt="RealList Logo" />
          <div className="logo-text">
            <h1>RealList</h1>
            <p>Your trusted rental platform</p>
          </div>
        </div>
        
        <div className="welcome-text" onClick={toggleDropdown}>
          <p>Welcome,</p>
          <p>Broker John Doe</p>
          <span className={`arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
          {dropdownOpen && (
            <div className="dropdown-menu show">
              <ul>
                <li onClick={handleSettings}>Settings</li>
                <li onClick={handleLogout}>Log Out</li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <h2 className="title">Broker Dashboard</h2>
      <p>This is the broker's home page where all essential information and functionalities will be accessible.</p>
      {/* Additional components and functionality can be added here */}
    </div>
  );
}

export default BrokerHomePage;
