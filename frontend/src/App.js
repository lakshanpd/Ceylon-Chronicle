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

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      console.log("token is ", token);

      if (!token) {
        logout();
        return;
      }

      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          logout();
          console.log("Token expired");
        } else {
          console.log("Token is valid");

          // Parse the user data from localStorage before passing to login
          login(token, user ? JSON.parse(user) : null); // Pass the parsed userDetails
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
          <Route path="/test" element={<Profile />} />
        </Routes>
      </div>
      <Footer /> {/* Footer stays at the bottom */}
    </div>
  );
}

export default App;
