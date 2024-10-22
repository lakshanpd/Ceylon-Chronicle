import React, { useState } from "react";
import ProfileCard from "../components/profile/ProfileCard";
import TabBar from "../components/profile/TabBar";
import Settings from "../components/profile/Settings";
import Post from "../components/profile/Post"; // Import the Post component
import History from "../components/profile/History"; // Import the History component

function Profile() {
  const [activeTab, setActiveTab] = useState("POST"); // Default tab

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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    console.log("Active tab:", tab); // Check the current active tab
  };

  return (
    <div className="mt-40 flex flex-col items-center">
      <ProfileCard />
      <div className="h-20"></div>
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="h-20"></div>
      {/* Conditionally render content based on active tab */}
      {activeTab === "POST" && <Post />} {/* Render the Post component */}
      {activeTab === "HISTORY" && <History posts={samplePosts} />}{" "}
      {/* Render the History component */}
      {activeTab === "SETTINGS" && <Settings />}
    </div>
  );
}

export default Profile;
