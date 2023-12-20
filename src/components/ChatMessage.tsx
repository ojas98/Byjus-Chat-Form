// ChatMessage.tsx
import React from "react";

type ChatMessageProps = {
  text: string;
  sender: "user" | "computer" | "computer-typing";
};

const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender }) => {
  return (
    <div className={`chat-message ${sender}`}>
      {sender === "computer-typing" ? (
        <div style={{ fontStyle: "italic", color: "#999" }}>{text}</div>
      ) : (
        text
      )}
    </div>
  );
};

export default ChatMessage;
