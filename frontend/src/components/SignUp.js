import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Validate input and handle sign-up logic here
    navigate('/'); // Redirect to login after successful sign-up
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>Name</label>
          <input
            value={name}
            type = "text"
            onChange={(e) => setName(e.target.value)}
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
          <label>Phone</label>
          <input
            value={phone}
            type = "tel"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
            >
                <option value="">Select Role</option>
                <option value="Agent">Agent</option>
                <option value="Broker">Broker</option>
                <option value="Client">Client</option>
            </select>
        </div>        
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/" onClick={() => navigate('/')}>Log In</a></p>
    </div>
  );
}

export default SignUp;
