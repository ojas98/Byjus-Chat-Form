import React from "react";
import lesleyImg from "./lesley.png";
import soutikImg from "./soutik.png";
import stevenImg from "./steven.png";

export const bots = [
  {
    name: "Lesley",
    avatar: lesleyImg,
  },
  {
    name: "Soutik",
    avatar: soutikImg,
  },
  {
    name: "Steven",
    avatar: stevenImg,
  },
];

const botContext = React.createContext({
  name: "Lesley",
  avatar: lesleyImg,
});

export function useBotContext() {
  return React.useContext(botContext);
}

export const BotContextProvider = botContext.Provider;
