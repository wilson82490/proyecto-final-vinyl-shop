import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";
import {
  loginUser,
  registerUser,
  getMe,
  saveToken,
  getToken,
  clearToken,
} from "../services/authService";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => getToken());
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    clearToken();
    setToken(null);
    setUser(null);
  }, []);

  const hydrateUser = useCallback(async (activeToken) => {
    if (!activeToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const profile = await getMe(activeToken);
      setUser(profile);
    } catch (error) {
      console.error(error);
      clearToken();
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    hydrateUser(token);
  }, [token, hydrateUser]);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    saveToken(data.token);
    setToken(data.token);
    setUser({ id: data.id, name: data.name, email: data.email });
    return data;
  };

  const register = async (payload) => {
    const data = await registerUser(payload);
    saveToken(data.token);
    setToken(data.token);
    setUser({ id: data.id, name: data.name, email: data.email });
    return data;
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      logout,
    }),
    [user, token, loading, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
