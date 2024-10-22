import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TenantContext } from './TenantContext';
import './AgentDashboard.css'; 

function AgentDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [greeting, setGreeting] = useState("Welcome");
  const { tenants, setTenants } = useContext(TenantContext);
  const [selectedTenants, setSelectedTenants] = useState([]);
  const [possibleTenants, setPossibleTenants] = useState([]);
  const [currentTenants, setCurrentTenants] = useState([]);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const updateGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  };

  useEffect(() => {
    updateGreeting();
    setPossibleTenants(tenants.filter(tenant => tenant.status !== 'Compliant'));
    setCurrentTenants(tenants.filter(tenant => tenant.status === 'Compliant'));
  }, [tenants]);

  const handleLogout = () => navigate('/');
  const handleSettings = () => navigate('/settings');

  // Updated function to navigate to AgentClientPage with tenant data
  const handleTenantClick = (tenant) => {
    navigate('/agent-client', { state: { tenant } });
  };

  const handleSelectTenant = (index, type) => {
    const updatedSelection = [...selectedTenants];
    const tenantIndex = `${type}-${index}`;

    if (updatedSelection.includes(tenantIndex)) {
      updatedSelection.splice(updatedSelection.indexOf(tenantIndex), 1);
    } else {
      updatedSelection.push(tenantIndex);
    }
    setSelectedTenants(updatedSelection);
  };

  const handleDeleteTenants = (type) => {
    if (type === 'possible') {
      const updatedPossibleTenants = possibleTenants.filter((_, index) => !selectedTenants.includes(`possible-${index}`));
      setPossibleTenants(updatedPossibleTenants);
      setTenants((prevTenants) => prevTenants.filter(tenant => !selectedTenants.includes(`possible-${prevTenants.indexOf(tenant)}`)));
    } else if (type === 'current') {
      const updatedCurrentTenants = currentTenants.filter((_, index) => !selectedTenants.includes(`current-${index}`));
      setCurrentTenants(updatedCurrentTenants);
      setTenants((prevTenants) => prevTenants.filter(tenant => !selectedTenants.includes(`current-${prevTenants.indexOf(tenant)}`)));
    }
    setSelectedTenants([]);
  };

  const handleAcceptTenant = (index) => {
    const tenantToAccept = possibleTenants[index];
    tenantToAccept.status = 'Compliant';

    setCurrentTenants([...currentTenants, tenantToAccept]);
    setPossibleTenants(possibleTenants.filter((_, i) => i !== index));

    setTenants((prevTenants) =>
      prevTenants.map((tenant) =>
        tenant === tenantToAccept ? { ...tenant, status: 'Compliant' } : tenant
      )
    );
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="logo-header">
          <img src="/logo.png" alt="RealList Logo" />
          <div className="logo-text">
            <h1>RealList</h1>
            <p>Unlock simplicity in your rental journey!</p>
          </div>
        </div>
        <div className="welcome-text">
          <p className="welcome">{greeting},</p>
          <div className="user-dropdown" onClick={toggleDropdown}>
            <p className="username">Mr. Abraham Lincoln</p>
            <span className={`arrow ${dropdownOpen ? 'open' : ''}`}></span>
          </div>
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

      <div className="add-tenant">
        <button onClick={() => navigate('/request-tenant')}>Add new tenant</button>
      </div>

      {/* Possible Tenants Table */}
      <div className="tenant-list">
        <h2 className="table-title">Possible Tenants</h2>
        <button className="delete-button" onClick={() => handleDeleteTenants('possible')} disabled={selectedTenants.filter(item => item.startsWith('possible')).length === 0}>
          Delete Selected
        </button>
        <table className="tenant-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Housing #</th>
              <th>Tenant Name</th>
              <th>Rent</th>
              <th>Moving Date</th>
              <th>Move-out Date</th>
              <th>Current Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {possibleTenants.map((tenant, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedTenants.includes(`possible-${index}`)}
                    onChange={() => handleSelectTenant(index, 'possible')}
                  />
                </td>
                <td>{tenant.location}</td>
                <td>{tenant.name}</td>
                <td>{tenant.rent}</td>
                <td>{tenant.movingDate}</td>
                <td>{tenant.moveOutDate}</td>
                <td className={tenant.status.toLowerCase()}>
                  {tenant.status}
                </td>
                <td>
                  <button className="edit-button" onClick={() => handleTenantClick(tenant)}>Edit</button>
                  <button className="accept-button" onClick={() => handleAcceptTenant(index)}>Accept</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Current Tenants Table */}
      <div className="tenant-list">
        <h2 className="table-title">Current Tenants</h2>
        <button className="delete-button" onClick={() => handleDeleteTenants('current')} disabled={selectedTenants.filter(item => item.startsWith('current')).length === 0}>
          Delete Selected
        </button>
        <table className="tenant-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Housing #</th>
              <th>Tenant Name</th>
              <th>Rent</th>
              <th>Moving Date</th>
              <th>Move-out Date</th>
              <th>Compliant Status</th>
            </tr>
          </thead>
          <tbody>
            {currentTenants.map((tenant, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedTenants.includes(`current-${index}`)}
                    onChange={() => handleSelectTenant(index, 'current')}
                  />
                </td>
                <td>{tenant.location}</td>
                <td
                  className="tenant-name"
                  onClick={() => handleTenantClick(tenant)}
                >
                  {tenant.name}
                </td>
                <td>{tenant.rent}</td>
                <td>{tenant.movingDate}</td>
                <td>{tenant.moveOutDate}</td>
                <td className="compliant">{tenant.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AgentDashboard;
