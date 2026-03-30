// import { useState, useEffect, useRef } from "react";
// import "./chatbot.css";

// const Chatbot = () => {
//   const [open, setOpen] = useState(false);
//   const [mode, setMode] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     const handleToggle = () => setOpen(prev => !prev);
//     window.addEventListener("toggleChatbot", handleToggle);
//     return () => window.removeEventListener("toggleChatbot", handleToggle);
//   }, []);

//   // ✅ AUTO SCROLL
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ✅ BACK (WORKING NOW)
//   const handleBack = () => {
//     setMode(null);
//     setMessages([]);
//     setInput("");
//   };

//   // ✅ SEND MESSAGE
//   const sendMessage = () => {
//     if (!input.trim()) return;

//     const userMsg = { text: input, sender: "user" };
//     setMessages(prev => [...prev, userMsg]);

//     setTimeout(() => {
//       const reply = {
//         text:
//           mode === "ai"
//             ? "🤖 AI reply coming soon..."
//             : "👨‍💻 Our team will reply shortly...",
//         sender: "bot",
//       };
//       setMessages(prev => [...prev, reply]);
//     }, 700);

//     setInput("");
//   };

//   return (
//     <>
//       {/* FLOAT BUTTON */}
//       <div
//         className="cbp-btn-unique"
//         onClick={() => setOpen(prev => !prev)}
//       >
//         {mode === "ai" ? "🤖" : mode === "team" ? "👨‍💻" : "💬"}
//       </div>

//       {/* CHAT BOX */}
//       {open && (
//         <div className="cbp-box-unique">

//           {/* HEADER */}
//           <div className="cbp-header-unique">

//             {mode && (
//             <button
//   type="button"
//   className="cbp-back-btn-unique"
//   onClick={(e) => {
//     e.stopPropagation();   //  VERY IMPORTANT
//     handleBack();
//   }}
// >
//   ←
// </button>
//             )}

//             <span className="cbp-title-unique">
//               {mode === "ai" && "🤖 AI Assistant"}
//               {mode === "team" && "👨‍💻 Chat with Us"}
//               {!mode && "💬 Start Chat"}
//             </span>

//           </div>

//           {/* BODY */}
//           <div className="cbp-body-unique">

//             {!mode && (
//               <div className="cbp-options-unique">

//                 <div
//                   className="cbp-option-card-unique"
//                   onClick={() => setMode("ai")}
//                 >
//                   <div className="cbp-icon-unique">🤖</div>
//                   <div>
//                     <h4>Chat with AI</h4>
//                     <p>Instant automated replies</p>
//                   </div>
//                 </div>

//                 <div
//                   className="cbp-option-card-unique"
//                   onClick={() => setMode("team")}
//                 >
//                   <div className="cbp-icon-unique">👨‍💻</div>
//                   <div>
//                     <h4>Chat with Us</h4>
//                     <p>Talk to our support team</p>
//                   </div>
//                 </div>

//               </div>
//             )}

//             {/* CHAT */}
//             {mode && (
//               <div className="cbp-messages-unique">
//                 {messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={
//                       msg.sender === "user"
//                         ? "cbp-msg-user-unique"
//                         : "cbp-msg-bot-unique"
//                     }
//                   >
//                     {msg.text}
//                   </div>
//                 ))}

//                 <div ref={messagesEndRef}></div>
//               </div>
//             )}

//           </div>

//           {/* INPUT */}
//           {mode && (
//             <div className="cbp-input-unique">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type a message..."
//               />
//               <button onClick={sendMessage}>Send</button>
//             </div>
//           )}

//         </div>
//       )}
//     </>
//   );
// };

// export default Chatbot;


// comment for add chatbot text-speech and speech-to-text features in the future.
// 30-03-2026








import { useState, useEffect, useRef } from "react";
import "./chatbot.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [voiceType, setVoiceType] = useState("male");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef(null);

  // 🔥 LOAD VOICES FIX
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  useEffect(() => {
    const handleToggle = () => setOpen(prev => !prev);
    window.addEventListener("toggleChatbot", handleToggle);
    return () => window.removeEventListener("toggleChatbot", handleToggle);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleBack = () => {
    setMode(null);
    setMessages([]);
    setInput("");
  };

  //  send message with text-to-speech

const speakMessage = (text) => {
  if (!isSpeaking) return;

  const speech = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();

  let selectedVoice;

  if (voiceType === "female") {
    // female voice selection
    selectedVoice = voices.find(v =>
      v.name.includes("Zira") ||
      v.name.includes("Google UK English Female") ||
      v.name.toLowerCase().includes("female")
    );

    //  tuning
    speech.rate = 0.82;     // slow & soft
    speech.pitch = 1.35;    // high = feminine feel
    speech.volume = 1;

  } else {
    // 👨 Natural male voice selection
    selectedVoice = voices.find(v =>
      v.name.includes("David") ||
      v.name.includes("Google UK English Male") ||
      v.name.toLowerCase().includes("male")
    );

    // 👨 Natural tuning
    speech.rate = 0.95;     // normal speed
    speech.pitch = 0.95;    // slightly deep
    speech.volume = 1;
  }

  // 🔥 fallback (important)
  if (!selectedVoice) {
    selectedVoice = voices.find(v => v.lang === "en-US") || voices[0];
  }

  speech.voice = selectedVoice;
  speech.lang = "en-US";

  // 💖 Add natural pauses (romantic feel)
  let formattedText = text;

  if (voiceType === "female") {
    formattedText = text
      .replace(/\./g, "... ")   // pause after sentence
      .replace(/,/g, ", ... "); // soft pauses
  }

  speech.text = formattedText;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
};




  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const reply = {
        text:
          mode === "ai"
            ? "🤖 AI reply coming soon..."
            : "👨‍💻 Hi , I am RegalRenatl company assistance , what can i help you , Our team will reply shortly...",
            
        sender: "bot",
      };

      setMessages(prev => [...prev, reply]);
      speakMessage(reply.text);
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

      {open && (
        <div className="cbp-box-unique">

          {/* HEADER */}
          <div className="cbp-header-unique">

            {mode && (
              <button
                type="button"
                className="cbp-back-btn-unique"
                onClick={(e) => {
                  e.stopPropagation();
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

            {/* 🔥 VOICE TOGGLE TOP RIGHT */}
            {mode && (
              <div className="voice-toggle">
                <div
                  className={`voice-option ${voiceType === "male" ? "active" : ""}`}
                  onClick={() => setVoiceType("male")}
                >
                  👨
                </div>

                <div className="voice-swap">⇄</div>

                <div
                  className={`voice-option ${voiceType === "female" ? "active" : ""}`}
                  onClick={() => setVoiceType("female")}
                >
                  👩
                </div>
                <div
  className={`speak-toggle ${isSpeaking ? "active" : ""}`}
  onClick={() => setIsSpeaking(!isSpeaking)}
>
  🔊
</div>
              </div>
            )}

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