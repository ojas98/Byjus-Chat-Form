import React from "react";
import sendButtonImage from "../../assets/Send.png";
import { UserData } from "../../contexts/UserDataContext";

interface TextInputProps {
  target: keyof UserData;
  onComplete?: (value: string) => void;
}
const TextInput: React.FC<TextInputProps> = ({ target, onComplete }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    const value = inputRef.current?.value;
    if (!value) return;

    if (target === "email") {
      if (!/(.+)@(.+){2,}\.(.+){2,}/.test(value)) return;
    }

    if (target === "phone") {
      // Check if the value is a 10-digit number
      if (!/^\d{10}$/.test(value)) return;
    }

    onComplete?.(value);
    inputRef.current!.value = "";
  };

  return (
    <form
      id={`form-${target}`}
      className="grid grid-rows-1 grid-cols-[auto,2rem] items-center"
      onSubmit={onSubmit}
    >
      <input
        name={target}
        className="flex-1 p-4 items-center flex rounded-2xl bg-accent"
        type={target === "email" ? "email" : "tel"}
        pattern={target === "phone" ? "[0-9]{10}" : undefined}
        placeholder="Type here..."
        ref={inputRef}
      />
      <button
        type="submit"
        className="flex-shrink-0 aspect-square cursor-pointer border-none outline-none w-12"
      >
        <img src={sendButtonImage} alt="Send" />
      </button>
    </form>
  );
};

export default TextInput;
