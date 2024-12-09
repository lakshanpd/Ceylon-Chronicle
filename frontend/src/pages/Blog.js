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
    <div className="flex justify-center items-center min-h-screen sw-480:mt-40 sw-360:mt-28">
      <div className="grid sw-1250:grid-cols-3 sw-900:grid-cols-2 sw-1400:gap-20 sw-1250:gap-10 sw-900:gap-20 grid-cols-1 gap-10">
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
