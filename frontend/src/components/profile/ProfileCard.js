import { useAuth } from "../AuthContext";

function ProfileCard() {
  const { user, logout } = useAuth();

  if (!user) {
    return <div className="text-center text-red-500">User not logged in</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row w-full lg:max-w-4xl sw-480:max-w-96 max-w-[320px] bg-transparent border rounded-lg p-4 shadow-md">
      {/* Left Section: Profile Image and Username */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 text-black py-6">
        <img
          src={user.profilePicture}
          className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 bg-white border-2 border-lightBlue object-cover rounded-full shadow-md p-1"
          alt="Profile"
        />
        <div className="mt-3 font-open-sans-condensed font-semibold text-lg sm:text-xl">
          {user.username}
        </div>
      </div>

      {/* Right Section: User Details and Actions */}
      <div className="w-full lg:w-1/2 flex flex-col lg:items-start items-center justify-center gap-2 text-base sm:text-lg font-open-sans-condensed font-semibold py-4 px-2 lg:px-6">
        <div>
          Name: {user.firstName} {user.lastName}
        </div>
        <div>Email: {user.email}</div>
        <div>Age: {calculateAge(user.birthday)} years old</div>
        <div>Usually travel with {user.travelWith}</div>
        <div className="flex gap-4 pt-6">
          {/* Social Media Icons */}
          <a href="#" className="w-8 sm:w-9 hover:cursor-pointer">
            <img src="/images/facebook.png" alt="Facebook" />
          </a>
          <a href="#" className="w-8 sm:w-9 hover:cursor-pointer">
            <img src="/images/twitter.png" alt="Twitter" />
          </a>
          <a href="#" className="w-8 sm:w-9 hover:cursor-pointer">
            <img src="/images/google.png" alt="Google" />
          </a>
          {/* Logout Button */}
          <button onClick={logout} className="w-8 sm:w-9 hover:cursor-pointer">
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
