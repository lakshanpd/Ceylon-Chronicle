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
      q: "What is this blog about?",
      a: "It’s a platform for sharing travel memories and experiences.",
    },
    {
      q: "How can I post my travel memories?",
      a: "Sign up and click the 'Post' button to share your experiences.",
    },
    {
      q: "Can I comment on other users' posts?",
      a: "Yes, you can engage and share your thoughts on any post.",
    },
    {
      q: "Is there a community section?",
      a: "Yes! Connect and chat with fellow travelers in the Community tab.",
    },
    {
      q: "How do I create an account?",
      a: "Click on the 'Sign Up' button and fill out the registration form.",
    },
    {
      q: "Can I edit or delete my posts?",
      a: "Yes, you can edit or delete your posts anytime from your profile.",
    },
    {
      q: "Is there a mobile version of the blog?",
      a: "Yes, the blog is mobile-friendly for easy access on the go.",
    },
    {
      q: "Are there any guidelines for posting?",
      a: "Please share authentic and respectful content. Check our guidelines for details.",
    },
    {
      q: "How do I report inappropriate content?",
      a: "Use the 'Report' button on any post to alert us.",
    },
    {
      q: "Is my personal information safe?",
      a: "Yes, we prioritize user privacy and data protection.",
    },
  ]);

  const [isImageLoaded, setIsImageLoaded] = useState(false); // Loading state for the cover image

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
      {!isImageLoaded && (
        <div className="flex justify-center items-center h-screen">
          {/* Placeholder or spinner while the image loads */}
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
        </div>
      )}

      {/* Cover Image */}
      <img
        src="/images/home/cover.jpg"
        className={`w-full min-h-[350px] h-auto max-h-screen object-cover overflow-hidden opacity-90 ${
          isImageLoaded ? "block" : "hidden" // Hide image until it loads
        }`}
        onLoad={() => setIsImageLoaded(true)} // Set loading state to false once the image is loaded
        alt="Cover"
      />

      {isImageLoaded && (
        <div>
          <div className="h-[15vh] "></div>
          {/* Content */}
          {/* <h1>{screenWidth}</h1> */}
          <div className="flex flex-col gap-32 sw-480:w-[75vw] sw-360:w-[85vw] mr-auto ml-auto">
            <ThreeTiles />
            <Thanks isButton={true} />
            <TravelGuide />
            <div className="grid sw-1250:grid-cols-3 sw-360:grid-cols-1 gap-10">
              <div className="sw-1250:col-span-2 ">
                <RecentPosts />
              </div>
              <div className="sw-1250:col-span-1 flex justify-center items-center sw-1250:mt-0 sw-360:mt-20">
                <div className="w-full">
                  {/* Topic */}
                  <div className="flex items-center justify-center w-full my-8 sw-1250:mb-8 sw-360:mb-10">
                    <div className="flex-grow border-t-2 border-gray-300"></div>
                    <span className="mx-8 text-lg font-bold text-center sw-1250:text-[20px] sw-360:text-[24px] font-open-sans-condensed">
                      FAQ
                    </span>
                    <div className="flex-grow border-t-2 border-gray-300"></div>
                  </div>
                  <div className="scrollbar scrollbar-thumb-slate-500 scrollbar-track-slate-300 h-[400px] overflow-y-scroll">
                    {reviews.map((review, index) => (
                      <ReviewCard key={index} q={review.q} a={review.a} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
