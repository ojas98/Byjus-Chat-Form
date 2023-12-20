import React, { useState, useEffect } from "react";
import sendButtonImage from "../assets/Send.png";
import logo1 from "../assets/Logo.png";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "computer" }[]
  >([]);

  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    setMessages([...messages, { text: inputValue, sender: "user" }]);
    setInputValue("");
  };

  useEffect(() => {
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
            value={inputValue}
            onChange={handleInputChange}
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
