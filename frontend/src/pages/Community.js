import { useState, useEffect } from "react";
import ChatCard from "../components/community/ChatCard";
import { useAuth } from "../components/AuthContext";

function Community() {
  const [comment, setComment] = useState("");
  const { user, isAuthenticated } = useAuth();
  const [chats, setChats] = useState([{}]);
  const [visibleChats, setVisibleChats] = useState(5);

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
      .then(() => {
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
    setVisibleChats((prevVisibleChats) => prevVisibleChats + 3);
  };

  const handleShowLess = () => {
    setVisibleChats((prevVisibleChats) => Math.max(prevVisibleChats - 3, 5));
  };

  return (
    <div>
      <div className="sw-480:mt-40 mt-28 flex flex-col gap-10 items-center px-4">
        {chats
          .slice()
          .reverse()
          .slice(0, visibleChats)
          .map((chat, index) => (
            <ChatCard
              profilePicture={chat.profilePicture}
              username={chat.username}
              name={`${chat.firstName} ${chat.lastName}`}
              idea={chat.idea}
              key={index}
              className="w-full max-w-[700px]"
            />
          ))}
        <div className="flex gap-5">
          {visibleChats < chats.length && (
            <button
              onClick={handleShowMore}
              className="bg-transparent border-2 border-lightBlue px-2 py-1 rounded-lg hover:bg-lightBlue hover:text-white text-[14px] font-semibold"
            >
              Show More
            </button>
          )}
          {visibleChats > 5 && (
            <button
              onClick={handleShowLess}
              className="bg-transparent border-2 border-lightBlue px-2 py-1 rounded-lg hover:bg-lightBlue hover:text-white text-[14px] font-semibold"
            >
              Show Less
            </button>
          )}
        </div>

        {isAuthenticated ? (
          <div className="w-full sw-900:max-w-[750px] max-w-[600px]">
            <form
              onSubmit={submitChat}
              className="mt-5 flex flex-col gap-4 w-full"
            >
              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Add your comment here..."
                className="border rounded-lg p-2 w-full h-[100px] resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-lightBlue px-2 py-1 rounded-lg hover:bg-blue-400 text-[14px] font-semibold text-black text-opacity-80 w-20"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="sw-480:text-xl text-lg font-bold text-black text-opacity-70 sw-480:mt-10 mt-5">
            Register to our blog for adding your ideas here!
          </div>
        )}
      </div>
    </div>
  );
}

export default Community;
