import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Prepare data to send
    const data = {
      username: username,
      password: password,
    };

    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // Ensure to get the token
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        console.log("log in successfully");
        login(data.token, data.data); // Pass the token received from the server
        navigate("/");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div
      className="bg-cover bg-center h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('/images/wallpaper.jpg')",
      }}
    >
      <a
        href="/"
        className="absolute flex gap-2 left-10 top-10 border-2 p-2 text-white text-opacity-50 hover:text-opacity-100 rounded-full border-white border-opacity-50 hover:border-opacity-100 hover:border-white"
      >
        <div className="flex justify-center items-center">
          <FaArrowLeft color="lightBlue" />
        </div>
        <button className="font-bold"> Home</button>
      </a>
      <div className="w-[450px] h-[450px] bg-lightBlue bg-opacity-20 rounded-xl flex flex-col items-center font-open-sans-condensed">
        <div className="text-[32px] font-bold text-blue-300 font-open-sans-condensed text-center pt-8">
          Login
        </div>

        <form onSubmit={handleLogin} className="flex flex-col items-center">
          {/* User Name Input with Icon */}
          <div className="relative mt-8">
            <input
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-[300px] bg-transparent border border-blue-300 
                rounded-full py-2 px-4 pl-10 pr-12 focus:outline-none 
                focus:border-2 placeholder:text-blue-300 
                placeholder:text-opacity-80 font-open-sans-condensed text-white"
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
          </div>

          {/* Password Input with Icon */}
          <div className="relative mt-8">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[300px] bg-transparent border border-blue-300 
                rounded-full py-2 px-4 pl-10 pr-12 focus:outline-none 
                focus:border-2 placeholder:text-blue-300 
                placeholder:text-opacity-80 font-open-sans-condensed text-white"
            />
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-[300px] mt-12 bg-white
              rounded-full py-2 hover:bg-opacity-30 transition duration-200 text-black text-opacity-80 font-bold"
          >
            Login
          </button>
        </form>

        {/* Forgot Password Link */}
        <a
          href="/register"
          className="mt-4 text-blue-300 text-sm hover:underline pt-2"
        >
          Don't have an account? <span className="font-bold">Register</span>
        </a>
      </div>
    </div>
  );
}

export default Login;
