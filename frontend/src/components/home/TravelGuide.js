import { useState } from "react";

function TravelGuide() {
  const [visibleGuides, setVisibleGuides] = useState(6);

  var travelGuides = [
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
    {
      img: "/images/home/gallefort.jpg",
      topic: "HISTORY OF GALLE FORT",
    },
    {
      img: "/images/home/nilaweli.jpg",
      topic: "NILAWELI BEACH SIDE",
    },
  ];

  const loadMore = () => {
    if (visibleGuides + 3 <= travelGuides.length) {
      setVisibleGuides((prev) => prev + 3);
    }
  };

  return (
    <div>
      {/* Topic */}
      <div className="flex items-center justify-center w-full my-8">
        <div className="flex-grow border-t-2 border-gray-300"></div>
        <span className="mx-8 text-lg font-bold text-center sw-1400:text-[42px] sm:text-[36px] text-[32px] font-open-sans-condensed">
          Travel Guides
        </span>
        <div className="flex-grow border-t-2 border-gray-300"></div>
      </div>
      {/* Tiles */}
      <div className="grid sw-1250:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-y-10 sw-480:mt-24 sw-360:mt-16 justify-items-center">
        {travelGuides.slice(0, visibleGuides).map((guide, index) => (
          <div className=" ">
            <img
              src={guide.img}
              alt="guide"
              className="sw-1400:h-[280px] sw-1400:w-[340px] sw-1250:h-[250px] sw-1250:w-[300px] lg:h-[280px] lg:w-[340px] sm:h-[320px] sm:w-[400px] sw-360:h-[280px] sw-360:w-[340px] rounded-md opacity-90 hover:cursor-pointer hover:opacity-75 transition duration-300"
            />
            <p className="text-center sw-1400:text-[22px] sw-1250:text-[18px] lg:text-[20px] sm:text-[22px] sw-480:text-[20px] text-[18px] font-bold opacity-80 font-open-sans-condensed sw-1400:p-5 sw-1250:p-3 lg:p-5 sm:p-5 p-4 transition-all duration-300">
              {guide.topic}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="border-solid border-2 p-1 border-slate-400 font-open-sans mt-10 hover:bg-slate-800 hover:text-white transition duration-300 text-[14px]"
          onClick={loadMore}
        >
          Read More...
        </button>
      </div>
    </div>
  );
}

export default TravelGuide;
