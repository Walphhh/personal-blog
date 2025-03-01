import axios from "axios";
import useAxios from "./axiosInstance";
import userServices from "./userServices";

// This file includes all the blog realated APIs as well as the the Blog Interface
export interface Blog {
  _id?: string;
  title: string;
  description: string;
  body: string;
  authorUserID: string;
}

export interface BlogWithAuthorName extends Blog {
  authorName: string;
}

const blogServices = () => {
  const axiosInstance = useAxios();
  const { fetchUsername } = userServices();

  // Always declare the promise types with async function in typescript

  /**
   * Fetches the list of available blogs on the server
   * @returns list of blogs
   */
  return {
    fetchBlogs: async (): Promise<BlogWithAuthorName[] | undefined> => {
      try {
        const response = await axiosInstance.get(`/blogs`);
        if (!response.data) {
          return undefined;
        } else {
          const blogs: Blog[] = response.data;
          // Fetches usernames and maps it as a key-value pair stored in a new variable
          const updatedBlogs: BlogWithAuthorName[] = await Promise.all(
            blogs.map(async (currentBlog) => {
              if (currentBlog.authorUserID) {
                const authorName = await fetchUsername(
                  currentBlog.authorUserID
                );
                return { ...currentBlog, authorName: authorName };
              } else {
                return { ...currentBlog, authorName: "Unkown" };
              }
            })
          );
          return updatedBlogs;
        }
      } catch (err) {
        console.log("Error fetching blogs: ", err);
        return undefined;
      }
    },

    /**
     * Fetches a specific blog from the server
     * @param blogID - the id of the blog to be fetched
     */
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
            authorUserID: "Unauthorised",
          };
        }
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          console.log("In Client: Blog Not Found");
          return {
            _id: blogID,
            title: "Blog Not Found",
            description: "Blog Not Found",
            body: "Blog Not Found",
            authorUserID: "Blog Not Found",
          };
        }
        console.log(err);
      }
    },

    /**
     * Deletes a blog from the server
     * @param blogID - The id of the blog to be deleted
     * @returns a promise that resolves to the successful deletion of the blog or undefined
     */
    deleteBlogByID: async (blogID: string): Promise<Boolean | undefined> => {
      try {
        return await axiosInstance.delete(`/blogs/${blogID}`);
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Posts a new blog to the server.
     * @param newBlog - The blog to be posted.
     * @returns A promise that resolves to the posted blog or undefined.
     */
    postBlog: async (newBlog: Blog): Promise<Boolean | undefined> => {
      try {
        return await axiosInstance.post(`/blogs`, newBlog);
      } catch (err) {
        console.log(err);
      }
    },
  };
};

export default blogServices;
