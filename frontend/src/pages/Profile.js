import React, { useState, useEffect } from "react";
import ProfileCard from "../components/profile/ProfileCard";
import TabBar from "../components/profile/TabBar";
import Settings from "../components/profile/Settings";
import Post from "../components/profile/Post"; // Import the Post component
import History from "../components/profile/History"; // Import the History component
import { useAuth } from "../components/AuthContext";

function Profile() {
  const [activeTab, setActiveTab] = useState("POST"); // Default tab
  const [posts, setPosts] = useState([{}]); // State to store posts
  const { user } = useAuth();

  // Sample data for posts
  const samplePosts = [
    {
      img: "/images/home/about.jpg", // Replace with actual image URLs
      topic: "My Adventure in Nature",
      tags: ["Adventure", "Nature"],
    },
    {
      img: "/images/home/sigiriya.jpg", // Replace with actual image URLs
      topic: "Cultural Experience",
      tags: ["Culture", "History"],
    },
    {
      img: "/images/home/nilaweli.jpg", // Replace with actual image URLs
      topic: "City Exploration",
      tags: ["City", "Adventure"],
    },
    {
      img: "/images/home/gallefort.jpg", // Replace with actual image URLs
      topic: "Delicious Food Journey",
      tags: ["Food", "Culture"],
    },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/getPosts", {
          method: "POST",
          body: JSON.stringify({ _id: user._id }), // Send user ID in the request body
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data); // Store the fetched posts in state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (user && user._id) {
      fetchPosts(); // Fetch posts if the user is available
    }
  }, [user]); // Ensure this only runs when 'user' changes

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="sw-480:mt-40 mt-32 flex flex-col items-center">
      <ProfileCard />
      <div className="sw-480:h-20 h-14"></div>
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="sw-480:h-20 h-14"></div>
      {/* Conditionally render content based on active tab */}
      {activeTab === "POST" && <Post />} {/* Render the Post component */}
      {activeTab === "HISTORY" && <History posts={posts} />}
      {/* Render the History component */}
      {activeTab === "SETTINGS" && <Settings />}
    </div>
  );
}

export default Profile;
