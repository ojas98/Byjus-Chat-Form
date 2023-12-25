import React from "react";
import { UserData } from "../../contexts/UserDataContext";

interface RadioQuestionInputProps {
  target: keyof UserData;
  items: Array<string>;
  onComplete?: (value: string) => void;
  onReschedule?: () => void;
}

const RadioQuestionInput: React.FC<RadioQuestionInputProps> = ({
  // target,
  items,
  onComplete,
  onReschedule,
}) => {
  const handleOptionClick = (item: string) => {
    if (item === "Reschedule") {
      onReschedule?.();
    } else {
      onComplete?.(item);
    }
  };

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-2 ml-11 max-w-md">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => handleOptionClick(item)}
          className="flex flex-col px-3 py-2 border font-bold justify-center items-center border-accent-foreground text-accent-foreground hover:border-brand hover:text-brand rounded-xl"
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default RadioQuestionInput;
