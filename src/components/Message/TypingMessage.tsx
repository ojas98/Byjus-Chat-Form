import React, { useEffect, useState } from "react";
import { useTimeout } from "../../hooks/useTimeout";

interface TypingMessageProps {
  onComplete: () => void;
}

const TypingMessage: React.FC<TypingMessageProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const clearTypingTimeout = useTimeout(() => {
    setIsVisible(false);
    onComplete();
  }, 2000);

  useEffect(() => {
    return () => {
      clearTypingTimeout();
    };
  }, [clearTypingTimeout]);

  return isVisible ? (
    <div
      className="inline-block p-5 rounded-3xl rounded-bl-none bg-accent text-accent-foreground"
      style={{
        display: "inline-block",
        maxWidth: "fit-content",
        whiteSpace: "nowrap",
      }}
    >
      Typing...
    </div>
  ) : null;
};

export default TypingMessage;
