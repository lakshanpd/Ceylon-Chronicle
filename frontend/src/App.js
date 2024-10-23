import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile"; // Import Profile page
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import Footer
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import { jwtDecode } from "jwt-decode";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { useEffect } from "react";
import Blog from "./pages/Blog";
import ChatCard from "./components/community/ChatCard";
import Community from "./pages/Community";

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
  const { isAuthenticated, login, logout, user } = useAuth();

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

  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* Flexbox layout */}
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="flex-grow pb-20">
        {" "}
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
        </Routes>
      </div>
      <Footer /> {/* Footer stays at the bottom */}
    </div>
  );
}

export default App;
