// src/components/ResetPassword.js
import React, { useState } from 'react';
import api from '../api';

const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/reset-password/${token}`, { password });
      if (response.data.success) {
        alert('Password reset successful');
       
      }
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Reset Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
