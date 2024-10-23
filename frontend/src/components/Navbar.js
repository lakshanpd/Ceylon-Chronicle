import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import LoginPopup from "./Login";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "./AuthContext";

function Navbar() {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [isSignupClicked, setIsSignupClicked] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const popupRef = useRef(null); // Create a ref for the popup

  // Function to handle the signup click
  const handleSignupClicked = () => {
    setIsSignupClicked(true);
  };

  // Function to handle the logo click
  const handleLogoClicked = () => {
    navigate("/"); // Navigate to the home page
  };

  // Handle navigation based on the clicked tab
  const handleTabClick = (tab) => {
    switch (tab) {
      case "Home":
        navigate("/");
        break;
      case "Blog":
        navigate("/blog");
        break;
      case "Community": // Change "About" to "Community"
        navigate("/community");
        break;
      case "About Us": // Change "Contact" to "About Us"
        navigate("/about-us");
        break;
      default:
        navigate("/");
    }
  };

  // Map location.pathname to corresponding tab name
  const getActiveTab = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/blog":
        return "Blog";
      case "/community": // Update this path for "Community"
        return "Community";
      case "/about-us": // Update this path for "About Us"
        return "About Us";
      default:
        return "Home"; // Default to "Home" if no match
    }
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
        {["Home", "Blog", "Community", "About Us"].map((tab) => (
          <button key={tab} onClick={() => handleTabClick(tab)}>
            <div
              className={`${
                getActiveTab() === tab
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
            {user.profilePicture && user.profilePicture !== "" ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-auto h-12 rounded-full object-cover border-2 border-lightBlue p-1"
              />
            ) : (
              <CgProfile size={40} />
            )}
          </button>
        )}
      </div>
      {/* Login Form */}
      {isSignupClicked && (
        <div ref={popupRef}>
          <LoginPopup onClose={() => setIsSignupClicked(false)} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
