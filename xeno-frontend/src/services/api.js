// shopify-frontend/src/services/api.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL of your backend API
});

// Add the token to the headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get token from localStorage or cookies (wherever you store it)
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;  // Add Authorization header
  }
  return config;
});

export default api;
