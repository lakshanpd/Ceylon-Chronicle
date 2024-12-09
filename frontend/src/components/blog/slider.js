import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Slider({ imgs }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [count, setCount] = useState(0);

  const handleRightArrow = () => {
    setCount((count + 1) % imgs.length);
  };

  const handleLeftArrow = () => {
    setCount((count - 1 + imgs.length) % imgs.length);
  };

  useEffect(() => {
    // Function to update the state with the new width
    const handleResize = () => setScreenWidth(window.innerWidth);

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center items-center sw-480:gap-4 gap-2">
      <FaChevronLeft
        color="black"
        size={screenWidth > 640 ? 60 : 32}
        className="cursor-pointer opacity-70 hover:opacity-100"
        onClick={handleLeftArrow}
      />

      <div className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px] w-full max-w-[700px] bg-black flex justify-center items-center rounded-2xl overflow-hidden">
        <img
          src={imgs[count]}
          className="h-full w-full object-cover"
          alt="Slider Image"
        />
      </div>

      <FaChevronRight
        color="black"
        size={screenWidth > 640 ? 60 : 32}
        className="cursor-pointer opacity-70 hover:opacity-100"
        onClick={handleRightArrow}
      />
    </div>
  );
}

export default Slider;
