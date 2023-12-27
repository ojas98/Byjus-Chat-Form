import React from "react";

interface RadioQuestionInputProps {
  onComplete?: (value: string) => void;
  onReschedule?: () => void;
}

const RadioQuestionInput: React.FC<RadioQuestionInputProps> = ({
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
    <div className="grid grid-cols-2 grid-rows-1 gap-2 ml-11 max-w-md">
      {["Confirm", "Reschedule"].map((item) => (
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
