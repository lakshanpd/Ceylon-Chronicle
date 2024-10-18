import React, { useState, useEffect, useRef } from "react";

const LoginPopup = ({ isOpen, onClose, onLogin }) => {
  const [showSelection, setShowSelection] = useState(true); // Manage the visibility of selection
  const [step, setStep] = useState(1); // Controls the step in the form
  const popupRef = useRef(null); // Reference to the popup container
  const [loginData, setLoginData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    travelWith: "",
    username: "",
    password: "",
  });
  const [validateData, setValidateData] = useState({
    username: "",
    password: "",
  });

  const submit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/register", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res.status);
          throw new Error("Network response was not ok"); // Handle HTTP errors
        }
        return res.json(); // Parse the response JSON
      })
      .then((json) => console.log("login data saved successfully...", json))
      .catch((e) => console.log(e));
    // console.log(loginData);
  };

  const validate = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/login", {
      method: "POST",
      body: JSON.stringify(validateData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          console.log("log in successfully");

          onLogin();
          return res.json();
        }
      })
      .then((json) => {
        console.log(json);
      })
      .catch((e) => console.log(e));
    console.log(validateData);
  };

  // Close the popup if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
        setShowSelection(true);
      }
    };

    // Add event listener when the component mounts
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Remove the event listener when the component unmounts or when the popup is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null; // Don't render if not open

  const handleSelection = (type) => {
    setShowSelection(false); // Hide the selection popup
    setStep(type === "signup" ? 1 : 3); // Set step based on the selection
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-open-sans">
      <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg">
        {showSelection ? (
          <div className="flex flex-col items-center">
            <h2 className="text-lg mb-4">Sign Up or Sign In</h2>
            <div className="flex space-x-4">
              <button
                className="bg-lightBlue hover:bg-blue-500 text-white p-3 rounded-xl"
                onClick={() => handleSelection("signup")}
              >
                Sign Up
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-xl"
                onClick={() => handleSelection("signin")}
              >
                Sign In
              </button>
            </div>
          </div>
        ) : (
          <form className="w-64">
            {step === 1 && (
              <>
                <div className="mb-4">
                  <label className="block text-sm pb-2">First Name</label>
                  <input
                    type="text"
                    className="border border-black border-opacity-50 rounded-lg p-2 w-full text-sm"
                    required
                    value={loginData.firstName}
                    onChange={(e) =>
                      setLoginData({ ...loginData, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm pb-2">Last Name</label>
                  <input
                    type="text"
                    className="border border-black border-opacity-50 rounded-lg p-2 w-full text-sm"
                    required
                    value={loginData.lastName}
                    onChange={(e) =>
                      setLoginData({ ...loginData, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm pb-2">Birthday</label>
                  <input
                    type="date"
                    className="border border-black border-opacity-50 rounded-lg p-2 w-full text-sm"
                    required
                    value={loginData.birthday}
                    onChange={(e) =>
                      setLoginData({ ...loginData, birthday: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm pb-2">Email</label>
                  <input
                    type="email"
                    className="border border-black border-opacity-50 rounded-lg p-2 w-full text-sm"
                    required
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm pb-2">
                    Usually Travel With
                  </label>
                  <select
                    className="border border-black border-opacity-50 rounded-lg p-2 w-full text-sm"
                    required
                    value={loginData.travelWith}
                    onChange={(e) =>
                      setLoginData({ ...loginData, travelWith: e.target.value })
                    }
                  >
                    <option value="single">Single</option>
                    <option value="couple">Couple</option>
                    <option value="friends">Friends</option>
                  </select>
                </div>

                <div className="flex justify-between mt-10">
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-xl"
                    onClick={() => setShowSelection(true)} // Back to selection
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="bg-lightBlue hover:bg-blue-500 text-white text-sm p-3 rounded-xl"
                    onClick={() => setStep(2)}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="mb-4">
                  <label className="block text-sm pb-2">Username</label>
                  <input
                    type="text"
                    className="border border-black border-opacity-50 rounded-lg p-2 w-full text-sm"
                    required
                    value={loginData.username}
                    onChange={(e) =>
                      setLoginData({ ...loginData, username: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm pb-2">Password</label>
                  <input
                    type="password"
                    className="border border-black border-opacity-50 rounded-lg p-2 w-full text-sm"
                    required
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm pb-2">Confirm Password</label>
                  <input
                    type="password"
                    className="border border-black border-opacity-50 rounded-lg p-2 w-full text-sm"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-xl ml-2 text-sm"
                    onClick={() => setShowSelection(true)} // Go back to selection
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-lightBlue hover:bg-blue-500 text-white p-3 rounded-xl text-sm"
                    onClick={submit}
                  >
                    Login
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="mb-4">
                  <label className="block text-sm pb-2">Username</label>
                  <input
                    type="text"
                    className="border border-black border-opacity-50 rounded-lg p-2 w-full text-sm"
                    required
                    value={validateData.username}
                    onChange={(e) =>
                      setValidateData({
                        ...validateData,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm pb-2">Password</label>
                  <input
                    type="password"
                    className="border border-black border-opacity-50 rounded-lg p-2 w-full text-sm"
                    required
                    value={validateData.password}
                    onChange={(e) =>
                      setValidateData({
                        ...validateData,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-between mt-10">
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-xl ml-2 text-sm"
                    onClick={() => setShowSelection(true)} // Go back to selection
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-lightBlue hover:bg-blue-500 text-white p-3 rounded-xl text-sm"
                    onClick={validate}
                  >
                    Sign In
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
