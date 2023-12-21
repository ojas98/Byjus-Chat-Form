// ChatbotContent.tsx
import React from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

type MessageType = {
  text: string;
  sender: "user" | "computer" | "computer-typing";
};

type ChatbotContentProps = {
  messages: MessageType[];
  userInput: string;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onInputKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onSendMessage: () => void;
};

const ChatbotContent: React.FC<ChatbotContentProps> = ({
  messages,
  userInput,
  onInputChange,
  onInputKeyDown,
  onSendMessage,
}) => (
  <div className="chatbot-content">
    <div className="message-container">
      {messages.map((message, index) => (
        <ChatMessage key={index} {...message} />
      ))}
    </div>
    <ChatInput
      value={userInput}
      onChange={onInputChange}
      onKeyDown={onInputKeyDown}
      onClick={onSendMessage}
    />
  </div>
);

export default ChatbotContent;
