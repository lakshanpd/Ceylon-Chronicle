import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function GoogleSignInButton() {
  // Call useAuth at the top level of the component
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken; // Google OAuth token
      const user = result.user;

      // Prepare data to send to the backend
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        providerId: user.providerData[0].providerId, // Usually "google.com"
      };

      // Send user data to the backend
      const response = await fetch(
        "http://localhost:3001/api/googleAuthentication",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      // Handle the backend response
      const data = await response.json();
      if (response.ok) {
        alert(`Login successful! Token: ${data.token}`);
        // Optionally save the token in local storage or state
        localStorage.setItem("authToken", data.token);
        login(data.token, data.user); // Call login function from useAuth
        navigate("/");
      } else {
        console.error("Backend Error:", data);
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="p-2 bg-blue-500 text-white rounded-md"
    >
      Sign in with Google
    </button>
  );
}

export default GoogleSignInButton;
