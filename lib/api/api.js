import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      try{
        // get new access token
        const res = api.get("/auth/refresh");

        // retry the request
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

export default api;