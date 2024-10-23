import React from "react";

const History = ({ posts }) => {
  return (
    <div className="grid grid-cols-3 gap-10">
      {posts.map((post, index) => (
        <div className="border rounded-lg p-4 shadow-md" key={index}>
          <img
            src={post.images[0]}
            alt={post.topic}
            className="sw-1400:w-[320px] sw-1400:h-[235px] sw-1250:w-[300px] sw-1250:h-[220px] sw-480:w-[320px] sw-480:h-[235px] opacity-90 hover:cursor-pointer hover:opacity-80"
          />
          <p className="text-center font-semibold pt-3">{post.topic}</p>

          {/* Tags Section */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
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
          <div className="flex justify-center mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600">
              View More
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Edit Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
