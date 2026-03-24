import { useState, useEffect } from "react";

const ChatbotPage = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Heyy 😊 I’m Riya! How can I help you today? 👗" }
  ]);
  const [input, setInput] = useState("");

  // ✅ Listen header button click
  useEffect(() => {
    const handleOpen = () => setOpen(true);

    window.addEventListener("openChatbot", handleOpen);

    return () => {
      window.removeEventListener("openChatbot", handleOpen);
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { type: "bot", text: "Got it! I’ll help you with that 💖" }
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <>
      {/* 💬 Floating Button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg,#ff7eb3,#ff758c)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "24px",
          cursor: "pointer",
          zIndex: 9999
        }}
      >
        💬
      </div>

      {/* 💬 Chat Popup */}
      {open && (
        <div style={{
          position: "fixed",
          bottom: "90px",
          right: "20px",
          width: "350px",
          height: "500px",
          background: "#fff",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          zIndex: 9999
        }}>
          
          {/* Header */}
          <div style={{
            background: "#ff758c",
            color: "#fff",
            padding: "12px",
            fontWeight: "bold"
          }}>
            👩 Riya 
            <span style={{ fontSize: "12px", marginLeft: "10px" }}>
              ● Online
            </span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                textAlign: msg.type === "user" ? "right" : "left",
                margin: "8px 0"
              }}>
                <span style={{
                  display: "inline-block",
                  background: msg.type === "user" ? "#d1e7ff" : "#ffe4ec",
                  padding: "8px 12px",
                  borderRadius: "12px"
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: "flex", borderTop: "1px solid #eee" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                outline: "none"
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                background: "#ff758c",
                color: "#fff",
                border: "none",
                padding: "10px 15px",
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default ChatbotPage;