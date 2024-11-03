import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { loginUser } from '../controllers/usersController';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email, password };

    try {
        const data = await loginUser(loginData.email, loginData.password);
        console.log(data);

        const userRole = data.role;

        if (userRole === 'Agent') {
          navigate('/dashboard');
        } else if (userRole === 'Client') {
          navigate('/client');
        } else if (userRole === 'Broker') {
          navigate('/broker-home');
        }

    } catch (error) {
      console.error("Error:", error);
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
        <p>Don’t have an account yet? <a href="/signup">Sign Up</a></p>
        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="yourname@bu.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              required
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