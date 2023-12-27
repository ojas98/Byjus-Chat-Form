import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useBotContext } from "../../contexts/BotContext";
import { useInterval } from "../../hooks/useInterval";

interface TextMessageProps {
  texts: ReactNode[];
  onComplete?: () => void;
}

const BotTextMessage: React.FC<TextMessageProps> = ({ texts, onComplete }) => {
  const { name, avatar } = useBotContext();
  const [showIndex, setShowIndex] = useState(0);
  const textEndRef = useRef<HTMLDivElement>(null);

  useInterval(
    () => {
      setShowIndex((i) => i + 1);
    },
    showIndex !== texts.length ? 1000 : null
  );

  useEffect(() => {
    if (showIndex === texts.length) onComplete?.();
  }, [onComplete, showIndex, texts.length]);

  useEffect(() => {
    if (textEndRef.current) {
      textEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [showIndex]);

  return (
    <div className="grid grid-rows-1 grid-cols-[2rem,_auto] flex-row gap-2 relative">
      <div className="flex flex-col justify-end">
        <img
          className="rounded-full aspect-square object-cover w-10"
          src={avatar}
          alt={name}
        />
      </div>
      <div className="flex flex-col gap-2 items-start">
        {texts.slice(0, showIndex).map((text, i) => (
          <div
            key={i}
            className="p-5 rounded-3xl rounded-bl-none bg-accent text-accent-foreground"
          >
            {text}
          </div>
        ))}
        {showIndex != texts.length && (
          <div className="pl-5 text-xs justify-self-end text-muted">
            typing...
          </div>
        )}
        <div className="absolute -bottom-2 h-0" ref={textEndRef}></div>
      </div>
    </div>
  );
};

export default BotTextMessage;
