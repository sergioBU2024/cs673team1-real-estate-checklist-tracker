import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TenantContext } from './TenantContext';
import './RequestNewTenant.css';

function RequestNewTenant() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [applicants, setApplicants] = useState([{ firstName: '', middleName: '', lastName: '', email: '', phone: '' }]);
  const [taskFilePairs, setTaskFilePairs] = useState([{ task: '', file: null }]);

  const [location, setLocation] = useState('');
  const [rent, setRent] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [moveOutDate, setMoveOutDate] = useState('');
  const [publicLink, setPublicLink] = useState('');

  const navigate = useNavigate();
  const { tenants, setTenants } = useContext(TenantContext);

  useEffect(() => {
    const currentHour = new Date().getHours();
    setGreeting(currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening');
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleBack = () => navigate('/dashboard');
  const handleLogout = () => navigate('/');
  const handleSettings = () => navigate('/settings');

  const addNewApplicant = () => {
    setApplicants([...applicants, { firstName: '', middleName: '', lastName: '', email: '', phone: '' }]);
  };

  const handleInputChange = (index, event) => {
    const newApplicants = [...applicants];
    newApplicants[index][event.target.name] = event.target.value;
    setApplicants(newApplicants);
  };

  const handleRentChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value) {
      value = {value};
    }
    setRent(value);
  };

  const handleTaskChange = (index, event) => {
    const updatedPairs = [...taskFilePairs];
    updatedPairs[index].task = event.target.value;
    setTaskFilePairs(updatedPairs);
  };

  const handleFileUpload = (index, event) => {
    const updatedPairs = [...taskFilePairs];
    updatedPairs[index].file = event.target.files[0];
    setTaskFilePairs(updatedPairs);
  };

  const addTaskFilePair = () => {
    setTaskFilePairs([...taskFilePairs, { task: '', file: null }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTenant = {
      name: `${applicants[0]?.firstName || ''} ${applicants[0]?.middleName || ''} ${applicants[0]?.lastName || ''}`,
      email: applicants[0]?.email || '',
      phone: applicants[0]?.phone || '',
      location,
      rent,
      movingDate: moveInDate,
      moveOutDate,
      publicLink,
      tasks: taskFilePairs.map((pair) => ({
        task: pair.task,
        fileName: pair.file ? pair.file.name : '',
      })),
      status: 'Non-Compliant',
    };

    setTenants([...tenants, newTenant]);
    navigate('/dashboard');
  };

  return (
    <div className="request-tenant-container">
      <div className="header">
        <div className="logo-header" onClick={handleBack} style={{ cursor: 'pointer' }}>
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
      </div>

      <form className="tenant-form" onSubmit={handleSubmit}>
        {applicants.map((applicant, index) => (
          <div className="tenant-info" key={index}>
            <h3>Tenant Info {index + 1}</h3>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={applicant.firstName}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group">
                <label>Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  value={applicant.middleName}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={applicant.lastName}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={applicant.email}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={applicant.phone}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="task-request">
          <h3>Request Task</h3>
          {taskFilePairs.map((pair, index) => (
            <div key={index} className="form-row">
              <div className="form-group">
                <label>Task</label>
                <select value={pair.task} onChange={(event) => handleTaskChange(index, event)}>
                  <option value="">Select a task</option>
                  <option value="Upload ID/Passport">Upload ID/Passport</option>
                  <option value="I-20">I-20</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Document {index + 1}</label>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg"
                  onChange={(event) => handleFileUpload(index, event)}
                />
              </div>
            </div>
          ))}

          <button type="button" className="add-upload-field" onClick={addTaskFilePair}>
            Add Upload Field
          </button>
        </div>

        <button className="add-applicant" type="button" onClick={addNewApplicant}>
          Add new Applicant
        </button>

        <div className="housing-info">
          <h3>Housing Info</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Rent</label>
              <input type="text" value={rent} onChange={handleRentChange} placeholder="Enter rent" />
            </div>
            <div className="form-group">
              <label>Move-in Date</label>
              <input type="date" value={moveInDate} onChange={(e) => setMoveInDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Move-out Date</label>
              <input type="date" value={moveOutDate} onChange={(e) => setMoveOutDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Public Link</label>
              <input type="text" value={publicLink} onChange={(e) => setPublicLink(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button type="button" onClick={handleBack}>
            Back
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default RequestNewTenant;
