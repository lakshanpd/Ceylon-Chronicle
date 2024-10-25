import React, { useState } from "react";

function ReviewCard({ q, a }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      onClick={toggleExpand}
      className={`m-5 px-1 rounded-xl flex flex-col items-center justify-center transition-all duration-500 cursor-pointer text-center shadow-sm shadow-lightBlue ${
        isExpanded ? "h-[250px]" : "h-[80px]"
      }`}
    >
      <div className="text-base font-semibold">{q}</div>
      {isExpanded && <div className="text-sm font-normal mt-2">{a}</div>}
    </div>
  );
}

export default ReviewCard;
