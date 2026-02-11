import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Verify token and get user data
      axios
        .get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          // Token is invalid, clear it
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { user, access_token } = response.data;

      // Store token
      localStorage.setItem('access_token', access_token);

      // Set user state
      setUser(user);

      // Navigate based on role
      navigateByRole(user.role);

      return user;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);

      const { user, access_token } = response.data;

      // Store token
      localStorage.setItem('access_token', access_token);

      // Set user state
      setUser(user);

      // Navigate based on role
      navigateByRole(user.role);

      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Clear tokens
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Clear user state
    setUser(null);

    // Navigate to login
    navigate('/login');
  };

  const navigateByRole = (role) => {
    switch (role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'provider':
        navigate('/dashboard');
        break;
      case 'customer':
      default:
        navigate('/shop');
        break;
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
