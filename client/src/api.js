import axios from 'axios';

// --- THIS IS OUR DEBUGGING LINE ---
// It will print the value of the environment variable as seen by the live app.
console.log("VITE_API_URL seen by the app:", import.meta.env.VITE_API_URL);
// ---------------------------------

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
});

export default api;