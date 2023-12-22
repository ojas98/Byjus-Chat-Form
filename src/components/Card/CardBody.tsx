import React from "react";

interface CardBodyProps {
  children?: React.ReactNode;
}
const CardBody: React.FC<CardBodyProps> = ({ children }) => {
  return (
    <div className="flex-grow overflow-y flex flex-col justify-end p-6 gap-6">
      {children}
    </div>
  );
};

export default CardBody;
