import React from "react";

interface ConfirmInputProps {
  options: [string, string];
  onComplete?: () => void;
  onCancel?: () => void;
}

const ConfirmInput: React.FC<ConfirmInputProps> = ({
  options,
  onComplete,
  onCancel,
}) => {
  const clickHandlers = React.useMemo(() => {
    return options.map((_, i) => {
      if (i === 0 && onComplete) {
        return () => onComplete();
      }

      if (i === 1 && onCancel) {
        return () => onCancel();
      }

      return undefined;
    });
  }, [onCancel, onComplete, options]);

  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-2 ml-11 max-w-md">
      {options.map((option, i) => (
        <button
          key={option}
          onClick={clickHandlers[i]}
          className="flex flex-col px-3 py-2 border font-bold justify-center items-center border-accent-foreground text-accent-foreground hover:border-brand hover:text-brand rounded-xl"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ConfirmInput;
