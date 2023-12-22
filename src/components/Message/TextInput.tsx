import React from "react";
import sendButtonImage from "../../assets/Send.png";
import { UserData } from "../../contexts/UserDataContext";

interface TextInputProps {
  target: keyof UserData;
  onComplete?: (value: string) => void;
}
const TextInput: React.FC<TextInputProps> = ({ target, onComplete }) => {
  // const isValidNumber = (value: string): boolean => {
  //   // Check if the value is a 10-digit number
  //   return /^\d{10}$/.test(value);
  // };

  const inputRef = React.useRef<HTMLInputElement>(null);
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    const value = inputRef.current?.value;
    if (!value) return;

    if (target === "email") {
      if (!/(.+)@(.+){2,}\.(.+){2,}/.test(value)) return;
    }

    // if (target === "number") {
    //   if (!isValidNumber(value)) return;
    // }

    onComplete?.(value);
    inputRef.current!.value = "";
  };
  return (
    <form className="flex flex-row gap-2" onSubmit={onSubmit}>
      <input
        className="flex-grow p-4 items-center flex rounded-2xl bg-accent"
        type={target === "email" ? "email" : "text"}
        placeholder="Type here..."
        ref={inputRef}
      />
      <button
        type="submit"
        className="aspect-square cursor-pointer border-none outline-none"
      >
        <img src={sendButtonImage} alt="Send" />
      </button>
    </form>
  );
};

export default TextInput;
