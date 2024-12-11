import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../PostContext";
import Slider from "./slider";

function FullPost() {
  const { postId } = useParams();
  const { allPosts, loading, error } = useContext(PostContext);
  const [post, setPost] = useState(null);

  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/blog");
  };

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
      <div className=" text-black sw-480:mt-40 mt-32 sw-480:mb-32 mb-16 flex flex-col items-center gap-6 w-4/5">
        <Slider imgs={post.images} />
        <div className="flex flex-col text-center gap-2">
          <div className="sw-480:text-[28px] text-[24px] text-black text-opacity-70 font-bold">
            {post.topic}
          </div>

          <div className="sw-480:text-[16px] text-[12px] text-black text-opacity-70 font-semibold font-open-sans">
            posted by: {post.firstName + " " + post.lastName}
          </div>
        </div>

        <div className="sw-480:w-4/6 w-5/6 text-justify sw-480:text-[16px] text-[13px] font-open-sans">
          {post.description}
        </div>
        <div className="flex sw-480:w-4/6 w-5/6 items-start font-semibold text-black text-opacity-80 sw-480:text-[16px] text-[13px]">
          <div>Tags : </div>
          {post.tags.map((tag, index) => (
            <div className="pl-4" key={index}>
              {tag}
            </div>
          ))}
        </div>
        <div className="flex sw-480:justify-center justify-end w-4/5">
          <button
            className="border-solid border-2 p-1 border-slate-400 font-open-sans mt-6 hover:bg-slate-800 hover:text-white transition duration-300 text-[12px]"
            onClick={handleBackButton}
          >
            Back to blog
          </button>
        </div>
      </div>
    </div>
  );
}

export default FullPost;
