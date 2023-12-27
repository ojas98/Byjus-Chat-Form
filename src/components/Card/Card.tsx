import React from "react";

interface CardProps {
  children?: React.ReactNode;
}
const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="overflow-clip bg-background rounded-3xl h-full shadow-md flex flex-col relative">
      {children}
    </div>
  );
};

export default Card;
