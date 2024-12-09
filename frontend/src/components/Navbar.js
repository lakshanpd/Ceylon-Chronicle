import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "./AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [isSignupClicked, setIsSignupClicked] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignupClicked = () => setIsSignupClicked(true);

  const handleLogoClicked = () => navigate("/");
  const handleTabClick = (tab) => {
    setMenuOpen(false); // Close the menu when a tab is clicked
    switch (tab) {
      case "Home":
        navigate("/");
        break;
      case "Blog":
        navigate("/blog");
        break;
      case "Community":
        navigate("/community");
        break;
      case "About Us":
        navigate("/about-us");
        break;
      default:
        navigate("/");
    }
  };

  const getActiveTab = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/blog":
        return "Blog";
      case "/community":
        return "Community";
      case "/about-us":
        return "About Us";
      default:
        return "";
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSignupClicked) {
      navigate("/login");
    }
  }, [isSignupClicked, navigate]);

  return (
    <div>
      <div
        className={`fixed w-full flex ${
          scrollY === 0 ? `h-[80px]` : `h-[70px]`
        } transition-all duration-200 z-50 font-open-sans-condensed font-semibold bg-gray-100`}
      >
        {/* logo */}
        <div className="w-[600px] ml-10 flex items-center">
          <img
            src="/images/logo.jpg"
            className="w-80 bg-black cursor-pointer"
            alt="Logo"
            onClick={handleLogoClicked}
          />
        </div>
        {screenWidth > 1280 ? (
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
        ) : (
          <div className="flex ml-auto lg:mr-8 mr-5 items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        )}
        {screenWidth > 1280 ? (
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
                    className="w-12 h-12 rounded-full object-cover border-2 border-lightBlue p-1"
                  />
                ) : (
                  <CgProfile size={40} />
                )}
              </button>
            )}
          </div>
        ) : null}
      </div>

      {/* Dropdown menu for small screens */}
      {menuOpen && screenWidth <= 1280 && (
        <div className="absolute top-[80px] w-full bg-gray-100 flex flex-col items-center z-40 shadow-md">
          {["Home", "Blog", "Community", "About Us"].map((tab) => (
            <button
              key={tab}
              className="w-full p-4 text-center border-b border-gray-300 hover:bg-slate-200"
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
          {!isAuthenticated ? (
            <button
              className="w-full p-4 text-center bg-lightBlue hover:bg-blue-500 text-white transition duration-200 ease-in-out"
              onClick={handleSignupClicked}
            >
              SignUp
            </button>
          ) : (
            <button
              className="w-full p-4 text-center bg-lightBlue hover:bg-blue-500 text-white transition duration-200 ease-in-out"
              onClick={handleProfileClick}
            >
              My Profile
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
