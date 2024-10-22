import React from "react";

function TabBar({ activeTab, onTabChange }) {
  const handleTabClick = (tab) => {
    onTabChange(tab); // Pass the clicked tab to the parent
  };

  return (
    <div className="flex justify-between w-[350px] h-[40px] bg-gray-100 rounded-3xl border-2 border-lightBlue border-opacity-50 font-open-sans-condensed font-semibold">
      <button
        className={`w-28 text-black rounded-3xl border-0 transition-colors duration-300 ${
          activeTab === "POST" ? "bg-lightBlue" : "bg-transparent"
        }`}
        onClick={() => handleTabClick("POST")}
      >
        POST
      </button>
      <button
        className={`w-28 text-black rounded-3xl border-0 transition-colors duration-300 ${
          activeTab === "HISTORY" ? "bg-lightBlue" : "bg-transparent"
        }`}
        onClick={() => handleTabClick("HISTORY")}
      >
        HISTORY
      </button>
      <button
        className={`w-28 text-black rounded-3xl border-0 transition-colors duration-300 ${
          activeTab === "SETTINGS" ? "bg-lightBlue" : "bg-transparent"
        }`}
        onClick={() => handleTabClick("SETTINGS")}
      >
        SETTINGS
      </button>
    </div>
  );
}

export default TabBar;
