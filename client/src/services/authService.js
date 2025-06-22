import api from '../api';

// Register user with username, email, and password
const register = (username, email, password) => {
  return api.post('/auth/register', { username, email, password });
};

// Login user with either email or username
const login = async (identifier, password) => {
  const response = await api.post('/auth/login', { identifier, password });
  if (response.data && response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// New function for Google Sign-In
const loginWithGoogle = async (credential) => {
    const response = await api.post('/auth/google', { credential });
    if (response.data && response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Logout function (no change)
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
  loginWithGoogle,
};

export default authService;