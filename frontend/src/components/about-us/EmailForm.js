import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

const EmailForm = () => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setPlaceholder("Enter your message here");
    } else {
      setPlaceholder("Please Register Before Contacting Us");
    }
  }, [isAuthenticated]); // Add dependency array here

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!message.trim()) {
      setError("Message cannot be empty.");
      return;
    }

    setIsSending(true);
    setError("");

    try {
      if (!user || !user.email) {
        throw new Error("User email is not available.");
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.status === "success") {
        setSuccess(true);
        setMessage("");
      }
    } catch (err) {
      setError("Failed to send email. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="email-form bg-white p-4 rounded font-open-sans-condensed">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <p className="font-open-sans-condensed font-bold sw-1400:text-[22px] sw-1250:text-[26px] sw-480:text-[28px] opacity-70 sw-1250:text-start text-center sw-360:text-[22px]">
          Contact Us!
        </p>
        <div className="mb-2 mt-3">
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="4"
            className="border border-gray-300 rounded p-2 w-full"
            placeholder={placeholder}
          />
        </div>
        {success && (
          <div className="text-green-600 mb-2">Email sent successfully!</div>
        )}
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button
          type="submit"
          disabled={isSending}
          className={`bg-blue-500 w-32 ml-auto text-white py-2 px-4 rounded ${
            isSending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
