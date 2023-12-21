// Chatbot.tsx
import React from "react";

import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import CardBody from "./Card/CardBody";
import { UserData, UserDataContextProvider } from "../contexts/UserDataContext";
import MessageController from "./Message/MessageController";

// const G_FORM_APP =
//   "https://script.google.com/macros/s/AKfycbwo8hvSpvR3gKxkU94BQ_pzPYmNde3uvl_9RZr54aVYu8vUUt99BkG72t2ase5sIexIjg/exec";

// function sumbitData(data: UserData) {
//   const body = { ...data, sheet: "Sheet3" };
//   fetch(G_FORM_APP, {
//     method: "POST",
//     body: JSON.stringify(body),
//   });
// }

const Chatbot: React.FC = () => {
  const [data, setData] = React.useState<UserData>({
    email: "",
    grade: "",
    date: "",
    time: "",
  });

  return (
    <UserDataContextProvider value={{ data, setData }}>
      <Card>
        <CardHeader>
          <div className="text-brand font-bold text-3xl">Book a Demo Class</div>
        </CardHeader>
        <CardBody>
          <MessageController />
        </CardBody>
      </Card>
    </UserDataContextProvider>
  );
};

export default Chatbot;
