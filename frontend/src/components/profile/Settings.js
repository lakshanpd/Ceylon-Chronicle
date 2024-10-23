import { useState } from "react";
import { useAuth } from "../AuthContext";
import { storage } from "../firebase"; // Import Firebase storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase storage functions

function Settings() {
  const { user, login } = useAuth();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [birthday, setBirthday] = useState(user.birthday);
  const [travelWith, setTravelWith] = useState(user.travelWith);
  const [profilePicture, setProfilePicture] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);

  const saveUserDetails = async (e) => {
    e.preventDefault();

    try {
      let profilePictureURL = user.profilePicture; // Default to current profile picture

      // If a new profile picture is uploaded, handle Firebase upload
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
            setUploadProgress(progress); // Track progress
          },
          (error) => {
            console.error("Error uploading image:", error);
          },
          async () => {
            // Get the image download URL once the upload is complete
            profilePictureURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Image uploaded successfully:", profilePictureURL);

            // After getting the profile picture URL, update user details in the backend
            await updateUserDetails(profilePictureURL);
          }
        );
      } else {
        // If no new profile picture, directly update user details
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
            profilePicture: profilePictureURL, // Save the profile picture URL
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedUserDetails = await response.json();
      console.log("User details edited successfully", updatedUserDetails);

      // Call login with updated user data after successful update
      login(localStorage.getItem("token"), updatedUserDetails); // Assuming you want to retain the existing token
    } catch (error) {
      console.error("Error updating user details in backend", error);
    }
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  return (
    <div className="flex flex-col w-[750px] h-auto bg-gray-100 rounded-3xl border-2 border-lightBlue border-opacity-50 p-6">
      <div className="mb-6">
        <h2 className="font-semibold text-xl mb-4">Edit Details</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit={saveUserDetails}>
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
            <option value="Single">Single</option>
            <option value="Couple">Couple</option>
            <option value="Friends">Friends</option>
          </select>

          <div className="col-span-2">
            <label className="block mb-1 font-semibold">Profile Picture</label>
            <input
              type="file"
              onChange={handleProfilePictureChange}
              className="p-2 border rounded-md"
              accept="image/*"
            />
          </div>

          {uploadProgress > 0 && (
            <div className="col-span-2 text-sm text-blue-600">
              Upload progress: {Math.round(uploadProgress)}%
            </div>
          )}

          <button
            type="submit"
            className="col-span-2 p-2 bg-lightBlue text-white rounded-md hover:bg-blue-500 transition"
          >
            Save Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
