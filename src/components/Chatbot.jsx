import { useState } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [open, setOpen] = useState(false);

  return (
    <div className="chatbot-wrapper">
      {open && (
        <div className="chatbox">
          <h4>Mom AI Assistant</h4>
          <p>How can I help you today?</p>
          <button>Medicine help</button>
          <button>Health tips</button>
          <button>Order tracking</button>
        </div>
      )}
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        {open ? "Close" : "AI Help"}
      </button>
    </div>
  );
}

export default Chatbot;
