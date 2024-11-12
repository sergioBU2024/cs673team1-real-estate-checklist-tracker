import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import { registerUser } from '../../controllers/usersController';
import { UserContext } from '../../contexts/UserContext';
import Alert from '../Alert';

function SignUp() {
  const { setUser } = useContext(UserContext);  // Use context to set user data
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [officeLocation, setOfficeLocation] = useState('');
  const [error, setError] = useState(null);

  const role = 'Agent'; // Set role to 'Agent' by default

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const data = await registerUser(
        firstName,
        lastName,
        email,
        password,
        role,
        officeLocation,
        phoneNumber
      );

      setUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email,
        role: data.role,
        token: data.token,
      });

      navigate('/dashboard'); // Redirect to dashboard after sign-up
    } catch (err) {
      setError(err.message); // Set error for Alert component
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
      </div>
      <div className="signup-right">
        <h1>Sign Up as Agent</h1>
        <p>Already have an account? <a href="/login">Log In</a></p>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          {/* Office Location field, required for "Agent" role */}
          <div className="form-group">
            <label>Office Location</label>
            <input
              type="text"
              value={officeLocation}
              onChange={(e) => setOfficeLocation(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        {/* Display error alert if there’s an error */}
        {error && <Alert msg={error} />}
      </div>
    </div>
  );
}

export default SignUp;
