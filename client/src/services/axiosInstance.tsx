import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useRef } from "react";

const API_BaseURL = "https://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_BaseURL,
});

const useAxios = () => {
  const { userState, setUser } = useAuth();
  const latestToken = useRef(userState.accessToken);

  useEffect(() => {
    latestToken.current = userState.accessToken;
    console.log(userState);
  }, [userState.accessToken]);

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (latestToken.current) {
          config.headers.Authorization = `Bearer ${latestToken.current}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    // Response Interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err) => {
        const originalRequest = err.config;
        if (err.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            console.log("attempting refresh...");
            const res = await axiosInstance.post(
              "/refresh",
              {},
              { withCredentials: true }
            );

            if (res.status === 200) {
              const newAccessToken = res.data.accessToken;
              latestToken.current = newAccessToken;
              setUser({ newAccessToken: newAccessToken });
            }
            return axiosInstance(originalRequest);
          } catch (err) {
            setUser({ newAccessToken: "" });
          }
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return axiosInstance;
};

export default useAxios;
