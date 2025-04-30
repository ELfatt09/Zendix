import {createContext, useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword, validateUsername } from './utils/validation'


import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(true);
  const [verified, setVerified] = useState(true);
  const [loading, setLoading] = useState(false);

  const register = (email, password, confirmPassword, username) => {
    if (!validateEmail(email)) {
      setError('Invalid email');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!validateUsername(username)) {
      setError('Username must be at least 3 characters long and contain only letters, numbers, and underscores');
      return;
    }

    axios.post('http://localhost:8080/auth/register', {
      "Email": email,
      "Password": password,
      "Username": username,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res.data);
        alert('Registration successful');
      })
      .catch((err) => {
        console.error(err);
        setError('Registration failed');
      });
  };

  const login = (email, password) => {
    if (!validateEmail(email)) {
      setError('Invalid email');
      return;
    }
    axios
      .post('http://localhost:8080/auth/login', { email, password }, { headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        setAuth(true);
        navigate('/');
        getAuthenticatedUser(); // Fetch user data after login
      })
      .catch((err) => setError(err.response.data.error));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    setUser(null);
    window.location.reload();
  };

  const verifyEmail = (VerificationToken) => { 
    axios
      .post('http://localhost:8080/auth/verification', { 'Token': VerificationToken }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` } })
      .then((res) => { 
        if (res.data) {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          console.log(err.response.data.error);
        }
      });

  }

  const getToken = () => localStorage.getItem('token');

  // Dalam AuthContext.js
const isAuthenticated = async () => {
  const token = getToken();
  setLoading(true); // Mulai loading
  if (!token) {
    await setAuth(false);
    setLoading(false); // Selesai loading
    return false;
  }
  try {
    const res = await axios.get('http://localhost:8080/auth/validate', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setAuth(res.data.auth);
    setLoading(false); // Selesai loading
    return res.data.auth;
  } catch (err) {
    logout();
    setLoading(false); // Selesai loading
    return false;
  }
  };
  
  const isVerified = async () => {
    const token = getToken();
    setLoading(true); // Mulai loading
    if (!token) {
      await setVerified(false);
      setLoading(false); // Selesai loading
      return false;
    }
    try {
      const res = await axios.get('http://localhost:8080/auth/verified', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVerified(res.data.verified);
      setLoading(false); // Selesai loading
      return res.data.verified;
    } catch (err) {
      setLoading(false); // Selesai loading
      return false;
    }
  };

  const getAuthenticatedUser = async () => {
    try {
      const res = await axios.get('http://localhost:8080/auth/data', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setUser(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
      return err.response.data;
    }
  };

  const edit = (username, bio, pfpPath, JobID) => {
    const token = localStorage.getItem('token');
    const res = axios.put('http://localhost:8080/profile/edit', {
      "Username": username,
      "Bio": bio,
      "PfpPath": pfpPath,
      "JobID": JobID
    }, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(() => getAuthenticatedUser()) // Update user data after editing
      .catch(err => console.error(err));
  };

  useEffect(() => {
    isAuthenticated().then((authStatus) => {
      if (authStatus) {
        isVerified();
        setToken(getToken());
        getAuthenticatedUser();
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, auth, verified, loading, error, token, register, login, logout, edit, verifyEmail, }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext)
}



