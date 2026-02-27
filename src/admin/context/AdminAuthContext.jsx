import { useMemo, useState } from 'react';
import { adminConfig } from '../config/adminConfig';
import { authService } from '../services/authService';
import { AdminAuthContext } from './AdminAuthContextBase';

const getStoredAuth = () => {
  const storedToken = localStorage.getItem(adminConfig.tokenKey) || '';
  const storedUserRaw = localStorage.getItem(adminConfig.userKey);

  let storedUser = null;
  if (storedUserRaw) {
    try {
      storedUser = JSON.parse(storedUserRaw);
    } catch {
      storedUser = null;
    }
  }

  return { storedToken, storedUser };
};

export const AdminAuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const { storedToken, storedUser } = getStoredAuth();
    return {
      token: storedToken,
      adminUser: storedUser,
    };
  });

  const login = async (payload) => {
    const response = await authService.login(payload);
    setAuthState({ token: response.token, adminUser: response.user });
    localStorage.setItem(adminConfig.tokenKey, response.token);
    localStorage.setItem(adminConfig.userKey, JSON.stringify(response.user));
    return response;
  };

  const logout = () => {
    setAuthState({ token: '', adminUser: null });
    localStorage.removeItem(adminConfig.tokenKey);
    localStorage.removeItem(adminConfig.userKey);
  };

  const value = useMemo(() => ({
    adminUser: authState.adminUser,
    token: authState.token,
    isAuthenticated: Boolean(authState.token && authState.adminUser?.role === 'admin'),
    isBootstrapping: false,
    login,
    logout,
  }), [authState]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

