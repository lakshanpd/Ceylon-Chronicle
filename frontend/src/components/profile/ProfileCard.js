function ProfileCard() {
  return (
    <div className="flex w-[750px] h-[400px] bg-transparent border rounded-lg p-4 shadow-md ">
      <div className="flex flex-col justify-center items-center w-1/2 text-black pt-6">
        <img
          src="/images/profile/cat.jpg"
          className="w-1/2 bg-white border rounded-full shadow-md  p-1"
        />
        <div className="mt-3 font-open-sans-condensed font-semibold text-[17px]">
          User_Name
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-start justify-center gap-2 text-[17px] font-open-sans-condensed font-semibold pt-10">
        <div>Name: Danuka Lakshan</div>
        <div>Email: dhanuka.21@cse.mrt.ac.lk</div>
        <div>Age: 23 years old</div>
        <div>Usually travel with friends</div>
        <div className="bottom-5 flex gap-3 pt-10">
          {" "}
          <a href="#" className="w-9 hover:cursor-pointer">
            <img src="/images/facebook.png" alt="Facebook" />
          </a>
          <a href="#" className="w-9 hover:cursor-pointer">
            <img src="/images/twitter.png" alt="Twitter" />
          </a>
          <a href="#" className="w-9 hover:cursor-pointer">
            <img src="/images/google.png" alt="Google" />
          </a>
          <a href="#" className="w-9 hover:cursor-pointer">
            <img src="/images/logout.png" alt="Google" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
