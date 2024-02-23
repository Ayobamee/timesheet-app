import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // Update with the actual URL of your server

export const signup = (email, password) => {
  return axios.post(`${API_URL}/signup`, { email, password });
};

export const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};
