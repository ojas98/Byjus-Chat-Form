import React from "react";

interface TextMessageProps {
  texts: React.ReactNode[];
}

const UserTextMessage: React.FC<TextMessageProps> = ({ texts }) => {
  return (
    <div className="flex flex-row justify-end">
      <div className="flex flex-col gap-4">
        {texts.map((text, i) => (
          <div
            key={i}
            className="p-5 bg-brand text-brand-foreground rounded-3xl rounded-br-none"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTextMessage;
