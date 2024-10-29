import React, { useRef, useState } from 'react';
import './ClientPageMultipleTenants.css';

function ClientPageMultipleTenants() {
  const [tenants, setTenants] = useState([createEmptyTenant()]);

  // Function to create an empty tenant object
  function createEmptyTenant() {
    return {
      firstNameRef: useRef(null),
      middleNameRef: useRef(null),
      lastNameRef: useRef(null),
      emailRef: useRef(null),
      phoneRef: useRef(null),
      idPassportRef: useRef(null),
      bankStatementRef: useRef(null),
      i20Ref: useRef(null),
      firstMonthRef: useRef(null),
      lastMonthRef: useRef(null),
      securityDepositRef: useRef(null),
      brokerFeeRef: useRef(null)
    };
  }

  // Function to add a new tenant section
  const addTenant = () => {
    setTenants([...tenants, createEmptyTenant()]);
  };

  // Function to handle file uploads
  const handleUploadClick = (ref) => ref.current.click();

  const handleFileChange = (e, docType) => {
    const file = e.target.files[0];
    if (file) alert(`Selected file for ${docType}: ${file.name}`);
  };

  return (
    <div className="client-page-container">
      <header className="header">
        <div className="logo-header">
          <img src="/logo.png" alt="RealList Logo" />
          <div className="logo-text">
            <h1>RealList</h1>
            <p>Unlock simplicity in your rental journey!</p>
          </div>
        </div>
        <div className="welcome-text">
          <p>Welcome,</p>
          <p>Mr. Abraham Lincoln</p>
          <span className="arrow">&#9660;</span>
          <div className="dropdown-menu">
            <ul>
              <li>Settings</li>
              <li>Log Out</li>
            </ul>
          </div>
        </div>
      </header>

      <h2 className="title">Tenant Housing Registration - Multiple Tenants</h2>

      <div className="main-content">
        {tenants.map((tenant, index) => (
          <div key={index} className="tenant-section">
            <h3>Tenant {index + 1} Info</h3>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" ref={tenant.firstNameRef} />
            </div>
            <div className="form-group">
              <label>Middle Name</label>
              <input type="text" ref={tenant.middleNameRef} />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" ref={tenant.lastNameRef} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" ref={tenant.emailRef} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" ref={tenant.phoneRef} />
            </div>

            <h3>Tenant Documents</h3>
            <div className="document-item">
              <span>ID/Passport</span>
              <button onClick={() => handleUploadClick(tenant.idPassportRef)}>Upload Document</button>
              <input
                type="file"
                ref={tenant.idPassportRef}
                onChange={(e) => handleFileChange(e, 'ID/Passport')}
                style={{ display: 'none' }}
              />
            </div>
            <div className="document-item">
              <span>Bank Statement</span>
              <button onClick={() => handleUploadClick(tenant.bankStatementRef)}>Upload Document</button>
              <input
                type="file"
                ref={tenant.bankStatementRef}
                onChange={(e) => handleFileChange(e, 'Bank Statement')}
                style={{ display: 'none' }}
              />
            </div>
            <div className="document-item">
              <span>I-20</span>
              <button onClick={() => handleUploadClick(tenant.i20Ref)}>Upload Document</button>
              <input
                type="file"
                ref={tenant.i20Ref}
                onChange={(e) => handleFileChange(e, 'I-20')}
                style={{ display: 'none' }}
              />
            </div>

            <h3>Tenant Payment Screenshots</h3>
            <div className="document-item">
              <span>First Month</span>
              <button onClick={() => handleUploadClick(tenant.firstMonthRef)}>Upload</button>
              <input
                type="file"
                ref={tenant.firstMonthRef}
                onChange={(e) => handleFileChange(e, 'First Month')}
                style={{ display: 'none' }}
              />
            </div>
            <div className="document-item">
              <span>Last Month</span>
              <button onClick={() => handleUploadClick(tenant.lastMonthRef)}>Upload</button>
              <input
                type="file"
                ref={tenant.lastMonthRef}
                onChange={(e) => handleFileChange(e, 'Last Month')}
                style={{ display: 'none' }}
              />
            </div>
            <div className="document-item">
              <span>Security Deposit</span>
              <button onClick={() => handleUploadClick(tenant.securityDepositRef)}>Upload</button>
              <input
                type="file"
                ref={tenant.securityDepositRef}
                onChange={(e) => handleFileChange(e, 'Security Deposit')}
                style={{ display: 'none' }}
              />
            </div>
            <div className="document-item">
              <span>Broker Fee</span>
              <button onClick={() => handleUploadClick(tenant.brokerFeeRef)}>Upload</button>
              <input
                type="file"
                ref={tenant.brokerFeeRef}
                onChange={(e) => handleFileChange(e, 'Broker Fee')}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="submit-section">
        <button type="button" onClick={addTenant}>Add New Tenant</button>
        <button type="button">Submit All Tenants</button>
      </div>
    </div>
  );
}

export default ClientPageMultipleTenants;
