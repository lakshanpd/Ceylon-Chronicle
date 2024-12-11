import React from "react";

const History = ({ posts, clicking }) => {
  console.log(posts);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
              onClick={() => clicking(index)}
            >
              View More
            </button>

            <button
              className="bg-transparent border-2 border-lightBlue px-2 py-1 rounded-lg mr-2 hover:bg-lightBlue hover:text-white text-[14px] font-semibold text-black text-opacity-80"
              onClick={() => clicking(index)}
            >
              Edit Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
