import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Register() {
  const [step, setStep] = useState(1); // State to manage the current step of the form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    travelWith: "",
    username: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
    facebook: "",
    instagram: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Check if the password matches the confirm password
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!"); // You can replace this with a custom error message UI
      return; // Stop form submission if passwords do not match
    }

    // API URL (replace with your actual backend URL)
    const apiUrl = "http://localhost:3001/api/register";

    // Sending data to the backend using fetch
    fetch(apiUrl, {
      method: "POST", // Use POST method
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify(formData), // Convert formData to JSON string
    })
      .then((res) => {
        if (!res.ok) {
          console.log(JSON.stringify(formData));
          throw new Error("Network response was not ok"); // Handle HTTP errors
        }
        return res.json(); // Parse the response JSON
      })
      .then((json) => {
        console.log("login data saved successfully...", json);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error); // Handle error
        // You can show an error message to the user here
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

        <button className=" font-bold "> Home</button>
      </a>
      <div className="w-[450px] bg-lightBlue bg-opacity-20 rounded-xl flex flex-col items-center font-open-sans-condensed p-8">
        <div className="text-[32px] font-bold text-blue-300 text-center mb-8">
          {step === 1 ? "Enter Your Details" : "Create Your Account"}
        </div>

        {step === 1 && (
          <form onSubmit={handleNext}>
            {/* First Name Input */}
            <div className="relative mb-5">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-[300px] bg-transparent border border-blue-300 
                rounded-full py-2 px-4 pl-10 focus:outline-none 
                focus:border-2 placeholder:text-blue-300 
                placeholder:text-opacity-80 text-white"
                required
              />
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
            </div>

            {/* Last Name Input */}
            <div className="relative mb-5">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-[300px] bg-transparent border border-blue-300 
                rounded-full py-2 px-4 pl-10 focus:outline-none 
                focus:border-2 placeholder:text-blue-300 
                placeholder:text-opacity-80 text-white"
                required
              />
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
            </div>

            {/* Birthday Input */}
            <div className="relative mb-5">
              <div className="mb-2 ml-2">
                <label htmlFor="birthday" className="text-blue-300">
                  Birthday
                </label>
              </div>

              <input
                type="date"
                name="birthday"
                id="birthday" // Add id for the label to associate with the input
                value={formData.birthday}
                onChange={handleChange}
                className="w-[300px] bg-transparent border border-blue-300 
                rounded-full py-2 px-4 focus:outline-none 
                focus:border-2 text-white"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative mb-5">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-[300px] bg-transparent border border-blue-300 
                rounded-full py-2 px-4 pl-10 focus:outline-none 
                focus:border-2 placeholder:text-blue-300 
                placeholder:text-opacity-80 text-white"
                required
              />
            </div>

            {/* Usually Travel With Text Input */}
            <div className="relative mb-5">
              <input
                type="text"
                name="travelWith"
                placeholder="Usually Travel With"
                value={formData.travelWith}
                onChange={handleChange}
                className="w-[300px] bg-transparent border border-blue-300 
                rounded-full py-2 px-4 pl-10 focus:outline-none 
                focus:border-2 placeholder:text-blue-300 
                placeholder:text-opacity-80 text-white"
              />
            </div>

            {/* Next Button */}
            <button
              className="w-[300px] mt-4 bg-white rounded-full 
              py-2 hover:bg-opacity-30 transition duration-200 text-black text-opacity-80 font-bold"
            >
              Next
            </button>
            <div className="flex justify-center pt-2">
              {/* Go to Login Link */}
              <a
                href="/login"
                className="mt-2 text-blue-300 text-sm hover:underline"
              >
                Go to Login
              </a>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleRegister}>
            {/* Username Input */}
            <div className="relative mb-5">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-[300px] bg-transparent border border-blue-300 
                rounded-full py-2 px-4 pl-10 focus:outline-none 
                focus:border-2 placeholder:text-blue-300 
                placeholder:text-opacity-80 text-white"
                required
              />
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
            </div>

            {/* Password Input */}
            <div className="relative mb-5">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-[300px] bg-transparent border border-blue-300 
                rounded-full py-2 px-4 pl-10 focus:outline-none 
                focus:border-2 placeholder:text-blue-300 
                placeholder:text-opacity-80 text-white"
                required
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
            </div>

            {/* Confirm Password Input */}
            <div className="relative mb-5">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-[300px] bg-transparent border border-blue-300 
                rounded-full py-2 px-4 pl-10 focus:outline-none 
                focus:border-2 placeholder:text-blue-300 
                placeholder:text-opacity-80 text-white"
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
            </div>

            {/* Register Button */}
            <button
              className="w-[300px] mt-4 bg-white rounded-full 
              py-2 hover:bg-opacity-30 transition duration-200 text-black text-opacity-80 font-bold"
            >
              Register
            </button>

            {/* Go Back Link */}
            <div className="flex justify-center pt-2">
              <a
                href="#"
                onClick={() => setStep(step - 1)}
                className="mt-4 text-blue-300 text-sm hover:underline"
              >
                Go Back
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
