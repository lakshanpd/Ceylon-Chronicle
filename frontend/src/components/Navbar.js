import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPopup from "./Login";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "./AuthContext";

function Navbar() {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [clickedTab, setClickedTab] = useState("Home");
  const [isSignupClicked, setIsSignupClicked] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const popupRef = useRef(null); // Create a ref for the popup

  const handleSignupClicked = () => {
    setIsSignupClicked(true);
  };

  const handleLogoClicked = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // Event listener to close popup on outside click
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsSignupClicked(false); // Close the popup
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup
    };
  }, []);

  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to the /profile route
  };

  return (
    <div
      className={`fixed w-full flex ${
        scrollY === 0 ? `h-[80px]` : `h-[70px]`
      } transition-all duration-200 z-50 font-open-sans-condensed font-semibold sw-1250:text-[18px] sw-480:text-[16px] bg-gray-100`}
    >
      <div className="w-[600px] ml-10 flex items-center">
        <img
          src="./images/logo.jpg"
          className="w-80 bg-black cursor-pointer" // Add cursor pointer for better UX
          alt="Logo"
          onClick={handleLogoClicked}
        />
      </div>
      <div className="flex sw-1250:gap-20 sw-480:gap-12 h-full ml-auto mr-20">
        {["Home", "Blog", "About", "Contact"].map((tab) => (
          <button key={tab} onClick={() => setClickedTab(tab)}>
            <div
              className={`${
                clickedTab === tab
                  ? `border-b-[3px] border-lightBlue text-lightBlue`
                  : null
              }`}
            >
              {tab}
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-center items-center mr-8">
        {!isAuthenticated ? (
          <button
            className="p-3 rounded-3xl bg-lightBlue text-center hover:bg-blue-500 transition duration-200 ease-in-out"
            onClick={handleSignupClicked}
          >
            SignUp
          </button>
        ) : (
          <button className="rounded-full" onClick={handleProfileClick}>
            <CgProfile size={40} />
          </button>
        )}
      </div>
      {/* Login Form */}
      {isSignupClicked && (
        <div ref={popupRef}>
          <LoginPopup />
        </div>
      )}
    </div>
  );
}

export default Navbar;
