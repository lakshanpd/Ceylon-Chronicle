import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../PostContext";
import Slider from "./slider";

function FullPost() {
  const { postId } = useParams();
  const { allPosts, loading, error } = useContext(PostContext);
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Convert postId to an integer and find the post only when allPosts are loaded
    const postIndex = parseInt(postId, 10);
    if (!loading && !error && allPosts.length > 0) {
      setPost(allPosts[postIndex]);
    }
  }, [postId, allPosts, loading, error]);

  // Display loading, error, or not-found messages as appropriate
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="flex justify-center font-open-sans-condensed">
      <div className=" text-black mt-40 mb-40 flex flex-col items-center gap-6 w-4/5">
        <Slider imgs={post.images} />
        <div className="flex flex-col text-center gap-2">
          <div className="text-[28px] text-black text-opacity-70 font-bold">
            {post.topic}
          </div>

          <div className="text-[16px] text-black text-opacity-70 font-semibold font-open-sans">
            posted by: {post.firstName + " " + post.lastName}
          </div>
        </div>

        <div className="w-4/6 text-justify text-[16px] font-open-sans">
          {post.description}
        </div>
        <div className="flex w-4/6 items-start font-semibold text-black text-opacity-80">
          <div>Tags : </div>
          {post.tags.map((tag, index) => (
            <div className="pl-4">{tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FullPost;
