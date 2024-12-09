import { useContext } from "react";
import Post from "../components/blog/post";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../components/PostContext"; // Adjust the path as necessary

function Blog() {
  const { allPosts, loading, error } = useContext(PostContext);
  const navigate = useNavigate();

  const handleViewMore = (index) => {
    navigate(`/blog/${index}`);
    console.log(allPosts);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen mt-40">
      <div className="grid grid-cols-3 gap-20">
        {allPosts.map((post, index) => (
          <div key={index}>
            <Post
              username={post.firstName + " " + post.lastName}
              topic={post.topic}
              tags={post.tags}
              images={post.images}
              index={index}
              clicking={handleViewMore}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
