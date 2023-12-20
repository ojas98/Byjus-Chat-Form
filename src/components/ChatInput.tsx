import React from "react";
import sendButtonImage from "../assets/Send.png";
type ChatInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: () => void;
};

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onKeyDown,
  onClick,
}) => {
  return (
    <div className="input-container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Type here..."
        className="input-field"
      />
      <button
        onClick={onClick}
        className="send-button"
        style={{ backgroundImage: `url(${sendButtonImage})` }}
      />
    </div>
  );
};

export default ChatInput;
