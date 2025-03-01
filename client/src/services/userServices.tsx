import useAxios from "./axiosInstance";

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
  };
};

export default userServices;
