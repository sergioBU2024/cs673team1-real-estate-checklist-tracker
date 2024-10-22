import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [role, setRole] = useState('client');
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'agent') {
      navigate('/dashboard'); // Navigate to the agent dashboard after login
    } else {
      alert(`Logged in as ${role}`);
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
            <input type="email" placeholder="yourname@bu.edu" />
          </div>

          {/* Password field */}
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="**********" />
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
