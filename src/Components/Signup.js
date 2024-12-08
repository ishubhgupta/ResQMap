import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import api from '../api';
import './signup.css'; // Import the CSS file

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/signup', { name, email, password });
      if (response.data.success) {
        alert('Signup successful. Please verify your email.');
        navigate('/verify-email'); // Redirect to verify-email page
      }
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="main-container">
      <div className="split-container">
        {/* Left: Image */}
        <div className="image-container"></div>

        {/* Right: Signup form */}
        <div className="signup-container">
          <form onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Signup</button>
            <a href="/login" className="login-link">Already have an account? Login</a>
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default Signup;