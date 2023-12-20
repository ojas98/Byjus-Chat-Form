import React from "react";

interface CardProps {
  children?: React.ReactNode;
}
const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-background rounded-3xl min-h-[800px] overflow-hidden shadow-md flex flex-col p-2">
      {children}
    </div>
  );
};

export default Card;