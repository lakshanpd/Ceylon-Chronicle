import React, { useState } from "react";

function ReviewCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      onClick={toggleExpand}
      className={`bg-gray-200 m-5 rounded-xl flex flex-col items-center justify-center transition-all duration-500 cursor-pointer text-center border border-gray-800 ${
        isExpanded ? "h-[300px]" : "h-[80px]"
      }`}
    >
      <div className="text-lg font-semibold">How about you?</div>
      {isExpanded && (
        <div className="text-md font-normal mt-2">
          I'm fine, thanks for asking!
        </div>
      )}
    </div>
  );
}

export default ReviewCard;
