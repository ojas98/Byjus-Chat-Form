import React, { useState, useEffect } from "react";
import sendButtonImage from "../assets/Send.png";
import logo1 from "../assets/Logo.png";

type MessageType = {
  text: string;
  sender: "user" | "computer";
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userInput, setUserInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      const userMessage: MessageType = { text: userInput, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Simulate computer response after a delay (you can customize the delay)
      setTimeout(() => {
        const computerResponse: MessageType = {
          text: "Computer response...",
          sender: "computer",
        };
        setMessages((prevMessages) => [...prevMessages, computerResponse]);
      }, 500);
    }
    setUserInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Initial computer message
    setMessages([
      {
        text: "Hi! I'm Aditi from BYJU’S. I am here to help you book your free demo class.",
        sender: "computer",
      },
    ]);
  }, []);

  return (
    <div className="chatbot-container">
      <div className="chatbot-content">
        <div className="logo-container">
          <img src={logo1} alt="Logo 1" className="logo-image" />
        </div>
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress} // Add this line
            placeholder="Type here..."
            className="input-field"
          />
          <button
            onClick={handleSendMessage}
            className="send-button"
            style={{ backgroundImage: `url(${sendButtonImage})` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
