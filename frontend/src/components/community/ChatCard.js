function ChatCard({ profilePicture, username, name, idea }) {
  return (
    <div className="sw-480:text-[16px] text-[14px] h-auto sw-900:w-[750px] sw-480:w-[480px] sw-360:w-[350px] border-2 border-gray-400 border-opacity-40 rounded-md sw-480:p-5 p-3 font-open-sans-condensed">
      <div className="flex">
        <div className="w-[60px] h-[60px] border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={profilePicture} // Replace with your image source
            alt="Description"
            className="w-full h-full object-cover p-1 rounded-full" // Ensure it covers the circular area
          />
        </div>
        <div className="pl-5 flex flex-col justify-center">
          <div className="font-semibold">{username}</div>
          <div className="sw-480:text-[14px] text-[12px]">{name}</div>
        </div>
      </div>

      <div className="ml-[60px] mt-2 pl-5 flex flex-col gap-6">
        <div>{idea}</div>
      </div>
    </div>
  );
}

export default ChatCard;
