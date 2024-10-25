import { useEffect, useState } from "react";
import Post from "../components/blog/post";

function Blog() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/getAllPosts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching posts");
        }
        return res.json();
      })
      .then((json) => {
        setAllPosts(json); // Save the fetched data in state
      })
      .catch((err) => console.log(err)); // Log errors if any
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen mt-40">
      <div className="grid grid-cols-3 gap-20">
        {allPosts.map((post, index) => (
          <div key={index}>
            <Post
              username={post.userId}
              topic={post.topic}
              tags={post.tags}
              images={post.images}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
