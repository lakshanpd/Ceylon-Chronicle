import React from "react";

const Post = ({ username, topic, tags, images }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md max-w-96">
      <img
        src={images[0]}
        alt={topic}
        className="w-[320px] h-[235px] opacity-90 hover:cursor-pointer hover:opacity-80 ml-auto mr-auto rounded-md"
      />
      <p className="text-center font-semibold pt-3 font-open-sans-condensed text-2xl text-black text-opacity-70">
        {topic}
      </p>
      <p className="text-center text-gray-600 text-sm mt-2 font-semibold">
        Posted by: {username}
      </p>{" "}
      {/* Username field */}
      {/* Tags Section */}
      <div className="flex flex-wrap justify-center gap-2 mt-5">
        {tags.map((tag, tagIndex) => (
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
        <button className="bg-transparent border-2 border-lightBlue px-2 py-1 rounded-lg mr-2 hover:bg-lightBlue hover:text-white text-[14px] font-semibold text-black text-opacity-80">
          View More
        </button>
        {/* <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Edit Details
        </button> */}
      </div>
    </div>
  );
};

export default Post;
