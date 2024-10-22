import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TenantContext } from './TenantContext';
import './TenantInfoPage.css';

function TenantInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tenants, setTenants } = useContext(TenantContext);

  // Access tenant data passed from the dashboard
  const tenant = location.state?.tenant || {};

  // States for editing and dropdown menu
  const [isEditing, setIsEditing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [greeting, setGreeting] = useState('Good Morning');
  const [editedTenant, setEditedTenant] = useState({
    firstName: tenant.name?.split(" ")[0] || '',
    middleName: tenant.name?.split(" ")[1] || '',
    lastName: tenant.name?.split(" ")[2] || '',
    email: tenant.email || '',
    phone: tenant.phone || '',
    location: tenant.location || '',
    rent: tenant.rent || '',
    movingDate: tenant.movingDate || '',
    moveOutDate: tenant.moveOutDate || '',
    publicLink: tenant.publicLink || '',
  });

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleEdit = () => setIsEditing(!isEditing);

  const handleLogout = () => navigate('/');
  const handleSettings = () => navigate('/settings');
  const handleReturn = () => navigate('/dashboard');

  // Function to update the tenant in the context
  const handleConfirm = () => {
    // Find the tenant's index in the tenants array
    const tenantIndex = tenants.findIndex((t) => t.email === tenant.email);

    // If tenant exists, update the information
    if (tenantIndex !== -1) {
      const updatedTenant = {
        ...tenant,
        name: `${editedTenant.firstName} ${editedTenant.middleName} ${editedTenant.lastName}`,
        email: editedTenant.email,
        phone: editedTenant.phone,
        location: editedTenant.location,
        rent: editedTenant.rent,
        movingDate: editedTenant.movingDate,
        moveOutDate: editedTenant.moveOutDate,
        publicLink: editedTenant.publicLink,
      };

      // Update the tenant in the context
      const updatedTenants = [...tenants];
      updatedTenants[tenantIndex] = updatedTenant;
      setTenants(updatedTenants);
    }

    // Navigate back to the dashboard
    navigate('/dashboard');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTenant((prevTenant) => ({
      ...prevTenant,
      [name]: value,
    }));
  };

  return (
    <div className="tenant-info-page-container">
      <header className="header">
        <div className="logo-header" onClick={handleReturn} style={{ cursor: 'pointer' }}>
          <img src="/logo.png" alt="RealList Logo" />
          <div className="logo-text">
            <h1>RealList</h1>
            <p>Unlock simplicity in your rental journey!</p>
          </div>
        </div>
        <div className="welcome-text">
          <p className="greeting">{greeting},</p>
          <div className="user-dropdown" onClick={toggleDropdown}>
            <span className="username">Mr. Abraham Lincoln</span>
            <span className={`arrow ${dropdownOpen ? 'open' : ''}`}></span>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={handleSettings}>Settings</li>
                  <li onClick={handleLogout}>Log Out</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="section">
        <div className="tenant-info-header">
          <h2>Tenant Information</h2>
          <button className="edit-button" onClick={handleEdit}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="tenant-housing-wrapper">
          {/* Tenant Info */}
          <div className="info-section tenant-info">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={editedTenant.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={editedTenant.middleName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={editedTenant.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editedTenant.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={editedTenant.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Housing Info */}
          <div className="info-section housing-info">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={editedTenant.location}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Rent</label>
              <input
                type="text"
                name="rent"
                value={editedTenant.rent}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Move-in Date</label>
              <input
                type="date"
                name="movingDate"
                value={editedTenant.movingDate}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Move-out Date</label>
              <input
                type="date"
                name="moveOutDate"
                value={editedTenant.moveOutDate}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Public Link</label>
              <input
                type="text"
                name="publicLink"
                value={editedTenant.publicLink}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="tenant-documents section">
        <h3>Tenant Documents</h3>
        <div className="document-item">
          <span>ID/Passport</span>
          <button>View Document</button>
        </div>
        <div className="document-item">
          <span>Bank Statement</span>
          <button>View Document</button>
        </div>
        <div className="document-item">
          <span>I-20</span>
          <button>View Document</button>
        </div>
      </div>

      <div className="action-buttons">
        <button type="button" onClick={handleReturn}>Return</button>
        <button type="button" onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
}

export default TenantInfoPage;
