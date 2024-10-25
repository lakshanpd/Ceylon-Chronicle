import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile"; // Import Profile page
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import Footer
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import { jwtDecode } from "jwt-decode";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { useEffect } from "react";
import Blog from "./pages/Blog";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </AuthProvider>
  );
}

function Main() {
  const { isAuthenticated, login, logout } = useAuth();
  const location = useLocation(); // Get the current location
  const routesWithoutNavbarFooter = ["/login", "/register"]; // Define routes without Navbar and Footer

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("token");
      const user_local = localStorage.getItem("user");

      if (!token) {
        logout();
        return;
      }

      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
          console.log("Token expired");
        } else {
          console.log("Token is valid");
          login(token, JSON.parse(user_local));
        }
      } catch (error) {
        console.error("Token validation error", error);
        logout(); // Logout on error for safety
      }
    };

    checkAuthentication();
  }, []);

  // New useEffect to scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [location]); // Dependency array includes location

  const shouldHideNavbarFooter = routesWithoutNavbarFooter.includes(
    location.pathname
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Navbar */}
      {!shouldHideNavbarFooter && <Navbar isAuthenticated={isAuthenticated} />}
      <div className="flex-grow pb-20">
        {/* Main content with padding bottom */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/community" element={<Community />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
      {/* Conditionally render Footer */}
      {!shouldHideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
