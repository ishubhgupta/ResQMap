import React, { useState } from 'react';
import api from '../api';
import './login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password });
      if (response.data.success) {
        alert('Login successful');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="main-container">
    <div className="split-container">
      {/* Left: Login */}
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
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
           <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
          <button type="submit">Login</button>
          
          <p className="signup-link">
              Haven't created an account yet? <a href="/signup">Signup</a>
            </p>
        </form>
      </div>
  
      {/* Right: Image */}
      <div className="image-container"></div>
    </div>
  </div>
  

  );
};

export default Login;