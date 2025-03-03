import useAxios from "./axiosInstance";

export interface newUser {
  username: string;
  email: string;
  password: string;
}

export type StatusCode = 409 | 200;

const userServices = () => {
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
    createUser: async (newUser: newUser): Promise<StatusCode> => {
      try {
        const response = await axiosInstance.post("/users/sign-up", newUser);

        if (response.status === 200) {
          return 200;
        }

        if (
          response.status === 409 &&
          response.data.message === "email already in use"
        )
          return 409;
      } catch (err: any) {
        console.log(err.response.status);
        return err.response.status;
      }
    },
  };
};

export default userServices;
