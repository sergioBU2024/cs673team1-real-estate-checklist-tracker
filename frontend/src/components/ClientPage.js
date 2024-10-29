import React, { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientDataContext } from './ClientDataContext'; // Import context for client data
import './ClientPage.css';

function ClientPage() {
  const navigate = useNavigate();
  const { setClientData } = useContext(ClientDataContext); // Access the setClientData function from context
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    rent: '2500$',
    deposit: '2500$',
    dueDate: '10/5/2024',
    status: 'Non-Compliant'
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle dropdown menu
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // File upload references
  const idPassportRef = useRef(null);
  const bankStatementRef = useRef(null);
  const i20Ref = useRef(null);
  const firstMonthRef = useRef(null);
  const lastMonthRef = useRef(null);
  const securityDepositRef = useRef(null);
  const brokerFeeRef = useRef(null);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle file selection
  const handleFileChange = (e, docType) => {
    const file = e.target.files[0];
    if (file) alert(`Selected file for ${docType}: ${file.name}`);
  };

  // Handle submit to save data and navigate to ClientHomePage
  const handleSubmit = () => {
    setClientData(formData);
    navigate('/client-home');
  };

  return (
    <div className="client-page-container">
      {/* Header */}
      <header className="header">
        <div className="logo-header">
          <img src="/logo.png" alt="RealList Logo" />
          <div className="logo-text">
            <h1>RealList</h1>
            <p>Unlock simplicity in your rental journey!</p>
          </div>
        </div>
        
        {/* User Dropdown */}
        <div className="welcome-text" onClick={toggleDropdown}>
          <p>Welcome,</p>
          <p>Mr. Abraham Lincoln</p>
          <span className={`arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
          {dropdownOpen && (
            <div className="dropdown-menu show">
              <ul>
                <li onClick={() => navigate('/settings')}>Settings</li>
                <li onClick={() => navigate('/')}>Log Out</li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Title */}
      <h2 className="title">Tenant Housing Registration</h2>

      {/* Main Content */}
      <div className="main-content">
        {/* Tenant Info */}
        <div className="section tenant-info">
          <h3>Tenant Info</h3>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Middle Name</label>
            <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
          </div>
        </div>

        {/* Tenant Documents */}
        <div className="section tenant-documents">
          <h3>Tenant Documents</h3>
          <div className="document-item">
            <span>ID/Passport</span>
            <button onClick={() => idPassportRef.current.click()}>Upload Document</button>
            <input type="file" ref={idPassportRef} onChange={(e) => handleFileChange(e, 'ID/Passport')} style={{ display: 'none' }} />
          </div>
          <div className="document-item">
            <span>Bank Statement</span>
            <button onClick={() => bankStatementRef.current.click()}>Upload Document</button>
            <input type="file" ref={bankStatementRef} onChange={(e) => handleFileChange(e, 'Bank Statement')} style={{ display: 'none' }} />
          </div>
          <div className="document-item">
            <span>I-20</span>
            <button onClick={() => i20Ref.current.click()}>Upload Document</button>
            <input type="file" ref={i20Ref} onChange={(e) => handleFileChange(e, 'I-20')} style={{ display: 'none' }} />
          </div>
        </div>

        {/* Tenant Payment Screenshots */}
        <div className="section payment-screenshots">
          <h3>Tenant Payment Screenshots</h3>
          <div className="document-item">
            <span>First Month</span>
            <button onClick={() => firstMonthRef.current.click()}>Upload</button>
            <input type="file" ref={firstMonthRef} onChange={(e) => handleFileChange(e, 'First Month')} style={{ display: 'none' }} />
          </div>
          <div className="document-item">
            <span>Last Month</span>
            <button onClick={() => lastMonthRef.current.click()}>Upload</button>
            <input type="file" ref={lastMonthRef} onChange={(e) => handleFileChange(e, 'Last Month')} style={{ display: 'none' }} />
          </div>
          <div className="document-item">
            <span>Security Deposit</span>
            <button onClick={() => securityDepositRef.current.click()}>Upload</button>
            <input type="file" ref={securityDepositRef} onChange={(e) => handleFileChange(e, 'Security Deposit')} style={{ display: 'none' }} />
          </div>
          <div className="document-item">
            <span>Broker Fee</span>
            <button onClick={() => brokerFeeRef.current.click()}>Upload</button>
            <input type="file" ref={brokerFeeRef} onChange={(e) => handleFileChange(e, 'Broker Fee')} style={{ display: 'none' }} />
          </div>
        </div>

        {/* Notes */}
        <div className="section notes">
          <h3>Notes</h3>
          <textarea placeholder="5000 words" name="notes" value={formData.notes || ''} onChange={handleInputChange} />
        </div>
      </div>

      {/* Submit Button */}
      <div className="submit-section">
        <button type="button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default ClientPage;
