import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

const API_BaseURL = "http://localhost:5000/api";

const useAxios = () => {
  const { accessToken } = useAuth();

  const axiosInstance = axios.create({
    baseURL: API_BaseURL,
  });

  axiosInstance.interceptors.request.use((config) => {
    if (accessToken.length != 0) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return axiosInstance;
};

export default useAxios;
