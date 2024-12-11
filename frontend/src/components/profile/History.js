import React from "react";
import { useNavigate } from "react-router-dom";

const History = ({ posts, clicking }) => {
  const navigate = useNavigate();

  const handleViewMore = (post) => {
    navigate(`/blog/${post._id}`);
  };

  const handleDelete = async (post) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/deletePost/${post._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Update UI after successful deletion
        alert("Post deleted successfully!");
      } else {
        console.log(post._id);
        alert("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while deleting the post");
    }
  };

  console.log(posts);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {console.log(posts)}
      {posts.map((post, index) => (
        <div
          className="border rounded-lg p-4 shadow-md max-w-96 sw-480:mx-0 mx-3"
          key={index}
        >
          <img
            src={post.images[0]}
            alt={post.topic}
            className="w-[320px] h-[235px] opacity-90 hover:cursor-pointer hover:opacity-80 ml-auto mr-auto rounded-md"
          />
          <p className="text-center font-semibold pt-3 font-open-sans-condensed text-2xl text-black text-opacity-70">
            {post.topic}
          </p>

          {/* Tags Section */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {post.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="bg-blue-200 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-transparent border-2 border-lightBlue px-2 py-1 rounded-lg mr-2 hover:bg-lightBlue hover:text-white text-[14px] font-semibold text-black text-opacity-80"
              onClick={() => handleViewMore(post)}
            >
              View More
            </button>

            <button
              className="bg-transparent border-2 border-red-500 px-2 py-1 rounded-lg mr-2 hover:bg-red-500 hover:border-red-500 hover:text-white text-[14px] font-semibold text-black text-opacity-80"
              onClick={() => handleDelete(post)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
