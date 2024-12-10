import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationsContext } from '../contexts/ApplicationsContext';
import { UserContext } from '../contexts/UserContext';
import './Header.css';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { clearApplications } = useContext(ApplicationsContext);
  const { user } = useContext(UserContext);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSettings = () => navigate('/settings');
  const handleLogoClick = () => navigate('/dashboard');
  const handleLogout = () => {
    clearApplications(); // Clear applications on logout
    navigate('/'); // Redirect to the home page
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo-header" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src="/logo.png" alt="RealList Logo" className="logo-image" />
        <div className="logo-text">
          <h1>RealList</h1>
          <p>Unlock simplicity in your rental journey!</p>
        </div>
      </div>

      <div className="welcome-text" ref={dropdownRef}>
        <p className="welcome">
          <strong>Welcome,</strong>{' '}
          <span className="user-name">{user?.firstName || 'Guest'}</span>{' '}
          <span className="profile-icon" onClick={toggleDropdown}>
            {/* Inline SVG for Profile Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="#000"
            >
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" />
            </svg>
          </span>
        </p>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <ul>
              <li onClick={handleSettings}>Settings</li>
              <li onClick={handleLogout}>Log Out</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;