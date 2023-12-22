import React from "react";

export interface UserData {
  email: string;
  grade: string;
  date: string;
  time: string;
  question: string;
  // number: string;
}

interface UserDataHandler {
  data: UserData;
  setData: React.Dispatch<React.SetStateAction<UserData>>;
}
const userDataContext = React.createContext<UserDataHandler | null>(null);

export function useUserDataContext() {
  const data = React.useContext(userDataContext);
  if (data == null)
    throw new Error("Cannot use the user data context without provider.");

  return data;
}
export const UserDataContextProvider = userDataContext.Provider;
