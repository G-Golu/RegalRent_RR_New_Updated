import { useState, useEffect } from "react";
import "./chatbot.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  // 🔥 listen toggle event
  useEffect(() => {
    const handleToggle = () => {
      setOpen(prev => !prev);  // ✅ toggle open/close
    };

    window.addEventListener("toggleChatbot", handleToggle);

    return () => {
      window.removeEventListener("toggleChatbot", handleToggle);
    };
  }, []);

  

  return (
    <>
      {/* Floating Button */}
      <div className="chatbot-btn" onClick={() => setOpen(prev => !prev)}>
        {open ? "✖" : "💬"}
      </div>

      {/* Chat Window */}
      {open && (
        <div className="chatbot-box">
          <div className="chat-header">
            👩 Riya <span className="status">● Online</span>
          </div>

          <div className="chat-body">
            <div className="bot-msg">
              Heyy 😊 I’m Riya! Need help with outfits or orders? 👗
            </div>
          </div>

          <div className="chat-input">
            <input placeholder="Type your message..." />
            <button>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;