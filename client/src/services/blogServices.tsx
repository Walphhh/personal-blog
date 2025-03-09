import axios from "axios";
import useAxios from "./axiosInstance";
import userServices from "./userServices";

// This file includes all the blog realated APIs as well as the the Blog Interface
export interface NewBlog {
  title: string;
  description: string;
  body: string;
  authorUserID: string;
}
export interface Blog extends NewBlog {
  _id: string;
}

export interface BlogWithAuthorName extends Blog {
  authorName: string;
}

const blogServices = () => {
  const axiosInstance = useAxios();
  const { fetchUsername } = userServices();

  // Helper function to extend the blog object with the author's name
  const extendBlog = async (blog: Blog): Promise<BlogWithAuthorName> => {
    if (blog.authorUserID) {
      const authorName = await fetchUsername(blog.authorUserID);
      return { ...blog, authorName: authorName };
    } else {
      return { ...blog, authorName: "Unkown" };
    }
  };

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
          const blogs: Blog[] = response.data.blogs;
          // Fetches usernames and maps it as a key-value pair stored in a new variable
          const updatedBlogs: BlogWithAuthorName[] = await Promise.all(
            blogs.map(async (currentBlog) => {
              const updatedCurrentBlog = await extendBlog(currentBlog);
              return updatedCurrentBlog;
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
    fetchBlogByID: async (
      blogID: string
    ): Promise<BlogWithAuthorName | undefined> => {
      try {
        const response = await axiosInstance.get(`/blogs/${blogID}`);
        const updatedBlog = await extendBlog(response.data);
        return updatedBlog;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          return {
            _id: blogID,
            title: "Unauthorised",
            description: "Unauthorised",
            body: "Unauthorised",
            authorUserID: "Unauthorised",
            authorName: "Unauthorised",
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
            authorName: "Blog Not Found",
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
        const res = await axiosInstance.delete(`/blogs/${blogID}`);
        if (res.status === 200) {
          return true;
        }
        return false;
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Updates a blog post.
     * @param blog - The new blog data.
     * @returns A promise that resolves to the posted blog or undefined.
     */
    updateBlog: async (blog: Blog): Promise<Boolean | undefined> => {
      try {
        console.log(blog);
        return await axiosInstance.post(`/blogs/${blog._id}`, blog);
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Posts a new blog to the server.
     * @param newBlog - The blog to be posted.
     * @returns A promise that resolves to the posted blog or undefined.
     */
    postBlog: async (newBlog: NewBlog): Promise<Boolean | undefined> => {
      try {
        return await axiosInstance.post(`/blogs`, newBlog);
      } catch (err) {
        console.log(err);
      }
    },
  };
};

export default blogServices;
