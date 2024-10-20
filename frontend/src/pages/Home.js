import React, { useState, useEffect } from "react";
import ThreeTiles from "../components/home/ThreeTiles";
import Thanks from "../components/home/Thanks";
import TravelGuide from "../components/home/TravelGuide";
import RecentPosts from "../components/home/RecentPosts";
import ReviewCard from "../components/home/ReviewCard";

function Home() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [reviews, setReviews] = useState([
    {
      firstName: "Danuka",
      lastName: "Lakshan",
      comment: "This is a good blog to share our happy memories",
    },
    {
      firstName: "Pasindu",
      lastName: "Lakruwan",
      comment: "This is a good blog to share our happy memories",
    },
    {
      firstName: "Bhanuka",
      lastName: "Chathuranga",
      comment: "This is a good blog to share our happy memories",
    },
    {
      firstName: "Danuka",
      lastName: "Lakshan",
      comment: "This is a good blog to share our happy memories",
    },
    {
      firstName: "Pasindu",
      lastName: "Lakruwan",
      comment: "This is a good blog to share our happy memories",
    },
    {
      firstName: "Bhanuka",
      lastName: "Chathuranga",
      comment: "This is a good blog to share our happy memories",
    },
    {
      firstName: "Danuka",
      lastName: "Lakshan",
      comment: "This is a good blog to share our happy memories",
    },
    {
      firstName: "Pasindu",
      lastName: "Lakruwan",
      comment: "This is a good blog to share our happy memories",
    },
    {
      firstName: "Bhanuka",
      lastName: "Chathuranga",
      comment: "This is a good blog to share our happy memories",
    },
    {
      firstName: "Danuka",
      lastName: "Lakshan",
      comment: "This is a good blog to share our happy memories",
    },
    {
      firstName: "Pasindu",
      lastName: "Lakruwan",
      comment: "This is a good blog to share our happy memories",
    },
    {
      firstName: "Bhanuka",
      lastName: "Chathuranga",
      comment: "This is a good blog to share our happy memories",
    },
    {
      firstName: "Danuka",
      lastName: "Lakshan",
      comment: "This is a good blog to share our happy memories",
    },
    {
      firstName: "Pasindu",
      lastName: "Lakruwan",
      comment: "This is a good blog to share our happy memories",
    },
    {
      firstName: "Bhanuka",
      lastName: "Chathuranga",
      comment: "This is a good blog to share our happy memories",
    },
  ]);

  useEffect(() => {
    // Function to update the state with the new width
    const handleResize = () => setScreenWidth(window.innerWidth);

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className="bg-slate-500 h-[80vh]">Hello</div>

      <div className="h-[15vh] "></div>
      {/* content */}
      <h1>{screenWidth}</h1>
      <div className="flex flex-col gap-32 sw-480:w-[75vw] sw-360:w-[85vw] mr-auto ml-auto">
        <ThreeTiles />
        <Thanks />
        <TravelGuide />
        <div className="grid sw-1250:grid-cols-3 sw-360:grid-cols-1gap-10">
          <div className="sw-1250:col-span-2 ">
            <RecentPosts />
          </div>
          <div className="sw-1250:col-span-1 flex justify-center items-center sw-1250:mt-0 sw-360:mt-20">
            <div className="w-full">
              {/* Topic */}
              <div className="flex items-center justify-center w-full my-8 sw-1250:mb-0 sw-360:mb-10">
                <div className="flex-grow border-t-2 border-gray-300"></div>
                <span className="mx-8 text-lg font-bold text-center sw-1250:text-[20px] sw-360:text-[24px] font-open-sans-condensed">
                  FAQ
                </span>
                <div className="flex-grow border-t-2 border-gray-300"></div>
              </div>
              <div className="scrollbar scrollbar-thumb-slate-500 scrollbar-track-slate-300 h-[400px] overflow-y-scroll ">
                {reviews.map((review, index) => (
                  <ReviewCard key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
