import { useEffect, useState } from "react";
import LoginPopup from "./Login";

function Navbar() {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [clickedTab, setClickedTab] = useState("Home");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleLoginClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`fixed w-full flex  ${
        scrollY === 0 ? `h-[80px]` : `h-[70px]`
      } transition-all duration-200 z-50 font-open-sans-condensed font-semibold sw-1250:text-[18px] sw-480:text-[16px] bg-gray-100`}
    >
      <div className="w-[600px] ml-10 flex items-center">
        {" "}
        <img src="./images/logo.jpg" className="w-80 bg-black" />
      </div>
      <div className="flex sw-1250:gap-20 sw-480:gap-12  h-full ml-auto mr-20">
        <button onClick={() => setClickedTab("Home")}>
          <div
            className={`${
              clickedTab == "Home"
                ? `border-b-[3px] border-lightBlue text-lightBlue`
                : null
            }`}
          >
            Home
          </div>
        </button>
        <button onClick={() => setClickedTab("Blog")}>
          <div
            className={`${
              clickedTab == "Blog"
                ? `border-b-[3px] border-lightBlue text-lightBlue`
                : null
            }`}
          >
            Blog
          </div>
        </button>
        <button onClick={() => setClickedTab("About")}>
          <div
            className={`${
              clickedTab == "About"
                ? `border-b-[3px] border-lightBlue text-lightBlue`
                : null
            }`}
          >
            About
          </div>
        </button>
        <button onClick={() => setClickedTab("Contact")}>
          <div
            className={`${
              clickedTab == "Contact"
                ? `border-b-[3px] border-lightBlue text-lightBlue`
                : null
            }`}
          >
            Contact
          </div>
        </button>
      </div>
      <div className="flex justify-center items-center mr-8">
        <button
          className=" p-3 rounded-3xl bg-lightBlue text-center hover:bg-blue-500 transition duration-200 ease-in-out"
          onClick={handleLoginClick}
        >
          SignUp
        </button>
      </div>
      {/* Login Form */}

      <LoginPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
}

export default Navbar;
