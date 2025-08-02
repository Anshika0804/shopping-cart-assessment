// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Replace with your actual backend URL if needed
});

export default api;
