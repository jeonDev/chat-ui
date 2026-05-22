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
        // Assuming the backend JWT has 'sub' as loginId and 'id' as memberId
        // If not, we might need a separate /me endpoint
        setUser({
          id: decoded.id || 1, // Fallback for now since backend is TODO
          loginId: decoded.sub,
          name: decoded.name || decoded.sub,
        });
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
      setUser({
        id: decoded.id || 1,
        loginId: decoded.sub,
        name: decoded.name || decoded.sub,
      });
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
