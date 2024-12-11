// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9000/api/user', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
