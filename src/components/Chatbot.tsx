// Chatbot.tsx
import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import CardBody from "./Card/CardBody";
import { UserData, UserDataContextProvider } from "../contexts/UserDataContext";
import MessageController from "./Message/MessageController";
import { BotContextProvider, bots } from "../contexts/BotContext";

const G_FORM_APP =
  "https://script.google.com/macros/s/AKfycbwo8hvSpvR3gKxkU94BQ_pzPYmNde3uvl_9RZr54aVYu8vUUt99BkG72t2ase5sIexIjg/exec";

async function submitData(data: UserData) {
  try {
    const body = { ...data, sheet: "Sheet4" };
    const response = await fetch(G_FORM_APP, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit data. Status: ${response.status}`);
    }

    // You might want to handle the response here if needed
    const responseData = await response.json();
    console.log("Form submission successful:", responseData);
  } catch (error) {
    console.error("Error submitting data:", (error as Error).message);
    // You can add additional error handling logic here
  }
}

const Chatbot: React.FC = () => {
  const [data, setData] = React.useState<UserData>({
    email: "",
    grade: "",
    date: "",
    time: "",
    phone: "",
  });

  const [bot, setBot] = useState(bots[0]);

  useEffect(() => {
    setBot(bots[Math.floor(Math.random() * bots.length)]);
  }, []);

  return (
    <UserDataContextProvider value={{ data, setData }}>
      <BotContextProvider value={bot}>
        <Card>
          <CardHeader>
            <div className="text-brand font-bold text-3xl">
              Book a Demo Class
            </div>
          </CardHeader>
          <CardBody>
            <MessageController
              onComplete={() => {
                submitData(data);
              }}
            />
          </CardBody>
        </Card>
      </BotContextProvider>
    </UserDataContextProvider>
  );
};

export default Chatbot;
