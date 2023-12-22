import React from "react";
import customImage from "../BotContext/unsplash_PlikkWB79qs.png";

const botContext = React.createContext({
  name: "Lesley",
  avatar: customImage,
});

export function useBotContext() {
  return React.useContext(botContext);
}

export const BotContextProvider = botContext.Provider;
