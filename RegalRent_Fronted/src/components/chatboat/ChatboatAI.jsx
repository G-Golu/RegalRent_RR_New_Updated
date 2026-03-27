import { useState, useEffect, useRef } from "react";
import "./chatbot.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleToggle = () => setOpen(prev => !prev);
    window.addEventListener("toggleChatbot", handleToggle);
    return () => window.removeEventListener("toggleChatbot", handleToggle);
  }, []);

  // ✅ AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ BACK (WORKING NOW)
  const handleBack = () => {
    setMode(null);
    setMessages([]);
    setInput("");
  };

  // ✅ SEND MESSAGE
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const reply = {
        text:
          mode === "ai"
            ? "🤖 AI reply coming soon..."
            : "👨‍💻 Our team will reply shortly...",
        sender: "bot",
      };
      setMessages(prev => [...prev, reply]);
    }, 700);

    setInput("");
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <div
        className="cbp-btn-unique"
        onClick={() => setOpen(prev => !prev)}
      >
        {mode === "ai" ? "🤖" : mode === "team" ? "👨‍💻" : "💬"}
      </div>

      {/* CHAT BOX */}
      {open && (
        <div className="cbp-box-unique">

          {/* HEADER */}
          <div className="cbp-header-unique">

            {mode && (
            <button
  type="button"
  className="cbp-back-btn-unique"
  onClick={(e) => {
    e.stopPropagation();   //  VERY IMPORTANT
    handleBack();
  }}
>
  ←
</button>
            )}

            <span className="cbp-title-unique">
              {mode === "ai" && "🤖 AI Assistant"}
              {mode === "team" && "👨‍💻 Chat with Us"}
              {!mode && "💬 Start Chat"}
            </span>

          </div>

          {/* BODY */}
          <div className="cbp-body-unique">

            {!mode && (
              <div className="cbp-options-unique">

                <div
                  className="cbp-option-card-unique"
                  onClick={() => setMode("ai")}
                >
                  <div className="cbp-icon-unique">🤖</div>
                  <div>
                    <h4>Chat with AI</h4>
                    <p>Instant automated replies</p>
                  </div>
                </div>

                <div
                  className="cbp-option-card-unique"
                  onClick={() => setMode("team")}
                >
                  <div className="cbp-icon-unique">👨‍💻</div>
                  <div>
                    <h4>Chat with Us</h4>
                    <p>Talk to our support team</p>
                  </div>
                </div>

              </div>
            )}

            {/* CHAT */}
            {mode && (
              <div className="cbp-messages-unique">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg.sender === "user"
                        ? "cbp-msg-user-unique"
                        : "cbp-msg-bot-unique"
                    }
                  >
                    {msg.text}
                  </div>
                ))}

                <div ref={messagesEndRef}></div>
              </div>
            )}

          </div>

          {/* INPUT */}
          {mode && (
            <div className="cbp-input-unique">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          )}

        </div>
      )}
    </>
  );
};

export default Chatbot;