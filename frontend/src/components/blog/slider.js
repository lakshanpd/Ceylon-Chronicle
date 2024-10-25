import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Slider({ imgs }) {
  const [count, setCount] = useState(0);

  const handleRightArrow = () => {
    setCount((count + 1) % imgs.length);
  };

  const handleLeftArrow = () => {
    setCount((count - 1 + imgs.length) % imgs.length);
  };
  return (
    <div className="flex justify-center items-center gap-4">
      <FaChevronLeft
        color="black"
        size={60}
        className="cursor-pointer opacity-70 hover:opacity-100"
        onClick={handleLeftArrow}
      />

      <div className="h-[450px] w-[700px] bg-black flex justify-center items-center rounded-2xl overflow-hidden">
        <img src={imgs[count]} className="h-full w-full object-cover" />
      </div>

      <FaChevronRight
        color="black"
        size={60}
        className="cursor-pointer opacity-70 hover:opacity-100"
        onClick={handleRightArrow}
      />
    </div>
  );
}

export default Slider;
