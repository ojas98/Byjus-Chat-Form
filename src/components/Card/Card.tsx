import React from "react";

interface CardProps {
  children?: React.ReactNode;
}
const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-background rounded-3xl min-h-screen overflow-auto shadow-md flex flex-col">
      {children}
    </div>
  );
};

export default Card;
