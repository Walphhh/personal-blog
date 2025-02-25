import axios from "axios";
import useAxios from "./axiosInstance";

// This file includes all the blog realated APIs as well as the the Blog Interface
export interface Blog {
  _id?: string;
  title: string;
  description: string;
  body: string;
}

const blogServices = () => {
  const axiosInstance = useAxios();

  // Always declare the promise types with async function in typescript
  // Fetches and Returns an array of Blog objects
  return {
    fetchBlogs: async (): Promise<Blog[] | undefined> => {
      try {
        const response = await axiosInstance.get(`/blogs`);
        if (response.data) return response.data as Blog[];
      } catch (err) {
        console.log("Error fetching blogs: ", err);
        return undefined;
      }
    },

    // Fetches and Returns a Blog based on ID
    fetchBlogByID: async (blogID: string): Promise<Blog | undefined> => {
      try {
        const response = await axiosInstance.get(`/blogs/${blogID}`);
        return response.data as Blog;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          return {
            _id: blogID,
            title: "Unauthorised",
            description: "Unauthorised",
            body: "Unauthorised",
          };
        }
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          console.log("In Client: Blog Not Found");
          return {
            _id: blogID,
            title: "Blog Not Found",
            description: "Blog Not Found",
            body: "Blog Not Found",
          };
        }
        console.log(err);
      }
    },

    deleteBlogByID: async (blogID: string): Promise<Boolean | undefined> => {
      try {
        return await axiosInstance.delete(`/blogs/${blogID}`);
      } catch (err) {
        console.log(err);
      }
    },

    createBlog: async (newBlog: Blog): Promise<Boolean | undefined> => {
      try {
        return await axiosInstance.post(`/blogs`, newBlog);
      } catch (err) {
        console.log(err);
      }
    },
  };
};

export default blogServices;
