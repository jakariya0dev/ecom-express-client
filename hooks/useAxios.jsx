"use client";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api/api";
import { useEffect } from "react";

export const useAxios = () => {

  const { accessToken, setAccessToken, logout } = useAuth();

  useEffect(() => {

    // Add a request interceptor
    const requestInterceptor = api.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    // Add a response interceptor
    const responseInterceptor = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            const res = await api.get("/auth/refresh");
            setAccessToken(res.data.accessToken);

            // retry original request
            error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
            return api(error.config);
          } catch (err) {
            logout();
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );

    // clean up interceptors on unmount
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, setAccessToken, logout]);

  return api;
};
