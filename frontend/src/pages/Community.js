import { useState, useEffect } from "react";
import ChatCard from "../components/community/ChatCard";
import { useAuth } from "../components/AuthContext";

function Community() {
  const [comment, setComment] = useState("");
  const { user, isAuthenticated } = useAuth();
  const [chats, setChats] = useState([{}]);
  const [visibleChats, setVisibleChats] = useState(5); // Control the number of visible chats

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const submitChat = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/sendChat", {
      method: "POST",
      body: JSON.stringify({
        userId: user._id,
        profilePicture: user.profilePicture,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        idea: comment,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Chat saving failed");
        }
      })
      .then((data) => {
        console.log("Saved chat successfully");
        setComment("");
      })
      .catch((e) => console.log("Error:", e));
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/getAllChats")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching chats");
        }
        return res.json();
      })
      .then((json) => {
        setChats(json);
      })
      .catch((err) => console.log(err));
  }, [chats]);

  const handleShowMore = () => {
    setVisibleChats((prevVisibleChats) => prevVisibleChats + 3); // Show 3 more posts
  };

  const handleShowLess = () => {
    setVisibleChats((prevVisibleChats) => Math.max(prevVisibleChats - 3, 5)); // Show 3 less posts, but minimum 5
  };

  return (
    <div className="mt-40 flex flex-col gap-10 items-center">
      {/* Reverse the chats array to show latest messages at the top */}
      {chats
        .slice()
        .reverse()
        .slice(0, visibleChats) // Display only the number of visible chats
        .map((chat, index) => (
          <ChatCard
            profilePicture={chat.profilePicture}
            username={chat.username}
            name={`${chat.firstName} ${chat.lastName}`}
            idea={chat.idea}
            key={index}
          />
        ))}
      <div className="flex gap-5">
        {visibleChats < chats.length && (
          <button
            onClick={handleShowMore}
            className="bg-transparent border-2 border-lightBlue px-2 py-1 rounded-lg mr-2 hover:bg-lightBlue hover:text-white text-[14px] font-semibold text-black text-opacity-80"
          >
            Show More
          </button>
        )}

        {visibleChats > 5 && (
          <button
            onClick={handleShowLess}
            className="bg-transparent border-2 border-lightBlue px-2 py-1 rounded-lg mr-2 hover:bg-lightBlue hover:text-white text-[14px] font-semibold text-black text-opacity-80"
          >
            Show Less
          </button>
        )}
      </div>

      {isAuthenticated ? (
        <div className="w-[750px]">
          <form onSubmit={submitChat} className="mt-5 flex items-end w-full">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add your comment here..."
              className="border rounded-lg p-2 w-full h-[100px] resize-none"
            />
            <button
              type="submit"
              className="bg-lightBlue ml-6 px-2 py-1 rounded-lg mr-2 hover:bg-blue-400 text-[14px] font-semibold text-black text-opacity-80"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="text-xl font-open-sans-condensed font-bold text-black text-opacity-70 mt-10">
          Register to our blog for adding your ideas here!
        </div>
      )}
    </div>
  );
}

export default Community;
