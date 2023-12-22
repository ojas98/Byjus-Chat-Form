// Chatbot.tsx
import React from "react";

import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import CardBody from "./Card/CardBody";
import { UserData, UserDataContextProvider } from "../contexts/UserDataContext";
import MessageController from "./Message/MessageController";

const G_FORM_APP =
  "https://script.google.com/a/macros/byjus.com/s/AKfycbyqqJyipJuWv7OcxBQDj0zVgndcakxYpOOVWBVeKhXBznIGFCx7Xm5OBZDoW8KXAeVQ/exec";

export async function submitData(data: UserData) {
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
    question: "",
  });

  React.useEffect(() => {
    submitData(data);
  }, [data]);

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
