import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

const API_BaseURL = "http://localhost:5000/api";

const refreshToken = async () => {
  const { userState, setUser } = useAuth();

  const response = await axios.post("/refresh", {}, { withCredentials: true });
  setUser({});
};

const useAxios = () => {
  const { userState } = useAuth();
  const { accessToken } = userState;

  const axiosInstance = axios.create({
    baseURL: API_BaseURL,
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      if (accessToken.length != 0) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  // axiosInstance.interceptors.request.use( (response) => response, async (err) => {

  //   const originalReq = err.config

  //   if(err.response.status === 401 && !originalReq._retry) originalReq._retry = true

  //   try {
  //     const newAccessToken = await refreshToken()
  //   }
  // })

  return axiosInstance;
};

export default useAxios;
