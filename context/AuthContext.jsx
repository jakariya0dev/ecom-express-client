"use client"; 

import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/refresh");
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
      } catch (err) {
        console.log("Not logged in");
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // login function
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
    return res;
  };

  // logout function
  const logout = async () => {
    await api.post("/auth/logout");
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        logout,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
