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
      console.log("token is ", token);

      // Check if token exists
      if (!token) {
        logout();
        return;
      }

      // Decode the token to get its payload
      try {
        const decoded = jwtDecode(token);

        // Check if token has expired (the exp field is in seconds)
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token"); // Remove expired token
          logout();

          console.log("Token expired");
        } else {
          console.log("Token is valid");
          login(token); // Pass the token to the login function
        }
      } catch (error) {
        console.error("Token validation error");
      }
    };

    checkAuthentication();
  }, []); // Added login and logout to the dependency array

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="flex-grow">
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
        </Routes>
      </div>
      <Footer /> {/* Footer at the bottom */}
    </div>
  );
}

export default App;
