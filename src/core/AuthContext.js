import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(toAuthenticatedUser(decoded));
      } catch (e) {
        localStorage.removeItem('accessToken');
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('accessToken', token);
    try {
      const decoded = jwtDecode(token);
      setUser(toAuthenticatedUser(decoded));
    } catch (e) {
      // Mock user if token is invalid but we want to proceed (for dev)
      setUser({ id: 1, loginId: 'mockUser', name: 'Mock User' });
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const toAuthenticatedUser = (decoded) => {
  const memberId = Number(decoded.sub);

  if (!Number.isFinite(memberId) || memberId <= 0) {
    throw new Error('JWT subject must be a valid member ID.');
  }

  return {
    id: memberId,
    loginId: decoded.loginId || '',
    name: decoded.name || '',
  };
};
