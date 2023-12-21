import React from "react";

const botContext = React.createContext({
  name: "John Doe",
  avatar: "https://ui-avatars.com/api/?name=John+Doe",
});

export function useBotContext() {
  return React.useContext(botContext);
}

export const BotContextProvider = botContext.Provider;
