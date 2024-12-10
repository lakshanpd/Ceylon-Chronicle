import { useContext } from "react";
import { PostContext } from "../PostContext";
import { useNavigate } from "react-router-dom";

function RecentPosts() {
  const { allPosts, loading, error } = useContext(PostContext);
  const navigate = useNavigate();

  const handleViewMore = (index) => {
    navigate(`/blog/${index}`);
    console.log(allPosts);
  };

  const handleReadMore = () => {
    navigate("/blog");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Get the last 4 posts
  const recentPosts = allPosts.slice(-4);
  const reversedPosts = [...recentPosts].reverse();

  return (
    <div>
      {/* Topic */}
      <div className="flex items-center justify-center w-full my-8 sw-1250:mb-10 sw-360:mb-16">
        <div className="flex-grow border-t-2 border-gray-300"></div>
        <span className="mx-8 text-lg font-bold text-center sw-1250:text-[20px] sw-480:text-[24px] font-open-sans-condensed">
          Recent Posts
        </span>
        <div className="flex-grow border-t-2 border-gray-300"></div>
      </div>
      {/* Tiles */}
      <div className="grid sw-900:grid-cols-2 sw-360:grid-cols-1 gap-y-10 justify-items-center">
        {reversedPosts.map((post, index) => (
          <div className="" key={index}>
            <img
              src={post.images[0]}
              alt={`Post ${index}`}
              className="sw-1400:w-[320px] sw-1400:h-[235px] sw-1250:w-[300px] sw-1250:h-[220px] sw-480:w-[320px] sw-480:h-[235px] opacity-90 hover:cursor-pointer hover:opacity-80"
              onClick={() => handleViewMore(index)}
            />
            <p className="text-center font-semibold pt-3">{post.topic}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="border-solid border-2 p-1 border-slate-400 font-open-sans mt-6 hover:bg-slate-800 hover:text-white transition duration-300 text-[12px]"
          onClick={handleReadMore}
        >
          Read More...
        </button>
      </div>
    </div>
  );
}

export default RecentPosts;
