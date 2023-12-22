import React from "react";
import { UserData } from "../../contexts/UserDataContext";

interface TimeRadioInputProps {
  target: keyof UserData;
  items: Array<string>;
  onComplete?: (value: string) => void;
}

const TimeRadioInput: React.FC<TimeRadioInputProps> = ({
  // target,
  items,
  onComplete,
}) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-2 ml-11 max-w-md">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onComplete?.(item)}
          className="flex flex-col px-3 py-2 border font-bold justify-center items-center border-accent-foreground text-accent-foreground hover:border-brand hover:text-brand rounded-xl"
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default TimeRadioInput;
