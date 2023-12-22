import React from "react";
import { useBotContext } from "../../contexts/BotContext";
import { stringInject } from "../../utils/string-inject";

interface TextMessageProps {
  owner: "user" | "bot";
  texts: string[];
}
const TextMessage: React.FC<TextMessageProps> = ({ owner, texts }) => {
  if (owner === "user") return <UserTextMessage texts={texts} />;
  else return <BotTextMessage texts={texts} />;
};

interface UserTextMessageProps extends Pick<TextMessageProps, "texts"> {}

const UserTextMessage: React.FC<UserTextMessageProps> = ({ texts }) => {
  const { name: botName } = useBotContext();
  return (
    <div className="flex flex-row justify-end">
      <div className="flex flex-col gap-4">
        {texts.map((text, i) => (
          <div
            key={i}
            className="p-5 bg-brand text-brand-foreground rounded-3xl rounded-br-none"
          >
            {stringInject(text, { botName })}
          </div>
        ))}
      </div>
    </div>
  );
};

interface BotTextMessageProps extends Pick<TextMessageProps, "texts"> {}
const BotTextMessage: React.FC<BotTextMessageProps> = ({ texts }) => {
  const { name, avatar } = useBotContext();

  return (
    <div className="flex flex-row gap-2 p-2">
      <div className="flex flex-col justify-end">
        <img
          className="rounded-full aspect-square object-cover w-10"
          src={avatar}
          alt={name}
        />
      </div>
      <div className="flex flex-col gap-2 items-start">
        {texts.map((text, i) => (
          <div
            key={i}
            className="p-5 rounded-3xl rounded-bl-none bg-accent text-accent-foreground"
          >
            {stringInject(text, { botName: name })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextMessage;
