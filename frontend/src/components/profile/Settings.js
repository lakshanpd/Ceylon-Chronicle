import { useState } from "react";

function Settings() {
  // Pre-filled user data (these would typically come from your backend)
  const [firstName, setFirstName] = useState("Danuka");
  const [lastName, setLastName] = useState("Lakshan");
  const [birthday, setBirthday] = useState("2001-05-15");
  const [travelWith, setTravelWith] = useState("friends");

  // State for advanced settings
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Handle saving user details
  const handleSaveDetails = () => {
    // Logic to save the updated details (send to backend)
    console.log("Details saved:", {
      firstName,
      lastName,
      birthday,
      travelWith,
    });
  };

  // Handle confirming changes for advanced settings
  const handleConfirmChanges = () => {
    // Simulate sending OTP to email
    setOtpSent(true);
    console.log("OTP sent to email");
  };

  // Handle saving advanced changes (with OTP)
  const handleSaveAdvancedChanges = () => {
    // Logic to save username/password with OTP (send to backend)
    console.log("Advanced changes saved:", { username, password, otp });
  };

  return (
    <div className="flex flex-col w-[750px] h-auto bg-gray-100 rounded-3xl border-2 border-lightBlue border-opacity-50 p-6">
      {/* Edit Details Section */}
      <div className="mb-6">
        <h2 className="font-semibold text-xl mb-4">Edit Details</h2>
        <form className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="p-2 border rounded-md"
          />
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="p-2 border rounded-md"
          />
          <select
            value={travelWith}
            onChange={(e) => setTravelWith(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="friends">Friends</option>
            <option value="family">Family</option>
            <option value="alone">Alone</option>
            <option value="colleagues">Colleagues</option>
          </select>
          <button
            type="button"
            onClick={handleSaveDetails}
            className="col-span-2 p-2 bg-lightBlue text-white rounded-md hover:bg-blue-500 transition"
          >
            Save Details
          </button>
        </form>
      </div>

      {/* Advanced Settings Section */}
      <div>
        <h2 className="font-semibold text-xl mb-4">Advanced Settings</h2>
        <form className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="New Username"
            className="p-2 border rounded-md"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="p-2 border rounded-md"
          />
          {!otpSent ? (
            <button
              type="button"
              onClick={handleConfirmChanges}
              className="col-span-2 p-2 bg-lightBlue text-white rounded-md hover:bg-blue-500 transition"
            >
              Confirm Changes
            </button>
          ) : (
            <>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="col-span-1 p-2 border rounded-md"
              />
              <button
                type="button"
                onClick={handleSaveAdvancedChanges}
                className="col-span-2 p-2 bg-lightBlue text-white rounded-md hover:bg-blue-500 transition"
              >
                Save Changes
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Settings;
