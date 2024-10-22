import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TenantContext } from './TenantContext';
import './AgentClientPage.css';

function AgentClientPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tenants, setTenants } = useContext(TenantContext);
  const [editableTenant, setEditableTenant] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (location.state && location.state.tenant) {
      const tenantId = location.state.tenant.id;
      const tenantData = tenants.find((t) => t.id === tenantId);
      if (tenantData) {
        setEditableTenant({ ...tenantData });
      }
    }
  }, [location.state, tenants]);

  useEffect(() => {
    if (editableTenant) {
      const rent = parseFloat(editableTenant.rent) || 0;
      const deposit = parseFloat(editableTenant.deposit) || 0;
      const lateFees = parseFloat(editableTenant.lateFees) || 0;
      const brokerFees = parseFloat(editableTenant.brokerFees) || 0;

      const total = rent + deposit + lateFees + brokerFees;
      setEditableTenant((prevState) => ({
        ...prevState,
        amountDue: total,
      }));

      // Automatically change status to 'Payment Late' if due date has passed
      if (editableTenant.dueDate && new Date(editableTenant.dueDate) < new Date()) {
        setEditableTenant((prevState) => ({
          ...prevState,
          status: 'Payment Late',
        }));
      }
    }
  }, [editableTenant]);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableTenant((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setEditableTenant((prevState) => ({ ...prevState, status: value }));
  };

  const handleSave = () => {
    if (editableTenant) {
      const tenantIndex = tenants.findIndex((t) => t.id === editableTenant.id);
      if (tenantIndex !== -1) {
        const updatedTenants = [...tenants];
        updatedTenants[tenantIndex] = editableTenant;
        setTenants(updatedTenants);
        setIsEditing(false);
      }
    }
  };

  if (!editableTenant) {
    return <div>No tenant information available</div>;
  }

  return (
    <div className="agent-client-page-container">
      <header className="header">
        <div className="logo-header" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          <img src="/logo.png" alt="RealList Logo" />
          <div className="logo-text">
            <h1>RealList</h1>
            <p>Unlock simplicity in your rental journey!</p>
          </div>
        </div>
        <div className="welcome-text">
          <p className="greeting">Welcome,</p>
          <div className="user-dropdown">
            <span className="username">Mr. Abraham Lincoln</span>
            <span className="arrow">&#9660;</span>
          </div>
        </div>
      </header>

      <h2 className="tenant-information-title">Tenant Information</h2>

      <div className="tenant-housing-wrapper">
        <div className="info-section tenant-info">
          <h3>Tenant Info</h3>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" value={editableTenant.firstName || ''} disabled />
          </div>
          <div className="form-group">
            <label>Middle Name</label>
            <input type="text" value={editableTenant.middleName || ''} disabled />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" value={editableTenant.lastName || ''} disabled />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={editableTenant.email || ''} disabled />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" value={editableTenant.phone || ''} disabled />
          </div>
        </div>

        <div className="info-section housing-info">
          <h3>Housing Info</h3>
          <div className="form-group">
            <label>Location</label>
            <input type="text" value={editableTenant.location || ''} disabled />
          </div>
          <div className="form-group">
            <label>Rent</label>
            <input type="text" value={editableTenant.rent || ''} disabled />
          </div>
          <div className="form-group">
            <label>Move-in Date</label>
            <input type="date" value={editableTenant.movingDate || ''} disabled />
          </div>
          <div className="form-group">
            <label>Move-out Date</label>
            <input type="date" value={editableTenant.moveOutDate || ''} disabled />
          </div>
          <div className="form-group">
            <label>Public Link</label>
            <input type="text" value={editableTenant.publicLink || ''} disabled />
          </div>
        </div>
      </div>

      <div className="tenant-documents">
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

      <div className="payment-info">
        <div className="payment-info-header">
          <h3>Payment Info</h3>
          {isEditing ? (
            <button className="edit-button" onClick={handleSave}>Save</button>
          ) : (
            <button className="edit-button" onClick={toggleEditMode}>Edit</button>
          )}
        </div>
        <table>
          <thead>
            <tr>
              <th>Rent</th>
              <th>Deposit</th>
              <th>Late Fees</th>
              <th>Broker Fees</th>
              <th>Due Date</th>
              <th>Compliant Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{isEditing ? <input type="text" name="rent" value={editableTenant.rent || ''} onChange={handleInputChange} /> : editableTenant.rent}</td>
              <td>{isEditing ? <input type="text" name="deposit" value={editableTenant.deposit || ''} onChange={handleInputChange} /> : editableTenant.deposit || '—'}</td>
              <td>{isEditing ? <input type="text" name="lateFees" value={editableTenant.lateFees || ''} onChange={handleInputChange} /> : editableTenant.lateFees || '—'}</td>
              <td>{isEditing ? <input type="text" name="brokerFees" value={editableTenant.brokerFees || ''} onChange={handleInputChange} /> : editableTenant.brokerFees || '—'}</td>
              <td>{isEditing ? <input type="date" name="dueDate" value={editableTenant.dueDate || ''} onChange={handleInputChange} /> : editableTenant.dueDate || '—'}</td>
              <td>
                {isEditing ? (
                  <select name="status" value={editableTenant.status || ''} onChange={handleStatusChange}>
                    <option value="Compliant">Compliant</option>
                    <option value="Non-Compliant">Non-Compliant</option>
                    <option value="Payment Late">Payment Late</option>
                  </select>
                ) : (
                  <span className={editableTenant.status?.toLowerCase()}>{editableTenant.status}</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="amount-due">
          <span>Amount Due: {editableTenant.amountDue || '0$'}</span>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate('/dashboard')}>Close</button>
      </div>
    </div>
  );
}

export default AgentClientPage;
