import { useState } from "react";

function RecentPosts() {
  const [recentPosts, setRecentPosts] = useState([
    {
      img: "/images/home/sigiriya.jpg",
      topic: "GUID TO TRAVEL SIGIRIYA",
    },
    {
      img: "/images/home/gallefort.jpg",
      topic: "HISTORY OF GALLE FORT",
    },
    {
      img: "/images/home/nilaweli.jpg",
      topic: "NILAWELI BEACH SIDE",
    },
    {
      img: "/images/home/sigiriya.jpg",
      topic: "GUID TO TRAVEL SIGIRIYA",
    },
  ]);
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
        {recentPosts.map((post, index) => (
          <div className="" key={index}>
            <img
              src={post.img}
              alt={index}
              className="sw-1400:w-[320px] sw-1400:h-[235px] sw-1250:w-[300px] sw-1250:h-[220px] sw-480:w-[320px] sw-480:h-[235px] opacity-90 hover:cursor-pointer hover:opacity-80 "
            />

            <p className="text-center font-semibold pt-3">{post.topic}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button className="border-solid border-2 p-1 border-slate-400 font-open-sans mt-6 hover:bg-slate-800 hover:text-white transition duration-300 text-[12px]">
          Read More...
        </button>
      </div>
    </div>
  );
}

export default RecentPosts;
