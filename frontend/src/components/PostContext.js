// PostContext.js
import React, { createContext, useEffect, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/getAllPosts");

        if (!response.ok) {
          throw new Error("Error fetching posts");
        }
        const json = await response.json();
        setAllPosts(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{ allPosts, loading, error }}>
      {children}
    </PostContext.Provider>
  );
};
