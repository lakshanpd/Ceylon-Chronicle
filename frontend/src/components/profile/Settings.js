import { useState } from "react";
import { useAuth } from "../AuthContext";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Settings() {
  const { user, login } = useAuth();

  // Format the birthday to "YYYY-MM-DD"
  const formatDate = (date) => {
    if (!date) return ""; // Handle null or undefined dates
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // Extract the date part in "YYYY-MM-DD" format
  };

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [birthday, setBirthday] = useState(formatDate(user.birthday)); // Format birthday
  const [travelWith, setTravelWith] = useState(user.travelWith);
  const [profilePicture, setProfilePicture] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);

  const saveUserDetails = async (e) => {
    e.preventDefault();
    try {
      let profilePictureURL = user.profilePicture;
      if (profilePicture) {
        const storageRef = ref(
          storage,
          `profilePictures/${user._id}/${profilePicture.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, profilePicture);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error("Error uploading image:", error);
          },
          async () => {
            profilePictureURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Image uploaded successfully:", profilePictureURL);
            await updateUserDetails(profilePictureURL);
          }
        );
      } else {
        await updateUserDetails(profilePictureURL);
      }
    } catch (error) {
      console.error("Error changing user details", error);
    }
  };

  const updateUserDetails = async (profilePictureURL) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/updateUserDetails",
        {
          method: "POST",
          body: JSON.stringify({
            _id: user._id,
            firstName,
            lastName,
            birthday,
            travelWith,
            profilePicture: profilePictureURL,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedUserDetails = await response.json();
      console.log("User details edited successfully", updatedUserDetails);
      login(localStorage.getItem("token"), updatedUserDetails);
    } catch (error) {
      console.error("Error updating user details in backend", error);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  return (
    <div className="flex flex-col w-full md:max-w-2xl sm:max-w-lg sw-480:max-w-md sw-360:max-w-xs bg-gray-100 rounded-3xl border-2 border-lightBlue border-opacity-50 p-6 mt-4 sm:mt-8">
      <h2 className="font-semibold text-xl mb-6 text-center sm:text-left">
        Edit Details
      </h2>
      <form
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        onSubmit={saveUserDetails}
      >
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="p-2 border rounded-md w-full"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="p-2 border rounded-md w-full"
        />
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
        <select
          value={travelWith}
          onChange={(e) => setTravelWith(e.target.value)}
          className="p-2 border rounded-md w-full"
        >
          <option value="Single">Single</option>
          <option value="Couple">Couple</option>
          <option value="Friends">Friends</option>
        </select>

        <div className="col-span-1 sm:col-span-2">
          <label className="block mb-2 font-semibold">Profile Picture</label>
          <input
            type="file"
            onChange={handleProfilePictureChange}
            className="p-2 border rounded-md w-full"
            accept="image/*"
          />
        </div>

        {uploadProgress > 0 && (
          <div className="col-span-1 sm:col-span-2 text-sm text-blue-600">
            Upload progress: {Math.round(uploadProgress)}%
          </div>
        )}

        <button
          type="submit"
          className="col-span-1 sm:col-span-2 p-2 bg-lightBlue text-white rounded-md hover:bg-blue-500 transition"
        >
          Save Details
        </button>
      </form>
    </div>
  );
}

export default Settings;
