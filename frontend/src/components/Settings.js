import React, { useState } from 'react';
import './Settings.css';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const [firstName, setFirstName] = useState("Abraham");
  const [lastName, setLastName] = useState("Lincoln");
  const [phoneNumber, setPhoneNumber] = useState("555-123-4567");
  const [email, setEmail] = useState("abraham.lincoln@domain.com");
  const [officeLocation, setOfficeLocation] = useState("Washington D.C.");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSave = () => {
    // Logic to save data
    console.log({
      firstName,
      lastName,
      phoneNumber,
      email,
      officeLocation,
      password,
    });
    navigate(-1); // Go back to the previous page after saving
  };

  const handleClose = () => {
    navigate(-1); // Go back to the previous page without saving
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form className="settings-form">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Office Location</label>
          <input
            type="text"
            value={officeLocation}
            onChange={(e) => setOfficeLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Reset Password</label>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button type="button" onClick={handleClose} className="close-btn">Close</button>
          <button type="button" onClick={handleSave} className="save-btn">Save</button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
