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
  const initialToken = getToken();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(initialToken);
  const [loading, setLoading] = useState(Boolean(initialToken));

  const logout = useCallback(() => {
    clearToken();
    setToken(null);
    setUser(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!token) return;

    let isCancelled = false;

    const hydrateUser = async () => {
      try {
        const profile = await getMe(token);
        if (!isCancelled) setUser(profile);
      } catch (error) {
        console.error(error);
        if (!isCancelled) {
          clearToken();
          setToken(null);
          setUser(null);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    hydrateUser();

    return () => {
      isCancelled = true;
    };
  }, [token]);

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
