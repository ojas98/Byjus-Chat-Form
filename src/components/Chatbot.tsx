// Chatbot.tsx
import React, { useState, useEffect, useRef } from "react";
import ChatbotContent from "./ChatbotContent";
import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import CardBody from "./Card/CardBody";

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
        }, 1000);
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
      }, 2000);
      hasRun.current = true;
    }
  }, [getRandomOperator]);

  return (
    // <div className="chatbot-container">
    //   <ChatbotContent
    //     messages={messages}
    //     userInput={userInput}
    //     onInputChange={(e) => setUserInput(e.target.value)}
    //     onInputKeyDown={handleKeyPress}
    //     onSendMessage={handleSendMessage}
    //   />
    // </div>
    <Card>
      <CardHeader>
        <div className="text-brand font-bold text-3xl">Book a Demo Class</div>
      </CardHeader>
      <CardBody></CardBody>
    </Card>
  );
};

export default Chatbot;
