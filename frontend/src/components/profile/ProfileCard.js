import { useAuth } from "../AuthContext";

function ProfileCard() {
  const { user, logout } = useAuth();

  // Check if user is defined before accessing its properties
  if (!user) {
    console.log(logout);

    return <div className="text-center text-red-500">User not logged in</div>; // You can also redirect or show a loading spinner here
  }

  return (
    <div className="flex w-[750px] h-[400px] bg-transparent border rounded-lg p-4 shadow-md">
      <div className="flex flex-col justify-center items-center w-1/2 text-black pt-6">
        <img
          src={user.profilePicture} // Update with the appropriate profile image
          className="w-1/2 bg-white border rounded-full shadow-md p-1"
          alt="Profile"
        />
        <div className="mt-3 font-open-sans-condensed font-semibold text-[17px]">
          {user.username} {/* Display the user's username */}
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-start justify-center gap-2 text-[17px] font-open-sans-condensed font-semibold pt-10">
        <div>
          Name: {user.firstName} {user.lastName}
        </div>{" "}
        {/* Display user's first and last name */}
        <div>Email: {user.email}</div> {/* Display user's email */}
        <div>Age: {calculateAge(user.birthday)} years old</div>{" "}
        {/* Calculate and display age */}
        <div>Usually travel with {user.travelWith}</div>{" "}
        {/* Display travel preference */}
        <div className="bottom-5 flex gap-3 pt-10">
          <a href="#" className="w-9 hover:cursor-pointer">
            <img src="/images/facebook.png" alt="Facebook" />
          </a>
          <a href="#" className="w-9 hover:cursor-pointer">
            <img src="/images/twitter.png" alt="Twitter" />
          </a>
          <a href="#" className="w-9 hover:cursor-pointer">
            <img src="/images/google.png" alt="Google" />
          </a>
          <button onClick={logout} className="w-9 hover:cursor-pointer">
            <img src="/images/logout.png" alt="Logout" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Function to calculate age based on birthday
const calculateAge = (birthday) => {
  const birthDate = new Date(birthday);
  const ageDiff = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export default ProfileCard;
