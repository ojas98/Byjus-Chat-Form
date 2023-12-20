import React, { useState, useEffect, useRef } from "react";
import sendButtonImage from "../assets/Send.png";
import logo1 from "../assets/Logo.png";

type MessageType = {
  text: string;
  sender: "user" | "computer" | "computer-typing";
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const hasRun = useRef(false);

  const computerOperators = ["Aditi", "Soutik", "Steven", "Lesley"];

  const getRandomOperator = () =>
    computerOperators[Math.floor(Math.random() * computerOperators.length)];

  const addUserMessage = (text: string) => {
    const userMessage: MessageType = { text, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  };

  const addComputerTypingMessage = () => {
    const computerTypingMessage: MessageType = {
      text: `${getRandomOperator()} is typing...`,
      sender: "computer-typing",
    };
    setMessages((prevMessages) => [...prevMessages, computerTypingMessage]);
  };

  const addComputerResponseMessage = (text: string) => {
    const computerResponse: MessageType = { text, sender: "computer" };
    setMessages((prevMessages) =>
      prevMessages
        .filter((msg) => msg.sender !== "computer-typing")
        .concat(computerResponse)
    );
  };

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      addUserMessage(userInput);

      setTimeout(() => {
        addComputerTypingMessage();

        setTimeout(() => {
          addComputerResponseMessage("Please share your Email ID.");
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
    if (!hasRun.current) {
      const initialOperator = getRandomOperator();
      setMessages([
        {
          text: `Hi! I'm ${initialOperator} from BYJU’S. I am here to help you book your free demo class.`,
          sender: "computer",
        },
        { text: `${initialOperator} is typing...`, sender: "computer-typing" },
      ]);

      setTimeout(() => {
        addComputerResponseMessage("Please share your Email ID.");
      }, 2000); // Adjust the delay
      hasRun.current = true;
    }
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
            onChange={(e) => setUserInput(e.target.value)}
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
