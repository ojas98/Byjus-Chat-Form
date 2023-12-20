import React, { useState, useEffect } from "react";
import sendButtonImage from "../assets/Send.png";
import logo1 from "../assets/Logo.png";

type MessageType = {
  text: string;
  sender: "user" | "computer" | "computer-typing";
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userInput, setUserInput] = useState<string>("");

  const computerOperators = ["Aditi", "Soutik", "Steven", "Lesley"];

  const getRandomOperator = () => {
    const randomIndex = Math.floor(Math.random() * computerOperators.length);
    return computerOperators[randomIndex];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      const userMessage: MessageType = { text: userInput, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Simulate computer response after a delay
      setTimeout(() => {
        const computerTypingMessage: MessageType = {
          text: `${getRandomOperator()} is typing...`,
          sender: "computer-typing",
        };
        setMessages((prevMessages) => [...prevMessages, computerTypingMessage]);

        // Simulate another delay before the actual response
        setTimeout(() => {
          const actualResponse: MessageType = {
            text: `Please share your Email ID.`,
            sender: "computer",
          };
          // Remove the "is typing..." message
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg.sender !== "computer-typing")
          );
          setMessages((prevMessages) => [...prevMessages, actualResponse]);
        }, 1000); // Adjust the delay as needed
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
    const initialOperator = getRandomOperator();
    setMessages([
      {
        text: `Hi! I'm ${initialOperator} from BYJU’S. I am here to help you book your free demo class.`,
        sender: "computer",
      },
      {
        text: `${initialOperator} is typing...`,
        sender: "computer-typing",
      },
    ]);

    setTimeout(() => {
      const actualResponse: MessageType = {
        text: `Please share your Email ID.`,
        sender: "computer",
      };
      // I remove the "is typing..." message
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.sender !== "computer-typing")
      );
      setMessages((prevMessages) => [...prevMessages, actualResponse]);
    }, 2000); // Adjust the delay
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
              {message.sender === "computer-typing" ? (
                <div style={{ fontStyle: "italic", color: "#999" }}>
                  {message.text}
                </div>
              ) : (
                message.text
              )}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
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
