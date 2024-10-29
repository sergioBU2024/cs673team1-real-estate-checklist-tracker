import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { loginUser } from '../controllers/usersController'; // Adjust the import path as needed

function Login() {
  const [role, setRole] = useState('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password, role);
      console.log(data);

      // Save token to local storage if needed
      localStorage.setItem('token', data.token);

      if (role === 'agent') {
        navigate('/dashboard'); // Navigate to the agent dashboard after login
      } else {
        alert(`Logged in as ${role}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
      </div>
      <div className="login-right">
        <h1>Login</h1>
        <p>Don’t have an account yet? <a href="#">Sign Up</a></p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          {/* Role selection dropdown */}
          <div className="form-group">
            <label>Select Role</label>
            <select name="userRole" value={role} onChange={handleRoleChange}>
              <option value="client">Client</option>
              <option value="broker">Broker</option>
              <option value="agent">Agent</option>
            </select>
          </div>

          {/* Email field */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="yourname@bu.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password field */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <div className="form-group">
            <input type="checkbox" /> <label>Remember Me</label>
          </div>

          {/* Submit button */}
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
