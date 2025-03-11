import useAxios, { baseURL } from "./axiosInstance";
import axios from "axios";
export interface newUser {
  username: string;
  email: string;
  password: string;
}

export type StatusCode = 409 | 200;

const userServices = () => {
  const API_BaseURL = baseURL;
  const axiosInstance = useAxios();

  return {
    /**
     * Fetches username based on the given id
     * @param id - id of the user to to look up
     * @returns the username of the user
     */
    fetchUsername: async (id: string): Promise<string> => {
      try {
        const response = await axiosInstance.get(`/users/username/${id}`);
        if (response) return response.data.username;
        else return "Unkown Author";
      } catch (err) {
        console.log(err);
        return "Unknown Author";
      }
    },

    /***/
    userCreate: async (newUser: newUser): Promise<any | undefined> => {
      try {
        const response = await axios.post(
          `${API_BaseURL}/users/sign-up`,
          newUser
        );

        return response;
      } catch (err) {
        return err;
      }
    },

    /**
     * user login and sets the user state
     * @param email - email of the user
     * @param password - password of the user
     * @returns response from the server
     */
    userAuthenticate: async (
      email: string,
      password: string
    ): Promise<any | undefined> => {
      try {
        // We do not use the axiosInstance because we only want to run it once
        const response = await axios.post(
          `${API_BaseURL}/users/login`,
          { email: email, password: password },
          { withCredentials: true }
        );
        return response;
      } catch (err) {
        return err;
      }
    },

    userLogout: async (): Promise<any | undefined> => {
      try {
        const response = await axiosInstance.get("/users/logout", {
          withCredentials: true,
        });
        return response;
      } catch (err) {
        return err;
      }
    },
  };
};

export default userServices;
